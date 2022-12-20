import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useTicket() {
  const token = useToken();

  const {
    loading: ticketLoading,
    error: ticketError,
    act: ticket,
  } = useAsync(() => ticketApi.getTicket(token), false);

  return {
    ticketLoading,
    ticketError,
    ticket,
  };
}
