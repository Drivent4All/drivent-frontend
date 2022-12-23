import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useBooking() {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: booking,
  } = useAsync(() => bookingApi.getBooking(token), false);

  return {
    bookingLoading,
    bookingError,
    booking,
  };
}
