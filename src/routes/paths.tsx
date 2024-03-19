function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD: string = "/";

interface PathDashboard {
  root: string;
  app: string;
}

const PATH_DASHBOARD: PathDashboard = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, "app"),
};

export { ROOTS_DASHBOARD, PATH_DASHBOARD };
