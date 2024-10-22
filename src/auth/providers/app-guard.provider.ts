import { AuthGuard } from '../auth.guard';

export const AppGuardProvider = {
  provide: 'APP_GUARD',
  useClass: AuthGuard,
};
