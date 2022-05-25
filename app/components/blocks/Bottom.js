// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@miblanchard/react-native-slider';
import {
  map, isEmpty, first, isEqual, flatten, values, some,
} from 'lodash';
import SliderThumb from '../elements/inputs/SliderThumb';
import ClearPresetModal from '../elements/modals/ClearPresetModal';
import Alert from '../elements/misc/Alert';
import useLocale from '../../locales';
import { actions as globalActions, selectors as globalSelectors } from '../../store/globalStore';
import { actions as beatActions, selectors as beatSelectors } from '../../store/beatsStore';
import { stopBeat } from '../../sound';
import bottomStyle from '../../styles/bottom_style';
import colors from '../../styles/colors';
import type { Beats } from '../../sound/beats';
import type { Preset, State as GlobalState } from '../../store/globalStore';

function Bottom(): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const beats: Beats = useSelector(beatSelectors.getBeats, isEqual);
  const global: GlobalState = useSelector(globalSelectors.getGlobal, isEqual);
  const [showModal, setShowModal] = useState(null);
  const [showNoBeatAlert, setShowNoBeatAlert] = useState(false);
  const [showNoPresetAlert, setShowNoPresetAlert] = useState(false);
  const beatExists = some(flatten(values(beats)), 'checked');

  const handleSliderChange = (degree: number, key: string) => {
    if (global.sliders[key] !== degree) dispatch(beatActions.rotateBeat({ key, degree, useBPM: global.ui.useBPM }));
  };

  const handlePreset = (preset: Object, key: string) => {
    if (!isEmpty(preset)) {
      dispatch(globalActions.loadPreset(preset));

      return;
    }

    if (beatExists) {
      dispatch(globalActions.writePreset(key, {
        beat: beats,
        sliders: global.sliders,
        useBPM: global.ui.useBPM,
        useTimeSig: global.ui.useTimeSig,
      }));
    } else {
      setShowNoBeatAlert(true);
    }
  };

  const handleClearPreset = () => {
    if (showModal) dispatch(globalActions.clearPreset(showModal));
    setShowModal(null);
  };

  const handleAlertDestroy = () => {
    setShowNoBeatAlert(false);
    setShowNoPresetAlert(false);
  };

  const handleModalCall = (key: string) => {
    if (!global.presets || isEmpty(global.presets[key])) {
      setShowNoPresetAlert(true);

      return;
    }

    setShowModal(key);
  };

  const handleClearBeat = () => {
    dispatch(beatActions.clearBeat());
    stopBeat(beats);
  };

  const handleResetBeat = () => {
    dispatch(beatActions.resetBeat());
    stopBeat(beats);
  };

  const handleRecording = () => {};

  /* Recording Functions - START */
  /*
  const startRec = async () => {
    let findBeat = false;
    for (let i in beats.hihat) {
      if (
        beats.hihat[i].checked === true ||
        beats.snare[i].checked === true ||
        beats.kick[i].checked === true
      ) {
        findBeat = true;
        break;
      }
    }

    let status = (await Audio.getPermissionsAsync()).granted;
    if (status === true && isPlaying === false && findBeat === true) {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid:
            Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        await recording.prepareToRecordAsync(RecordingOptions);
        await recording.startAsync();

        start();

        isRecording = true;
        setRecordingStatus(isRecording);
      } catch (err) {
        console.error(err);
      }
    } else if (status === true && isPlaying === true && findBeat === true) {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid:
            Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        await recording.prepareToRecordAsync(RecordingOptions);
        await recording.startAsync();

        isRecording = true;
        setRecordingStatus(isRecording);
      } catch (err) {
        console.error(err);
      }
    } else if (status === true && isPlaying === false && findBeat === false) {
      alertDelay();
    } else {
      await Audio.requestPermissionsAsync();
    }
  };

  const stopRec = async () => {
    pause();

    await recording.stopAndUnloadAsync();
    setRecording(new Audio.Recording());
    const uri = recording.getURI();

    console.log(uri);
    // Current Save Folder URL: /Users/dariodumlijan/Library/Developer/CoreSimulator/Devices/B54A7218-4990-45B7-925F-BC578F42FB29/data/Containers/Data/Application/13C70B38-FE6B-4F46-A0C0-CC95AE195051/Library/Caches/ExponentExperienceData/%40ddario%2FRitmo

    isRecording = false;
    setRecordingStatus(isRecording);
  };
  */
  /* Recording Functions - END */

  return (
    <View style={bottomStyle.wrapper}>
      <View style={bottomStyle.wrapperBG}>
        <View style={bottomStyle.presetWrapper}>
          {map(global.presets, (preset: Preset, key: string) => (
            <TouchableHighlight
              key={key}
              underlayColor={colors.grayBlue}
              style={{
                ...bottomStyle.presetBtn,
                ...(isEmpty(preset) && {
                  borderColor: colors.gray,
                  backgroundColor: colors.bg,
                }),
              }}
              onPress={() => handlePreset(preset, key)}
              onLongPress={() => handleModalCall(key)}
            >
              <Text style={bottomStyle.presetText}>{t(`bottom.preset.${key}`)}</Text>
            </TouchableHighlight>
          ))}
        </View>
        <View style={bottomStyle.sliderWrapper}>
          {map(global.sliders, (val: number, key: string) => (
            <Slider
              key={key}
              value={val}
              minimumValue={global.static.sliderMin}
              maximumValue={global.static.sliderMax}
              step={global.static.sliderStep}
              minimumTrackTintColor={colors.grayLight}
              maximumTrackTintColor={colors.grayLight}
              containerStyle={bottomStyle.sliderContainer}
              trackStyle={bottomStyle.sliderTrack}
              renderThumbComponent={() => <SliderThumb label={key} />}
              thumbTouchSize={{ width: 65, height: 25 }}
              onValueChange={(targetVal) => handleSliderChange(first(targetVal), key)}
            />
          ))}
        </View>
        <View style={bottomStyle.btnWrapper}>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={bottomStyle.btnPrimary}
            onPress={handleClearBeat}
          >
            <Text style={bottomStyle.btnPrimaryText}>{t('bottom.actions.clear')}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={bottomStyle.btnPrimary}
            onPress={handleResetBeat}
          >
            <Text style={bottomStyle.btnPrimaryText}>{t('bottom.actions.reset')}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={[bottomStyle.btnPrimary, bottomStyle.btnRecording]}
            onPress={handleRecording}
          >
            <View
              style={[bottomStyle.iconRecording, {
                backgroundColor: global.ui.isRecording ? colors.white : colors.red,
              }]}
            />
          </TouchableHighlight>
        </View>
      </View>

      <ClearPresetModal
        visible={!isEmpty(showModal)}
        onCancel={() => setShowModal(null)}
        onConfirm={handleClearPreset}
      />
      <Alert
        clearDelayMS={3300}
        visible={showNoBeatAlert || showNoPresetAlert}
        onDestroy={handleAlertDestroy}
      >
        <Text>{t(showNoPresetAlert ? 'alert.no_preset' : 'alert.no_beat')}</Text>
      </Alert>
    </View>
  );
}

export default Bottom;