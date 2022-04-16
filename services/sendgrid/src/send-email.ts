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
  } catch (error: any) {
    console.error(JSON.stringify(error));
    return false;
  }
};
