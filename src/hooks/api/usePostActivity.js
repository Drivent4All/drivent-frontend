import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function usePostActivity() {
  const token = useToken();
  const {
    loading: postActivityLoading,
    error: postActivityError,
    act: postActivity
  } = useAsync((data) => activitiesApi.post(data, token), false);

  return {
    postActivityLoading,
    postActivityError,
    postActivity
  };
}
