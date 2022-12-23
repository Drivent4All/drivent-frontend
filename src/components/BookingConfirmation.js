import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useBooking from '../hooks/api/useBooking';
import useGetRoom from '../hooks/api/useGetRoom';

import { HotelComponent } from '../components/HotelComponents/HotelComponentChange';

export default function BookingConfirmation({ booking, setBooking, bookings }) {  
  const [changeRoom, setChangeRoom] = useState(false);

  const [hotel, setHotel] = useState();
  const [room, setRoom] = useState();

  const { getRoom } = useGetRoom();
  const { getBooking } = useBooking();

  useEffect(async() => {
    try{
      const booking = await getBooking();
      const room = await getRoom(booking.Room.id);
      setHotel(room.Hotel);
      setRoom(room);
      setBooking(booking);
    }catch(err) {}
  }, []);

  function getAccomodationType(room) {
    let accomodation;
    if (room.capacity === 1) accomodation = 'single';
    if (room.capacity === 2) accomodation = 'double';
    if (room.capacity === 3) accomodation = 'triple';

    return accomodation;
  };

  function getOtherOccupants(bookings) {
    let occupants;
    if (bookings >= 1) occupants = '';
    if (bookings === 2) occupants = 'e mais 1 pessoa';
    if (bookings > 2) occupants = `e mais ${bookings} pessoas`;

    return occupants;
  }

  function handleChangeRoom() {
    setChangeRoom(true);
  }

  return (
    <>{ changeRoom ?
      <HotelComponent setBooking={setBooking} bookingId={booking.id} setChangeRoom={setChangeRoom}/>
      :
      <>
        <HeadLiner>Você já escolheu seu quarto:</HeadLiner>
        {hotel && room ?
          <HotelContainer>
            <img src={hotel.image} alt="hotelImg" />
            <h1>{hotel.name}</h1>
            <h3>Quarto reservado</h3>
            <p>{room.name} ({getAccomodationType(room)})</p>
            <h3>Pessoas no seu quarto</h3>
            <p>Você {getOtherOccupants(bookings)}</p>
          </HotelContainer>
          : <></>
        }
        <Button onClick={handleChangeRoom}>TROCAR DE QUARTO</Button>
      </>
    }
      
    </>
  );
}

const HeadLiner = styled.div`
  display: flex;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom: 17px;
  align-self: flex-start;

  h3 {
    font-weight: 600;
  }
`;

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 196px;
  height: 264px;
  padding: 15px;
  border-radius: 10px;
  background-color: #FFEED2;
  margin-right: 20px;
  margin-bottom: 10px;

  img{
    width: 168px;
    height: 109px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  h1{
    color: #343434;
    font-size: 20px;
    font-weight: 400;
  }

  h3{
    font-size: 12px;
    font-weight: 700;
    color: #3C3C3C;
    margin-top: 10px;
  }

  p{
    font-size: 12px;
    font-weight: 400;
    color: #3C3C3C;
    margin-top: 5px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  margin-top: 23px;
  width: 162px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  cursor: pointer;
`;
