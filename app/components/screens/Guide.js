// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { Link } from 'react-router-native';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import SliderThumb from '../elements/inputs/SliderThumb';
import Exit from '../../assets/icons/Exit';
import useLocale from '../../locales';
import MidiFile from '../../assets/img/midiFile.png';
import MidiFileLogic from '../../assets/img/midiFile_Logic.png';
import guideStyle from '../../styles/guide';
import bottomStyle from '../../styles/bottom';
import mainStyle from '../../styles/main';
import modalsStyle from '../../styles/modals';
import { sliderStyle } from '../../styles/inputs';
import colors from '../../styles/colors';
import type { ReduxState } from '../../types';

export const Guide = (): Node => {
  const { t } = useLocale();
  const config = useSelector((state: ReduxState) => ({
    sliderMin: state.static.sliderMin,
    sliderMax: state.static.sliderMax,
    sliderStep: state.static.sliderStep,
  }), isEqual);
  const [beat1, setBeat1] = useState(false);
  const [beat2, setBeat2] = useState(true);
  const [slider, setSlider] = useState(15);

  return (
    <SafeAreaView style={mainStyle.safe}>
      <Link to="/" style={mainStyle.exit} underlayColor={null}>
        <Exit fill={colors.primaryDark} />
      </Link>

      <ScrollView style={guideStyle.guideScroll}>
        <Text style={guideStyle.guideTitle}>{t('guide.title')}</Text>
        <Text style={guideStyle.guideSub}>{t('guide.section_1.title')}</Text>
        <Text style={guideStyle.guideTxt}>{t('guide.section_1.paragraph_1')}</Text>
        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.orange,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_1.bullet_1')}</Text>
        </View>
        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.green,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_1.bullet_2')}</Text>
        </View>
        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.cyan,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_1.bullet_3')}</Text>
        </View>

        <Text style={guideStyle.guideTxt}>{t('guide.section_1.paragraph_2')}</Text>
        <Slider
          value={slider}
          minimumValue={config.sliderMin}
          maximumValue={config.sliderMax}
          step={config.sliderStep}
          minimumTrackTintColor={colors.grayLight}
          maximumTrackTintColor={colors.grayLight}
          containerStyle={[sliderStyle.container, { marginVertical: 10 }]}
          trackStyle={sliderStyle.track}
          renderThumbComponent={() => <SliderThumb label={t('hihat')} color={colors.orange} />}
          thumbTouchSize={{ width: 65, height: 25 }}
          onValueChange={(val) => setSlider(val)}
        />
        <Text style={guideStyle.guideTxt}>{t('guide.section_1.paragraph_3')}</Text>
        <Text style={guideStyle.guideSub}>{t('guide.section_2.title')}</Text>
        <Text style={guideStyle.guideTxt}>{t('guide.section_2.paragraph_1')}</Text>
        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_2.bullet_1')}</Text>
        </View>

        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_2.bullet_2')}</Text>
        </View>

        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_2.bullet_3')}</Text>
        </View>

        <Text style={guideStyle.guideTxt}>{t('guide.section_2.paragraph_2')}</Text>
        <Text style={guideStyle.guideSub}>{t('guide.section_3.title')}</Text>
        <Text style={guideStyle.guideTxt}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_3.subsection_1.title')}
          </Text>
          {t('guide.section_3.subsection_1.paragraph_1')}
        </Text>
        <View style={guideStyle.guidePresetWrapper}>
          <View style={guideStyle.guidePresetCont}>
            <TouchableHighlight
              underlayColor={colors.grayBlue}
              style={{
                ...bottomStyle.presetBtn,
                ...{
                  paddingVertical: 8,
                  height: 35,
                  width: '100%',
                },
                ...(beat1 && {
                  borderColor: colors.gray,
                  backgroundColor: colors.bg,
                }),
              }}
              onPress={() => setBeat1(!beat1)}
            >
              <Text style={bottomStyle.presetText}>
                {t('guide.section_3.subsection_1.button_1')}
              </Text>
            </TouchableHighlight>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
                color: colors.primaryDark,
              }}
            >
              {t('guide.section_3.subsection_1.button_desc_1')}
            </Text>
          </View>
          <View style={guideStyle.guidePresetCont}>
            <TouchableHighlight
              underlayColor={colors.grayBlue}
              style={{
                ...bottomStyle.presetBtn,
                ...{
                  paddingVertical: 8,
                  height: 35,
                  width: '100%',
                },
                ...(beat2 && {
                  borderColor: colors.gray,
                  backgroundColor: colors.bg,
                }),
              }}
              onPress={() => setBeat2(!beat2)}
            >
              <Text style={bottomStyle.presetText}>
                {t('guide.section_3.subsection_1.button_2')}
              </Text>
            </TouchableHighlight>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
                color: colors.primaryDark,
              }}
            >
              {t('guide.section_3.subsection_1.button_desc_2')}
            </Text>
          </View>
        </View>
        <Text style={guideStyle.guideTxt}>
          {t('guide.section_3.subsection_1.paragraph_2')}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_3.subsection_2.title')}
          </Text>
          {t('guide.section_3.subsection_2.paragraph_1')}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_3.subsection_3.title')}
          </Text>
          {t('guide.section_3.subsection_3.paragraph_1')}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_3.subsection_3.bold_1')}
          </Text>
          {t('guide.section_3.subsection_3.paragraph_2')}
        </Text>
        <View style={guideStyle.guideModalView}>
          <Text style={modalsStyle.modalExp}>{t('guide.section_3.subsection_3.modal.text')}</Text>
          <View style={modalsStyle.modalBtnCont}>
            <TouchableOpacity activeOpacity={0.8} style={modalsStyle.modalBtn}>
              <Text style={modalsStyle.modalBtnTxt}>{t('guide.section_3.subsection_3.modal.yes')}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={modalsStyle.modalBtn}>
              <Text style={modalsStyle.modalBtnTxt}>{t('guide.section_3.subsection_3.modal.no')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={guideStyle.guideSub}>{t('guide.section_4.title')}</Text>
        <Text style={guideStyle.guideTxt}>
          {t('guide.section_4.paragraph_1')}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_4.paragraph_2')}
          </Text>
          {t('guide.section_4.paragraph_3')}
        </Text>
        <View style={guideStyle.guideImgCont}>
          <Image style={guideStyle.guideImg} resizeMode="contain" source={MidiFile} />
        </View>
        <Text style={guideStyle.guideTxt}>{t('guide.section_4.paragraph_4')}</Text>
        <View style={guideStyle.guideImgCont2}>
          <Image style={guideStyle.guideImg} resizeMode="contain" source={MidiFileLogic} />
        </View>
        <Text style={guideStyle.guideTxt}>{t('guide.section_4.paragraph_5')}</Text>
        <Text style={guideStyle.guideSub}>{t('guide.section_5.title')}</Text>
        <Text style={guideStyle.guideTxt}>{t('guide.section_5.paragraph_1')}</Text>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'left',
            fontSize: 16,
            color: colors.primaryDark,
          }}
          selectable
        >
          {t('guide.section_5.email')}
        </Text>
      </ScrollView>
      <View style={mainStyle.adSpace} />
    </SafeAreaView>
  );
};

export default Guide;
