import db from '@libs/sql';
import * as _ from 'lodash';
import types, { Data } from './types';
import samples from '@libs/datasources/Users';
import { schema } from '@libs/models/Users';
import { FilePath } from '@modules/Apps/types';

export default {
  // initialize
  [types.actions.initialize]: payloads => async (dispatch: Function) => {
    try {
      await db.initializeTable(schema.name, samples.map(row => {
        row.image = `${FilePath}${row.image}`;
        row.cover = `${FilePath}${row.cover}`;
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
  // fetch
  [types.actions.fetch]: payloads => async (dispatch: Function, getState: Function) => {
    try {
      const res = await db.search({
        sql: `SELECT * FROM ${schema.name} ORDER BY ranking ASC`,
        conditions: [],
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
  // fetchByEvent
  [types.actions.fetchByEvent]: userId => async (dispatch: Function, getState: Function) => {
    try {
      const res = await db.search({
        sql: `SELECT * FROM ${schema.name} users.id = ?`,
        conditions: [userId],
        page: 1,
        size: 10,
        table: schema.name,
      });
      dispatch({
        type: types.actions.fetchByEvent,
        [types.states.joinUsers]: res,
      });
    } catch (e) {
      throw e;
    }
  },
};
