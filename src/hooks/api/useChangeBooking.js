import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useChangeBooking(bookingId) {
  const token = useToken();

  const {
    loading: changeBookingLoading,
    error: changeBookingError,
    act: changeBooking
  } = useAsync((body) => hotelApi.changeBooking(token, body, bookingId), false);

  return {
    changeBookingLoading,
    changeBookingError,
    changeBooking
  };
}
