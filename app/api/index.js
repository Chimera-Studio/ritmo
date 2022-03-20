// @flow
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cms, localStorageKeys, appKeys } from '../tokens';
import cmsHeader from './cms.config';
import { VALID_PRODUCTION_QUERY, VALID_STAGING_QUERY } from './cms.querys';
import { isRealDevice } from '../utils';

const VALID_QUERY = isRealDevice ? VALID_PRODUCTION_QUERY : VALID_STAGING_QUERY;

export const fetchLocalTimestamps = async (): Promise<{ announcement: any, local: any }> => {
  const contentTimestamps = await AsyncStorage.getItem(localStorageKeys.contentTimestamps);
  const announcementTimestamp = await AsyncStorage.getItem(localStorageKeys.announcementTimestamp);

  const local = JSON.parse(contentTimestamps);
  const announcement = JSON.parse(announcementTimestamp);

  return { local, announcement };
};

export const fetchCMSTimestamps = async (): Promise<Object> => {
  try {
    const response = await axios.post(
      cms.graphql_url + cms.space,
      {
        query: VALID_QUERY,
      },
      cmsHeader
    );
    if (response.status === 200) {
      const data = {
        master: new Date(response.data.data.appCollection.items[0].sys.publishedAt).valueOf(),
        announcement: new Date(
          response.data.data.announcementCollection.items[0].sys.publishedAt
        ).valueOf(),
        patterns: new Date(
          response.data.data.negativeHarmonyCollection.items[0].sys.publishedAt
        ).valueOf(),
      };

      return data;
    }
  } catch (err) {
    return appKeys.noConnection;
    // console.error(err);
  }
};

export const cmsFetch = async (query: string): Promise<any> => {
  try {
    const response = await axios.post(
      cms.graphql_url + cms.space,
      {
        query,
      },
      cmsHeader
    );
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    // console.error(err);
  }
};
