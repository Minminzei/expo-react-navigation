import User from '../models/Users';
import { userId } from '../models/Apps';

const sample: User = {
  id: userId,
  name: 'ゲスト',
  comment: 'よろしくおねがいします',
  image: 'default.png',
  cover: 'cover.jpg',
  location: '東京都',
  league: 'A',
  ranking: 5,
  score: 90,
  putt: 36,
  career: 3,
};

export default sample;
