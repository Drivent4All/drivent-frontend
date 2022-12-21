import useToken from '../useToken';
import useAsync from '../useAsync';

import * as ticketTypeApi from '../../services/ticketTypeApi';

export default function useTicketType() {
  const token = useToken();

  const {
    act: ticketType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
  } = useAsync(() => ticketTypeApi.getTicketType(token), false);

  return {
    ticketType,
    ticketTypeLoading,
    ticketTypeError,
  };
}
