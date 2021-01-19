import { IsInt, Length, IsString } from 'class-validator';
import Model from './models';

const schema = {
  name: 'events',
  properties: {
    id: 'text PRIMARY KEY NOT NULL',
    title: 'text',
    location: 'text',
    date: 'text',
    image: 'text',
    price: 'integer',
    hole: 'text',
    note: 'text',
  },
};

export default class Event extends Model {
  @Length(1, 100, { message: 'タイトルは100字以内で入力してください' })
  title: string;

  @Length(1, 3, { message: '都道府県は3字以内で入力してください' })
  location: string;

  @IsString({ message: '開催日時を入力してください' })
  date: string;

  @IsString({ message: 'サムネイルを選択してください' })
  image: string;

  @IsInt({ message: '料金は半角数字で入力してください' })
  price: number;

  @IsString({ message: 'ホールを入力してください' })
  hole: string;

  @Length(1, 100, { message: '持ち物は300字以内で入力してください' })
  note: string;

  constructor(params: {
    id?: string;
    title: string;
    location: string;
    date: string;
    image: string;
    price: number;
    hole: string;
    note: string;
  }) {
    super(params);
    this.title = params.title;
    this.location = params.location;
    this.date = params.date;
    this.image = params.image;
    this.price = params.price;
    this.hole = params.hole;
    this.note = params.note;
  }
}

export {
  schema,
};
