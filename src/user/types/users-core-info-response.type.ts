import { UsersCoreInfo } from './users-core-info.type';

export type UsersCoreInfoResponse = {
  success: boolean;
  message: string;
  data: UsersCoreInfo;
};
