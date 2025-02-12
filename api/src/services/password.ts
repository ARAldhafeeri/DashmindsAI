import crypto from "crypto";

class PasswordService {
  /**
   *
   * one-way password hashing and verifiction only user know its password
   */
  async createPassword(password: string) {
    var salt = crypto.randomBytes(16).toString("hex");

    const hmac = crypto.createHmac("sha256", salt);

    hmac.update(password);
    const hashedPassword = hmac.digest("hex");

    return { hashedPassword, salt };
  }

  async createHashedPassword(password: string, salt: string) {
    const hmac = crypto.createHmac("sha256", salt);

    hmac.update(password);
    const hashedPassword = hmac.digest("hex");

    return hashedPassword;
  }

  async verifyPassword(password: string, hashedPassword: string, salt: string) {
    if (typeof password !== "string") return false;
    if (typeof hashedPassword !== "string") return false;

    const hmac = crypto.createHmac("sha256", salt);

    hmac.update(password);
    const passwordHash = hmac.digest("hex");

    if (passwordHash !== hashedPassword) return false;

    return true;
  }
}

export default PasswordService;
