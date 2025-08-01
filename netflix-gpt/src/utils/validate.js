export const checkValidateData = (email, password, name, isSigniInFlag) => {
  //form validation
  let isNameValid = true;
  const isemailvalid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordvalid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (!isSigniInFlag) {
    isNameValid = /^[A-Za-z\s]+$/.test(name);
  }
  if (!isNameValid) {
    return "Name Id not valid";
  }
  if (!isemailvalid && !isPasswordvalid) {
    return "Email Id and password  not valid";
  }
  if (!isemailvalid) {
    return "Email Id not valid";
  }
  if (!isPasswordvalid) {
    return "Password Id not valid";
  }

  return null;
};
