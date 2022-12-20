import useAsync from '../useAsync';

import * as paymentApi from '../../services/paymentApi';
import useToken from '../useToken';

export default function usePayment() {
  const token = useToken();

  const { 
    loading: paymentLoading, 
    error: paymentError, 
    act: payment 
  } = useAsync((data) => paymentApi.payment( data, token ), false);

  return {
    paymentLoading,
    paymentError,
    payment,
  };
}
