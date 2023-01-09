import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useCheckSubscription() {
  const token = useToken();
  const {
    loading: checkSubscriptionLoading,
    error: checkSubscriptionError,
    act: checkSubscription
  } = useAsync((data) => activitiesApi.check(data, token), false);

  return {
    checkSubscriptionLoading,
    checkSubscriptionError,
    checkSubscription
  };
}
