import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { IsString } from 'class-validator';

export default class Model {
  @IsString({ message: 'IDを入力してください' })
  id: string;
  constructor(params: any) {
    this.id = params.id || uuid();
  }
}
