// @flow
import { StyleSheet } from 'react-native';
import { isTablet } from '../utils';
import colors from './colors';

type NotificationsStyle = {
  alertWrapper: Object,
  alertText: Object,
}

const notificationsStyle: NotificationsStyle = StyleSheet.create({
  alertWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    elevation: 1,
    marginHorizontal: !isTablet ? '5%' : '15%',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    top: '15%',
    width: !isTablet ? '90%' : '70%',
    zIndex: 1,
  },
  alertText: {
    color: colors.gray,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default notificationsStyle;