import useGetRoom from '../hooks/api/useGetRoom';
import { useState, useEffect } from 'react';

export default function BookingConfirmation({ booking }) {
  const { getRoom } = useGetRoom();
  const [userRoom, setUserRoom] = useState();

  useEffect(async() => {
    const room = getRoom(booking.Room.id);
    setUserRoom(room);
    console.log(room);
    console.log(booking.Room.id);
  }, []);

  return (
    <>
      Nada por aqui
    </>
  );
}
