import { IUserRepository, User } from "@/types/user";
import { Repository } from "./generic";

class UserRepository extends Repository<User> implements IUserRepository {}

export default UserRepository;
