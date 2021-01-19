import db from '@libs/sql';
import * as _ from 'lodash';
import types, { Data } from './types';
import { userId } from '@libs/models/Apps';
import sample from '@libs/datasources/Profiles';
import User, { schema } from '@libs/models/Users';
import { FilePath } from '@modules/Apps/types';

export default {
  // initialize
  [types.actions.initialize]: payloads => async () => {
    try {
      const user = new User({
        id: sample.id,
        name: sample.name,
        comment: sample.comment,
        image: `${FilePath}${sample.image}`,
        cover: `${FilePath}${sample.cover}`,
        location: sample.location,
        league: sample.league,
        ranking: sample.ranking,
        score: sample.score,
        putt: sample.putt,
        career: sample.career,
      });
      await db.save(schema.name, user);
    } catch (e) {
      throw e;
    }
  },
  // get
  [types.actions.get]: payloads => async (dispatch: Function) => {
    try {
      const res = await db.get(schema.name, userId);
      if (!res) {
        throw new Error('このユーザーは削除されました');
      }
      dispatch({
        type: types.actions.get,
        [types.states.data]: <Data>res,
      });
    } catch (e) {
      throw e;
    }
  },
  // save
  [types.actions.save]: payloads => async (dispatch: Function) => {
    try {
      await db.save(schema.name, payloads);
      dispatch({
        type: types.actions.save,
        [types.states.data]: <Data>payloads,
      });
    } catch (e) {
      throw e;
    }
  },
};
