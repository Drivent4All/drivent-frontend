import { useEffect } from 'react';
import styled from 'styled-components';
import useRoom from '../../hooks/api/useRoom';

export const HotelsRoom = ({ hotel }) => {
  const { room, getRoom } = useRoom(hotel.id);

  useEffect(async() => {
    await getRoom();
  }, [hotel]);

  return (
    room ?
      <Rooms>
        { room.Rooms.map((room, index) => <p key={index}>{room.name}</p>) }
      </Rooms>
      :
      <></>
  );
};

const Rooms = styled.div`
  p{
    color: black;
    margin: 2px;
  }
`;
