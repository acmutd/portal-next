import sendgrid from '@sendgrid/mail';

export interface SendEmailConfig {
  from: string;
  to: string;
  dynamicTemplateData: {
    preheader: string;
    subject: string;
    fname: string;
  };
  templateId: string;
}

export const sendEmail = async (msg: SendEmailConfig): Promise<any> => {
  sendgrid.setApiKey(process.env.SENDGRID_APIKEY!);
  return sendgrid.send(msg);
};
