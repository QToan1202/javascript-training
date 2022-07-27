// Allow special character + @ + domain
const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// Allow upper and lower case letter, space
const regName = /^[A-Za-z ]+$/;
// Have at least 1 number, 1 special character and in the range from 6 to 16 characters
const regPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export {
  regEmail, regName, regPass,
};
