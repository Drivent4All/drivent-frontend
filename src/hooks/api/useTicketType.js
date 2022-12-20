import useToken from '../useToken';
import useAsync from '../useAsync';

import * as ticketTypeApi from '../../services/ticketTypeApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: ticketType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
  } = useAsync(() => ticketTypeApi.getTicketType(token));

  return {
    ticketType,
    ticketTypeLoading,
    ticketTypeError,
  };
}
