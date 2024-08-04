const CheckStringType = {
  studentId(studentId: string) {
    const studentIdRegex = /^[0-9]{8}$/;
    return studentIdRegex.test(studentId);
  },
  email(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  },
  password(password: string) {
    // const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{8,16}$/;
    // return passwordRegex.test(password);

    return password.length > 0;
  },
  authCode(authCode: string) {
    const authCodeRegex = /^[A-Z0-9]{6}$/;
    return authCodeRegex.test(authCode);
  },
  captcha(captcha: string) {
    const captchaRegex = /^[0-9]{4}$/;
    return captchaRegex.test(captcha);
  },
  isJSON(json: string) {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default CheckStringType;