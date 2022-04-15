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

export const sendEmail = async (msg: SendEmailConfig): Promise<boolean> => {
  try {
    sendgrid.setApiKey(process.env.SENDGRID_APIKEY!);
    await sendgrid.send(msg);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
