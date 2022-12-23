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
  } = useAsync((roomId) => hotelApi.getRoom(token, roomId), false);

  return {
    room,
    roomLoading,
    roomError,
    getRoom
  };
}
//
