import { AuthGuard } from '../guards/auth.guard';

export const AppGuardProvider = {
  provide: 'APP_GUARD',
  useClass: AuthGuard,
};
