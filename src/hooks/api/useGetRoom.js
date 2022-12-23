import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';

export default function useGetRoom() {
  const token = useToken();

  const {
    data: room,
    loading: roomLoading,
    error: roomError,
    act: getRoom,
  } = useAsync((data) => hotelApi.getRoom(token, data));

  return {
    room,
    roomLoading,
    roomError,
    getRoom
  };
}
//
