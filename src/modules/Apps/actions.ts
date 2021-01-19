import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import { Asset } from 'expo-asset';
import { Platform } from 'react-native';
import types, { FilePath } from './types';
import db from '@libs/sql';
import days from '@libs/days';
import Apps, { schema, primaryId } from '@libs/models/Apps';
import { Types as UsersTypes, Actions as UsersActions } from '@modules/Users';
import { Types as EventsTypes, Actions as EventsActions } from '@modules/Events';
import { Types as EventUsersTypes, Actions as EventUsersActions } from '@modules/EventUsers';
import { Types as ProfileTypes, Actions as ProfileActions } from '@modules/Profile';

const MIN_DESK = 2 * 1024 * 1024 * 1024;
const CACHE_DAY = 3;

async function shouldInitialize() : Promise<boolean> {
  try {
    if (Platform.OS !== 'web') {
      return true;
    }
    const res = await db.get(schema.name, primaryId);
    if (!res) {
      return true;
    }
    if (Constants.nativeAppVersion && (res as Apps).version < Constants.nativeAppVersion) {
      return true;
    }
    const lastDate = days((res as Apps).expired);
    if (!lastDate.isValid()) {
      return true;
    }
    if (days() >= lastDate) {
      return true;
    }
    const freeByte = await FileSystem.getFreeDiskStorageAsync();
    if (freeByte < MIN_DESK) {
      return true;
    }
    return false;
  } catch (e) {
    throw e;
  }
}

/**
 * 画像初期化
 */
export async function initializeFile() : Promise<void> {
  try {
    if (Platform.OS === 'web') {
      return;
    }
    // 画像保管用のディレクトリ初期化
    await FileSystem.deleteAsync(FilePath, { idempotent: true });
    await FileSystem.makeDirectoryAsync(FilePath, { intermediates: false });

    // 画像をロードする
    const images = require('@libs/datasources/Images');
    const promises = Object.keys(images).map(filename => new Promise(async (resolve, reject) => {
      const [{ localUri }] = await Asset.loadAsync(images[filename]);
      if (!localUri) {
        resolve();
        return;
      }
      await FileSystem.copyAsync({
        from: localUri,
        to: `${FilePath}${filename}`,
      });
      resolve();
    }));
    await Promise.all(promises);
  } catch (e) {
    throw e;
  }
}

export default {
  // initialize
  [types.actions.initialize]: payloads => async (dispatch: Function, getState: Function) => {
    try {
      const res = await shouldInitialize();
      if (res) {
        await db.initializeDatabase();
        const data = new Apps({
          version: Constants.nativeAppVersion || '1.0',
          expired: days().add(CACHE_DAY, 'days').format('YYYY-MM-DD HH:mm'),
        });
        await db.initializeTable(schema.name, [data]);
        await initializeFile();
        await dispatch(UsersActions[UsersTypes.actions.initialize]({}));
        await dispatch(EventsActions[EventsTypes.actions.initialize]({}));
        await dispatch(EventUsersActions[EventUsersTypes.actions.initialize]({}));
        await dispatch(ProfileActions[ProfileTypes.actions.initialize]({}));
      }
      await dispatch(ProfileActions[ProfileTypes.actions.get]({}));
      dispatch({
        type: types.actions.initialize,
        [types.states.initialized]: true,
      });
    } catch (e) {
      throw e;
    }
  },
};
