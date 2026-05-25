import type { RouteConfig } from '@react-router/dev/routes';

import { layout, route } from '@react-router/dev/routes';

export default [
  route('auth', 'routes/auth/page.tsx'),

  layout('./layout/protected-route.tsx', [route('home', './routes/home.tsx')])
] satisfies RouteConfig;
