import useAsync from '../useAsync';

import * as oauthApi from '../../services/oauthApi';

export default function useOAuth() {
  const {
    loading: signInLoading,
    error: signInError,
    act: oauthSignIn
  } = useAsync(oauthApi.oauthSignIn, false);

  return {
    signInLoading,
    signInError,
    oauthSignIn
  };
}
