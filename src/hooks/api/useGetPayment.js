import useAsync from '../useAsync';

import * as paymentApi from '../../services/paymentApi';
import useToken from '../useToken';

export default function useGetPayment() {
  const token = useToken();

  const { 
    loading: getPaymentLoading, 
    error: getPaymentError, 
    act: getPayment 
  } = useAsync((data) => paymentApi.getPayment( data, token ), false);

  return {
    getPaymentLoading,
    getPaymentError,
    getPayment,
  };
}
