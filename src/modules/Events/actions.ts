import db from '@libs/sql';
import * as _ from 'lodash';
import types, { Data } from './types';
import { schema } from '@libs/models/Events';
import eventSamples from '@libs/datasources/Events';
import { FilePath } from '@modules/Apps/types';

export default {
  // initialize
  [types.actions.initialize]: payloads => async () => {
    try {
      await db.initializeTable(schema.name, eventSamples.map(row => {
        row.image = `${FilePath}${row.image}`;
        return row;
      }));
    } catch (e) {
      throw e;
    }
  },
  // get
  [types.actions.get]: id => async (dispatch: Function) => {
    try {
      const res = await db.get(schema.name, id);
      if (!res) {
        throw new Error('このイベントは削除されました');
      }
      dispatch({
        type: types.actions.get,
        [types.states.data]: <Data>res,
      });
    } catch (e) {
      throw e;
    }
  },
  // fetch
  [types.actions.fetch]: payloads => async (dispatch: Function, getState: Function) => {
    try {
      const res = await db.search({
        sql: `SELECT * FROM ${schema.name}`,
        page: payloads.page,
        size: 10,
        table: schema.name,
      });
      if (payloads.page === 1) {
        dispatch({
          type: types.actions.fetch,
          [types.states.list]: res,
        });
      } else {
        const { data } = getState()[types.states.list];
        res.data.forEach(row => data.push(row));
        dispatch({
          type: types.actions.fetch,
          [types.states.list]: {
            meta: res.meta,
            data: <Data[]>data,
          },
        });
      }
    } catch (e) {
      throw e;
    }
  },
};
