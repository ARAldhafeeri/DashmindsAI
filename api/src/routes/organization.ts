import { Resources } from "@/config/policy";
import { organizationController } from "@/controllers";
import GenericRouterCreator from "@/utils/routeCreator";
import organizationValidationRules, {
  updateOrganizationValidationRules,
} from "@/validators/organization";

const organizationRouter = GenericRouterCreator(
  organizationController,
  Resources.Organizations,
  organizationValidationRules,
  updateOrganizationValidationRules
);

export default organizationRouter;
