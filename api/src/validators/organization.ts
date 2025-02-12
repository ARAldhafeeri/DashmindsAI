import {
  addOptionalOnUpdateValidationRules,
  applySanitizationRules,
  applySanitizationRulesOptional,
} from "@/utils/validation";

const organizationValidationRules = () => [
  ...applySanitizationRules(["name"], 350, (chain) => chain.trim().escape()),
];

export const updateOrganizationValidationRules = () =>
  addOptionalOnUpdateValidationRules(organizationValidationRules);
export default organizationValidationRules;
