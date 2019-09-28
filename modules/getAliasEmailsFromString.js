import { emailRegex } from './regex';
import { sanitizeEmails } from './sanitizers';

export const getAliasEmailsFromString = (str) => {
  return recursivelyGetAliasEmailFromString(str);
}

function recursivelyGetAliasEmailFromString (str, arr = [], count = 0) {
  count++;
  if (count > 100000) {
    return [...new Set(arr)];
  }

  const firstAlias = str.indexOf('@');
  if (firstAlias === -1) {
    return [...new Set(arr)];
  }

  str = str.substring(firstAlias + 1);
  const emailMatched = matchInitialEmail(str);
  if (emailMatched) {
    arr.push(sanitizeEmails(emailMatched));
    str = str.substring(emailMatched.length);
  }
  return recursivelyGetAliasEmailFromString(str, arr, count);
}

function matchInitialEmail (str) {
  let matched = str.match(emailRegex);
  return matched ? matched[0] : false;
}