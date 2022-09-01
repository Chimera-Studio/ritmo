// @flow
/* eslint-disable no-undef */
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import {
  every, flatten, floor, includes, values,
} from 'lodash';
// $FlowFixMe[cannot-resolve-module] (Git Ignored)
import ENV from '../../env.json';
import type { Sample } from './lists';
import type { Beats } from '../sound/beats';

type DeviceInfoType = {
  isApple: boolean,
  isTablet: boolean,
  isiPhone: boolean,
  isRealDevice?: boolean,
  isAdminDevice?: boolean,
  showAdminActions?: boolean,
  deviceId?: string,
};

export const isApple: boolean = Platform.OS === 'ios';
export const isTablet: boolean = DeviceInfo.isTablet();
export const isiPhone: boolean = isApple && !isTablet;
export const deviceInfo: DeviceInfoType = {
  isApple,
  isTablet,
  isiPhone,
};
export const deviceWidth: number = Dimensions.get('screen').width;
export const deviceHeight: number = Dimensions.get('screen').height;

export const getDeviceInfo = async (): Promise<any> => {
  const isEmulator = await DeviceInfo.isEmulator();
  const deviceID = await DeviceInfo.getUniqueId();
  const isAdminDevice = includes(ENV.ADMIN_DEVICE_IDS, deviceID);
  const showAdminActions = isEmulator || isAdminDevice;

  deviceInfo.isRealDevice = !isEmulator;
  deviceInfo.isAdminDevice = isAdminDevice;
  deviceInfo.showAdminActions = showAdminActions;
  deviceInfo.deviceId = deviceID;
};

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === 'function';

export const isSampleUnlocked = (unlockedSamples: string[], sample: Sample): boolean => includes(unlockedSamples, sample.label);

export const isBeatEmpty = (beats: Beats): boolean => every(flatten(values(beats)), ['checked', false]);

export const calcBpmInterval = (bpm: number): number => floor(240000 / bpm);

export const calcPulseInterval = (bpmInterval: number): number => floor(bpmInterval / 8);

export const calcSoundDelay = (initAngle: number, sliderVal?: number, useBPM?: number): number => {
  const bpm = useBPM || 100;
  const slider = sliderVal || 0;
  const bpmInterval = calcBpmInterval(bpm);
  const bpmAdjust = (60 / bpm) * 4;
  const delayDegree = (1000 * bpmAdjust) / 360;
  const calcDelay = delayDegree * slider;
  const beatDelay = delayDegree * initAngle + calcDelay;

  return floor(beatDelay > bpmInterval ? beatDelay - bpmInterval : beatDelay);
};

export const checkAdsConsent = async (): Promise<{
  showAds: boolean,
  personalisedAds: boolean,
}> => {
  const { selectPersonalisedAds, storeAndAccessInformationOnDevice } = await AdsConsent.getUserChoices();

  return {
    showAds: storeAndAccessInformationOnDevice,
    personalisedAds: selectPersonalisedAds,
  };
};

export const handleAdsConsent = async (): Promise<{
  showAds: boolean,
  personalisedAds: boolean,
}> => {
  const consentInfo = await AdsConsent.requestInfoUpdate();
  const consentObtained = consentInfo.status === AdsConsentStatus.OBTAINED;
  const consentRequired = consentInfo.status === AdsConsentStatus.REQUIRED;

  if (consentObtained) {
    const { showAds, personalisedAds } = await checkAdsConsent();

    return {
      showAds,
      personalisedAds,
    };
  }

  if (consentInfo.isConsentFormAvailable && consentRequired) {
    await AdsConsent.showForm();
    const { showAds, personalisedAds } = await checkAdsConsent();

    return {
      showAds,
      personalisedAds,
    };
  }

  return {
    showAds: true,
    personalisedAds: true,
  };
};
