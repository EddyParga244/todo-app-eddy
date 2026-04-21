export const validatePassword = (password: string): string | null => {
  const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  if (!regex.test(password)) {
    return "Password must have at least 8 characters, one uppercase, one number and one special character";
  }
  return null;
};
