import { richTextQuery } from './richText';

export const staticFormQuery = `
form->{
  name,
  formId,
  success[] ${richTextQuery},
  error[] ${richTextQuery},
  options
}`;
