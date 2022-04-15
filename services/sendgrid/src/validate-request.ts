/* eslint no-prototype-builtins: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
export const validateRequest = (data: Record<string, any>): boolean => {
  if (!data.hasOwnProperty('from')) return false;
  if (!data.hasOwnProperty('to')) return false;
  if (!data.hasOwnProperty('dynamicTemplateData')) return false;
  if (!data.dynamicTemplateData.hasOwnProperty('preheader')) return false;
  if (!data.dynamicTemplateData.hasOwnProperty('subject')) return false;
  if (!data.dynamicTemplateData.hasOwnProperty('fname')) return false;
  if (!data.hasOwnProperty('templateId')) return false;
  return true;
};
