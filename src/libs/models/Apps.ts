import { IsString } from 'class-validator';
import Constants from 'expo-constants';
import days from '@libs/days';
import Model from './models';

const primaryId = 'APPID';
const userId = Constants.installationId;

const schema = {
  name: 'apps',
  properties: {
    id: 'text PRIMARY KEY NOT NULL',
    user_id: 'text',
    expired: 'text',
    version: 'text',
  },
};

export default class App extends Model {
  @IsString({ message: 'ユーザーIDを入力してください' })
  user_id: string;

  @IsString({ message: 'キャッシュ有効期限を入力してください' })
  expired: string;

  @IsString({ message: 'バージョンを入力してください' })
  version: string;

  constructor(params: {
    expired: string;
    version: string;
  }) {
    super({
      id: primaryId,
    });
    this.user_id = userId;
    this.expired = days(params.expired).format('YYYY-MM-DD HH:mm');
    this.version = params.version;
  }
}

export {
  primaryId,
  userId,
  schema,
};
