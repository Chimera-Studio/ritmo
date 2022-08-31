// @flow
import CodePush from 'react-native-code-push';
import {
  get, has, isEqual, omit,
} from 'lodash';
import { localStorageKeys, appKeys, codepush } from '../tokens';
import cmsClient from './cms.config';
import {
  PRODUCTION_QUERY,
  STAGING_QUERY,
  VALID_PRODUCTION_QUERY,
  VALID_STAGING_QUERY,
} from './cms.querys';
import { deviceInfo } from '../utils';
import { getItem } from '../utils/hooks';

export type InitialCMSResponse = {
  data: Object,
  timestamps: {
    announcement: number,
    local: {
      master: number,
      announcement: number,
    },
    online: {
      master: number,
      announcement: number,
    },
  },
  isLocal: boolean,
};

export const fetchData = async (query: string): Promise<any> => {
  const response = await cmsClient.post('', { query });

  if (response.status === 200) {
    return response.data.data;
  }
};

export const fetchLocalTimestamps = async (): Promise<{ announcement: any, local: any }> => {
  const contentTimestamps = await getItem(localStorageKeys.contentTimestamps);
  const announcementTimestamp = await getItem(localStorageKeys.announcementTimestamp);

  const local = contentTimestamps ? JSON.parse(contentTimestamps) : appKeys.noLocalData;
  const announcement = announcementTimestamp
    ? JSON.parse(announcementTimestamp)
    : appKeys.noLocalData;

  return { local, announcement };
};

export const fetchCMSTimestamps = async (query: string): Promise<{ master: any, announcement: any } | any> => {
  const response = await cmsClient.post('', { query });

  if (response.status === 200) {
    const master = get(response.data, 'data.appCollection.items[0].sys.publishedAt');
    const announcement = get(response.data, 'data.announcementCollection.items[0].sys.publishedAt');

    return {
      master: master ? new Date(master).valueOf() : null,
      announcement: announcement ? new Date(announcement).valueOf() : null,
    };
  }

  return appKeys.noConnection;
};

export const fetchCMS = async (deploymentEnvironment: 'Production'|'Staging'): Promise<InitialCMSResponse> => {
  const VALID_QUERY = deviceInfo.isRealDevice && deploymentEnvironment === 'Production' ? VALID_PRODUCTION_QUERY : VALID_STAGING_QUERY;

  const cmsTimestampsResponse = await fetchCMSTimestamps(VALID_QUERY);
  const localTimestampsResponse = await fetchLocalTimestamps();

  const fullTimestampsResponse = {
    ...localTimestampsResponse,
    online: cmsTimestampsResponse,
  };

  const localTimestamps = get(fullTimestampsResponse, 'local');
  const onlineTimestamps = get(fullTimestampsResponse, 'online');
  const timestampsAreEqual = isEqual(localTimestamps, onlineTimestamps);
  const hasLocalData = !isEqual(localTimestamps, appKeys.noLocalData);
  const hasOnlineData = !isEqual(onlineTimestamps, appKeys.noConnection);

  let dataResponse = {};
  if (hasLocalData && (timestampsAreEqual || !hasOnlineData)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = await getItem(localStorageKeys.appContent);

    dataResponse = {
      data: JSON.parse(response),
      isLocal: true,
    };
  }

  if (hasOnlineData && (!timestampsAreEqual || !hasLocalData)) {
    const MASTER_QUERY = deviceInfo.isRealDevice && deploymentEnvironment === 'Production' ? PRODUCTION_QUERY : STAGING_QUERY;

    const response = await fetchData(MASTER_QUERY);

    dataResponse = {
      data: response,
      isLocal: false,
    };
  }

  // $FlowFixMe
  return { ...dataResponse, timestamps: fullTimestampsResponse };
};

export const getDeploymentData = async (): Promise<any> => {
  const response = await CodePush.getUpdateMetadata();

  if (!has(response, 'deploymentKey')) {
    return {
      environment: 'Production',
    };
  }

  const newResponse = omit(response, 'install');
  const isProduction = get(newResponse, 'deploymentKey', codepush[deviceInfo.isApple ? 'ios' : 'android'].production) === codepush[deviceInfo.isApple ? 'ios' : 'android'].production;

  return {
    environment: isProduction ? 'Production' : 'Staging',
    ...newResponse,
  };
};
