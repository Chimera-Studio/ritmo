import { hoursToMilliseconds } from 'date-fns';
import { isEqual } from 'lodash';
import { actions } from '../../../store/globalStore';
import { config } from '../../../tokens';
import { useAppDispatch, useAppSelector, useCountdown } from '../../../utils/hooks';

function RewardsCountdown(): null {
  const dispatch = useAppDispatch();
  const reduxStates = useAppSelector((state) => ({
    loadTime: state.static.loadTime,
    rewardedAtSamples: state.global.rewardedAt?.samples,
    rewardedAtPro: state.global.rewardedAt?.pro,
  }), isEqual);
  const resetRewards = hoursToMilliseconds(config.resetRewards);
  const startCountdownSamples = reduxStates.rewardedAtSamples ? reduxStates.rewardedAtSamples + resetRewards - reduxStates.loadTime : undefined;
  const startCountdownPro = reduxStates.rewardedAtPro ? reduxStates.rewardedAtPro + resetRewards - reduxStates.loadTime : undefined;

  useCountdown(() => {
    dispatch(actions.lockRewards());
  }, startCountdownSamples);

  useCountdown(() => {
    dispatch(actions.lockProFeatures());
  }, startCountdownPro);

  return null;
}

export default RewardsCountdown;
