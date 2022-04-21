terraform {
  required_providers {
    doppler = {
      source  = "DopplerHQ/doppler"
      version = "1.1.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "4.8.0"
    }
  }
  cloud {
    organization = "acmutd"
    workspaces {
      name = "acm-monorepo"
    }
  }
}

variable "doppler_token_dev" {
  type        = string
  description = "A token to authenticate with Doppler for the dev config"
}

variable "doppler_token_prd" {
  type        = string
  description = "A token to authenticate with Doppler for the prd config"
}

provider "doppler" {
  doppler_token = var.doppler_token_dev
  alias         = "dev"
}

provider "doppler" {
  doppler_token = var.doppler_token_prd
  alias         = "prd"
}

data "doppler_secrets" "dev" {
  provider = doppler.dev
}

data "doppler_secrets" "prd" {
  provider = doppler.prd
}

provider "aws" {
  region     = data.doppler_secrets.prd.map.AWS_REGION
  access_key = data.doppler_secrets.prd.map.AWS_ACCESS_KEY_ID
  secret_key = data.doppler_secrets.prd.map.AWS_SECRET_ACCESS_KEY
}

resource "aws_cognito_user_pool" "user_pool" {
  name = "acmutd-user-pool"

  username_attributes = ["email"]
  auto_verified_attributes = ["email"]
  password_policy {
    minimum_length = 6
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_LINK"
    email_subject_by_link = "ACM Account Confirmation"
    email_message_by_link = "Please {##Click Here##} to confirm your ACM account."
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }
}

resource "aws_cognito_user_pool_client" "client" {
  name = "acmutd-cognito-client"

  user_pool_id = aws_cognito_user_pool.user_pool.id
  generate_secret = false
  refresh_token_validity = 90
  prevent_user_existence_errors = "ENABLED"
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]
}

resource "aws_cognito_user_pool_domain" "cognito-domain" {
  domain       = "acmutd"
  user_pool_id = "${aws_cognito_user_pool.user_pool.id}"
}

resource "aws_ses_domain_identity" "domain" {
  domain = "acmutd.co"
}

resource "aws_ses_domain_dkim" "domain_dkim" {
  domain = "${aws_ses_domain_identity.domain.domain}"
}

resource "aws_s3_bucket" "emails_bucket" {
  bucket = "portal-received-emails"
  tags = {
    name = "Portal v2 Email Storage"
  }
}

resource "null_resource" "delay" {
  provisioner "local-exec" {
    command = "sleep 10"
  }
  triggers = {
    "after" = aws_s3_bucket.emails_bucket.id
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = "${aws_s3_bucket.emails_bucket.id}"

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowSESPuts",
            "Effect": "Allow",
            "Principal": {
                "Service": "ses.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::portal-received-emails/*"
        }
    ]
}
POLICY
  depends_on = [
    null_resource.delay
  ]
}

resource "aws_ses_receipt_rule" "store" {
  name          = "store"
  rule_set_name = "default-rule-set"
  enabled       = true
  scan_enabled  = true

  add_header_action {
    header_name  = "Custom-Header"
    header_value = "Added by SES"
    position     = 1
  }

  s3_action {
    bucket_name = "${aws_s3_bucket.emails_bucket.id}"
    object_key_prefix = "incoming"
    position    = 2
  }

  depends_on = [
    aws_s3_bucket_policy.bucket_policy,
    aws_ses_receipt_rule.store
  ]
}

