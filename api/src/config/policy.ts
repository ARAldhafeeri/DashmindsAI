import { AccessControl } from "gatewatch";

export enum UserRoles {
  user = "user",
  admin = "admin",
}

export enum Actions {
  delete = "delete",
  create = "create",
  update = "update",
  read = "read",
  search = "search",
}

export enum Resources {
  Organizations = "orgs",
  Tasks = "tasks",
  Projects = "projects",
  Settings = "settings",
  Chats = "chats",
}

type TenantPolicy = {
  resources: Resources[];
  actions: Actions[];
  roles: UserRoles[];
  policies: Policy[];
};

type Policy = {
  role: UserRoles;
  can: string[];
  on: Resources[];
};

export const TanentPolicy: TenantPolicy = {
  resources: [
    Resources.Organizations,
    Resources.Tasks,
    Resources.Projects,
    Resources.Settings,
    Resources.Chats,
  ],
  actions: [
    Actions.create,
    Actions.delete,
    Actions.update,
    Actions.read,
    Actions.search,
  ],
  roles: [UserRoles.user, UserRoles.admin],
  policies: [
    {
      role: UserRoles.admin,
      can: [
        Actions.create,
        Actions.delete,
        Actions.update,
        Actions.read,
        Actions.search,
      ],
      on: [
        Resources.Tasks,
        Resources.Projects,
        Resources.Settings,
        Resources.Chats,
      ],
    },
    {
      role: UserRoles.admin,
      can: [Actions.update, Actions.read],
      on: [Resources.Organizations],
    },
    {
      role: UserRoles.user,
      can: [Actions.read, Actions.create, Actions.update, Actions.delete],
      on: [
        Resources.Tasks,
        Resources.Chats,
        Resources.Projects,
        Resources.Settings,
      ],
    },
  ],
};

const ac = new AccessControl(TanentPolicy);

const ENFORCED_POLICY = ac.enforce();

export default ENFORCED_POLICY;
