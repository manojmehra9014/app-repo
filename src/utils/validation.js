export const validateName = (input) => {
  if (/\d/.test(input)) {
    return "Username cannot contain numbers.";
  } else if (input.length < 3 && input.length > 0) {
    return "Username must have at least 3 characters.";
  }
  return '';
};

export const validateDesignation = (input) => {
  if (/\d/.test(input)) {
    return "Designation cannot contain numbers.";
  } else if (input.length < 3 && input.length > 0) {
    return "Designation must have at least 3 characters.";
  }
  return '';
};

export const validatePhoneNumber = (input) => {
  if (!/^\d{10}$/.test(input)) {
    return "Phone number must be 10 digits.";
  }
  return '';
};


export const validatePassword = (input) => {
  if (input.length === 0) {
    return '';
  } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&!*_]).{8,}/.test(input)) {
    return "Password must have at least 8 characters, including uppercase, lowercase, digit, and special symbol.";
  }
  return '';
};