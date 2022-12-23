import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import useRoom from '../../hooks/api/useRoom';
import useCreateBooking from '../../hooks/api/useCreateBooking';
import { Room } from './Room';

export const HotelsRoom = ({ hotel, setBooking }) => {
  const { createBooking } = useCreateBooking();
  const { room, getRoom } = useRoom(hotel.id);

  const [selectedRoom, setSelectedRoom] = useState();

  useEffect(async() => {
    await getRoom();
  }, [hotel]);

  async function handleConfirmRoom() {
    const body = {
      roomId: selectedRoom.id
    };

    try {
      const booking = await createBooking(body);
      toast('Quarto reservado com sucesso!');
      setBooking(booking);
    } catch (err) {
      toast('Não foi possível salvar suas informações!');
    }
  }

  return (
    room ?
      <>
        <Rooms>
          { room.Rooms.map((room, index) => {
            return (
              <Room onClick={() => setSelectedRoom(room)} room={room} key={index} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
            );
          })}
        </Rooms>
        {selectedRoom ?
          <ReserveButton onClick={handleConfirmRoom}>RESERVAR QUARTO</ReserveButton>
          :
          <></>
        }
      </>
      :
      <></>
  );
};

const Rooms = styled.div`
  flex-wrap: wrap;
`;

const ReserveButton = styled.button`
  width: 180px;
  height: 35px;
  border: 0;
  border-radius: 5px;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }
`;
