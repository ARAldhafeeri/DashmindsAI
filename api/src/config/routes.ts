export const API_ROUTE: string = "/v1";
const withAPIRoot = (route: string) => `${API_ROUTE}${route}`;
export const AUTH_ROUTE: string = withAPIRoot("/auth");
