import {
  IOrganizationController,
  IOrganizationService,
} from "@/types/organization";
import OrganizationService from "@/services/organization";
import Controller from "./generic";

class OrganizationController
  extends Controller<OrganizationService>
  implements IOrganizationController {}

export default OrganizationController;
