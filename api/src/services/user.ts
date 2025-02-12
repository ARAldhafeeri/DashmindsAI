import { IUserService, User } from "@/types/user";
import { Service } from "./generic";

class UserService extends Service<User> implements IUserService {
  findByEmail(email: string): Promise<User> {
    return this.findOne({ email: email });
  }
}

export default UserService;
