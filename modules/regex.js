// This email regex match start of string, but it will match even there are irrelevant string appear after the email. 
// So it is not suitable for validation.
// Use validatorjs to validate email instead.
export const emailRegex = /^(([^<>()\[\]\\.#$%^&*(),!?+=`;:\s@"]+(\.[^<>()\[\]\\.#$%^&*(),!?+=`;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;