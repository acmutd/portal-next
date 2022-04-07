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

resource "aws_cognito_user_pool" "pool" {
  name = "acmutd-pool"
}

