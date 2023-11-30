const CheckStringType = {
  email(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  },
  password(password: string) {
    return !!password;
  },
  authCode(authCode: string) {
    return !!authCode;
  }
}

export default CheckStringType;