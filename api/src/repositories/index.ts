import OrganizationRepository from "./organization";
import OrganizationModel from "@/models/organization";
import UserModel from "@/models/user";

import UserRepository from "./user";

export const organizationRepository = new OrganizationRepository(
  OrganizationModel
);
export const userRepsitory = new UserRepository(UserModel);
