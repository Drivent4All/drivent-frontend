import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useCreateBooking() {
  const token = useToken();

  const {
    loading: createBookingLoading,
    error: createBookingError,
    act: createBooking
  } = useAsync((body) => hotelApi.createBooking(token, body), false);

  return {
    createBookingLoading,
    createBookingError,
    createBooking
  };
}
