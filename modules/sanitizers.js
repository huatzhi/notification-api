import { normalizeEmail } from 'validator';

export const sanitizeEmails = (input) => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      input[i] = normalizeEmail(input[i]);
    }
    return input;
  }
  return normalizeEmail(input);
}