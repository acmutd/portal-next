import sendgrid from '@sendgrid/mail';

export interface SendEmailConfig {
  from: string;
  from_name: string;
  to: string;
  template_id: string;
  dynamicSubstitutions: Record<string, unknown>;
}

export const sendEmail = async (msgConfig: SendEmailConfig): Promise<any> => {
  sendgrid.setApiKey(process.env.SENDGRID_APIKEY!);
  const msg: sendgrid.MailDataRequired = {
    from: {
      email: msgConfig.from,
      name: msgConfig.from_name,
    },
    to: msgConfig.to,
    dynamicTemplateData: msgConfig.dynamicSubstitutions,
    templateId: msgConfig.template_id,
  };
  return sendgrid.send(msg);
};
