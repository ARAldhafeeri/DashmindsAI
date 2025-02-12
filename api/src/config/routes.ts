export const API_ROUTE: string = "/v1";
const withAPIRoot = (route: string) => `${API_ROUTE}${route}`;
export const AUTH_ROUTE: string = withAPIRoot("/auth");

// entities
export const ENTITIES_ROUTES = {
  ORG: withAPIRoot("/orgs"),
  AUTH: {
    BASE: withAPIRoot("/auth"),
    LOGIN: "/login",
  },
};
// common
export const ROOT_ROUTE = "/";
export const SEARCH_ROUTE = "/search";
export const FILTER_ROUTE = "/filter";
