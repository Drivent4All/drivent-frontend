import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';

export default function useBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking,
  } = useAsync(() => hotelApi.getBooking(token));

  return {
    booking,
    bookingLoading,
    bookingError,
    getBooking
  };
}
//
