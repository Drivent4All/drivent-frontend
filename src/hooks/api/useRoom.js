import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';

export default function useRoom(hotelId) {
  const token = useToken();

  const {
    data: room,
    loading: roomLoading,
    error: roomError,
    act: getRoom,
  } = useAsync(() => hotelApi.getHotelWithRooms(token, hotelId));

  return {
    room,
    roomLoading,
    roomError,
    getRoom
  };
}
//
