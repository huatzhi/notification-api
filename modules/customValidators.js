import validator from 'validator';

export const isEmailArray = (input) => {
  try {
    if (!Array.isArray(input)) {
      throw new Error("Should be an array");
    }

    for (let i = 0; i < input.length; i++) {
      let email = input[i];
      if (!validator.isEmail(email)) {
        throw new Error("Content should be email");
      }
    }

    return true;
  } catch (e) {
    return false;
  }
}

export const isEmail = (input) => {
  try {
    return validator.isEmail(input);
  } catch (e) {
    return false;
  }
}