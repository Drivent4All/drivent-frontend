import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function usePostActivity() {
  const token = useToken();

  const {
    loading: postActivityLoading,
    error: postActivityError,
    act: postActivity
  } = useAsync((data) => activityApi.post(data, token), false);

  return {
    postActivityLoading,
    postActivityError,
    postActivity
  };
}
