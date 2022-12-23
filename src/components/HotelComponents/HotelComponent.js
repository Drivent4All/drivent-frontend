import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';

import useHotel from '../../hooks/api/useHotel';
import useRoom from '../../hooks/api/useRoom';
import { HotelsRoom } from './HotelRooms';

function formatString(string) {
  let array = string.split(' ');

  let formatedString = array.map((letter, index) => {
    if(index === array.length-1) return ` e ${letter}`;
    else if(index === 0) return letter;
    else return `, ${letter}`;
  });
  
  return formatedString;
};

function getVacancyCount(rooms) {
  let count = 0;
  rooms.forEach(room => {
    count = count + (Number(room.capacity) - (room.Booking.length));
  });

  return count;
};

function getAccomodationTypes(roomList) {
  let accomodations = {
    single: false,
    double: false,
    triple: false
  };

  roomList.forEach(room => {
    if(room.capacity > 2) accomodations.triple = true; 
    if(room.capacity > 1) accomodations.double = true;
    if(room.capacity > 0) accomodations.single = true;
  });

  let string = (accomodations.single ? 'Single' : '') + 
    (accomodations.double ? ' Double' : '') + 
    (accomodations.triple ? ' Triple' : '')
  ;

  return formatString(string);
};

const Hotel = ({ hotel, selectedHotel, onClick }) => {
  const { room, getRoom } = useRoom(hotel.id);
  const [ selected, setSelected ] = useState(false);

  useEffect(async() => {
    await getRoom();
  }, []);

  useEffect(() => {
    if(selectedHotel) {
      if(selectedHotel.id === hotel.id) {
        setSelected(true);
      }else{
        setSelected(false);
      }
    }
  }, [selectedHotel]);

  return (
    <HotelContainer onClick={onClick} selected={selected} >
      <img src={hotel.image} alt="hotelImg" />
      <h1>{hotel.name}</h1>
      <h3>Tipos de acomodação:</h3>
      {room ? <p>{getAccomodationTypes(room.Rooms)}</p> : <></>}
      <h3>Vagas disponíveis:</h3>
      {room ? <p>{getVacancyCount(room.Rooms)}</p> : <></>}
    </HotelContainer>
  );
};

export const HotelComponent = ({ setBooking, setHotel, setUserRoom }) => {
  const { hotel, getHotel } = useHotel();
  const [ selectedHotel, setSelectedHotel ] = useState();

  useEffect(async() => {
    await getHotel();
  }, []);

  return (
    <Hotels>
      <h2>Primeiro, escolha seu hotel</h2>
      <div>
        {hotel ? 
          hotel.map((hotel, index) => <Hotel onClick={() => setSelectedHotel(hotel)} hotel={hotel} key={index} selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} />)
          :
          <></>
        }
      </div>
      {selectedHotel ?
        <>
          <h2>Ótima pedida! Agora escolha seu quarto:</h2>
          {selectedHotel ?
            <HotelsRoom hotel={selectedHotel} setBooking={setBooking} setUserRoom={setUserRoom} setHotel={setHotel} />
            :
            <></>
          }
        </> 
        :
        <></>
      }
    </Hotels>
  );
};

const Hotels = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  h2{
    color: #8E8E8E;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  &>div{
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-bottom: 30px;
  }
`;

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${props => props.selected ? '#FFEED2' : '#F1F1F1'};
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

  &:hover {
    cursor: pointer;
  }

`;
