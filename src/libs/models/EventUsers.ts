import { IsInt } from 'class-validator';
import Model from './models';

const schema = {
  name: 'event_users',
  properties: {
    id: 'text PRIMARY KEY NOT NULL',
    event_id: 'text',
    user_id: 'text',
  },
};

export default class EventUser extends Model {
  @IsInt({ message: 'IDを選択してください' })
  event_id: string;

  @IsInt({ message: 'IDを選択してください' })
  user_id: string;

  constructor(params: {
    id?: string;
    event_id: string;
    user_id: string;
  }) {
    super(params);
    this.event_id = params.event_id;
    this.user_id = params.user_id;
  }
}

export {
  schema,
};
