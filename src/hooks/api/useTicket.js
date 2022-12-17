import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket,
  } = useAsync(() => hotelApi.getTicketInfo(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicket
  };
}
//
