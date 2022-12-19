import useAsync from '../useAsync';

import * as userApi from '../../services/userApi';

export default function usePayment() {
  const { loading: paymentLoading, error: paymentError, act: payment } = useAsync(userApi.payment, false);

  return {
    paymentLoading,
    paymentError,
    payment,
  };
}
