import db from '@libs/sql';
import * as _ from 'lodash';
import types, { Data } from './types';
import EventUser, { schema } from '@libs/models/EventUsers';
import { schema as eventSchema } from '@libs/models/Events';
import { schema as userSchema } from '@libs/models/Users';
import eventSamples from '@libs/datasources/Events';
import userSamples from '@libs/datasources/Users';

export default {
  // initialize
  [types.actions.initialize]: payloads => async () => {
    try {
      const eventUsers:EventUser[] = [];
      eventSamples.forEach(row => {
        _.sampleSize(userSamples, 3).forEach(user => eventUsers.push(new EventUser({
          event_id: row.id,
          user_id: user.id,
        })));
      });
      await db.initializeTable(schema.name, eventUsers);
    } catch (e) {
      throw e;
    }
  },
  // fetchEventsByUser
  [types.actions.fetchEventsByUser]: userId => async (dispatch: Function, getState: Function) => {
    try {
      const res = await db.search({
        sql: `
          SELECT
            ${db.createColumnWithAilias([schema, eventSchema])}
          FROM ${schema.name}
          INNER JOIN ${eventSchema.name} ON ${schema.name}.event_id = ${eventSchema.name}.id
          WHERE ${schema.name}.user_id = '${userId}'`,
        conditions: [],
        page: 1,
        size: 100,
        table: schema.name,
      });
      const { data } = getState()[types.states.events];
      res.data.forEach(row => data.push(row));
      dispatch({
        type: types.actions.fetchEventsByUser,
        [types.states.events]: {
          meta: res.meta,
          data: res.data,
        },
      });
    } catch (e) {
      throw e;
    }
  },
  // fetchUsersByEvent
  [types.actions.fetchUsersByEvent]: eventId => async (dispatch: Function, getState: Function) => {
    try {
      const res = await db.search({
        sql: `
          SELECT
            ${db.createColumnWithAilias([schema, userSchema])}
          FROM ${schema.name}
          INNER JOIN ${userSchema.name} ON ${schema.name}.user_id = ${userSchema.name}.id
          WHERE ${schema.name}.event_id = '${eventId}'`,
        conditions: [],
        page: 1,
        size: 10,
        table: schema.name,
      });
      dispatch({
        type: types.actions.fetchUsersByEvent,
        [types.states.users]: res,
      });
    } catch (e) {
      throw e;
    }
  },
  // save
  [types.actions.save]: payloads => async () => {
    try {
      await db.save(schema.name, payloads);
    } catch (e) {
      throw e;
    }
  },
  // delete
  [types.actions.delete]: id => async () => {
    try {
      await db.delete(schema.name, id);
    } catch (e) {
      throw e;
    }
  },
};
