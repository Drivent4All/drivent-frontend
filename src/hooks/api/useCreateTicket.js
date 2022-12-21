import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketsApi from '../../services/ticketsApi';

export default function useCreateTicket(body) {
  const token = useToken();

  const {
    loading: createTicketLoading,
    error: createTicketError,
    act: createTicket
  } = useAsync((data) => ticketsApi.createTicket(data, token), false);

  return {
    createTicketLoading,
    createTicketError,
    createTicket
  };
}
