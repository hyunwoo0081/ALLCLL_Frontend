const CheckStringType = {
  email(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  },
  password(password: string) {
    const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{8,16}$/;
    return passwordRegex.test(password);
  },
  authCode(authCode: string) {
    const authCodeRegex = /^[A-Z0-9]{6}$/;
    return authCodeRegex.test(authCode);
  }
}

export default CheckStringType;