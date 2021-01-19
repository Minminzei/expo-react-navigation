import { IsInt, IsOptional, Length, IsString } from 'class-validator';
import Model from './models';

const schema = {
  name: 'users',
  properties: {
    id: 'text PRIMARY KEY NOT NULL',
    name: 'text',
    comment: 'text',
    image: 'text',
    cover: 'text',
    location: 'text',
    league: 'text',
    ranking: 'integer',
    career: 'integer',
    score: 'integer',
    putt: 'integer',
  },
};

export default class User extends Model {
  @Length(1, 10, { message: '名前は10字以内で入力してください' })
  name: string;

  @IsOptional()
  @Length(0, 500, { message: '自己紹介は500字以内で入力してください' })
  comment: string | null;

  @IsString({ message: 'プロフィール写真を選択してください' })
  image: string;

  @IsString({ message: 'カバー写真を選択してください' })
  cover: string;

  @Length(2, 3, { message: '活動エリアは3字以内で入力してください' })
  location: string;

  @IsOptional()
  @IsString({ message: '所属リーグを選択してください' })
  league: string | null;

  @IsOptional()
  @IsInt({ message: 'ランキンgぬは半角数字で入力してください' })
  ranking: number | null;

  @IsOptional()
  @IsInt({ message: 'スコアは半角数字で入力してください' })
  score: number | null;

  @IsOptional()
  @IsInt({ message: 'パター数は半角数字で入力してください' })
  putt: number | null;

  @IsOptional()
  @IsInt({ message: 'ゴルフ歴は半角数字で入力してください' })
  career: number | null;

  constructor(params: {
    id?: string;
    name: string;
    comment: string | null;
    image: string;
    cover: string;
    location: string;
    league: string | null;
    ranking: number | null;
    score: number | null;
    putt: number | null;
    career: number | null;
  }) {
    super(params);
    this.name = params.name;
    this.comment = params.comment;
    this.image = params.image;
    this.cover = params.cover;
    this.location = params.location;
    this.league = params.league;
    this.ranking = params.ranking;
    this.score = params.score;
    this.putt = params.putt;
    this.career = params.career;
  }
}

export {
  schema,
};
