'use strict';

import { sendTestEmail } from '@acmutd/email-helper';

module.exports.email_service = async (event) => {
  await sendTestEmail();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Sent Test Email',
        input: event,
      },
      null,
      2
    ),
  };
};
