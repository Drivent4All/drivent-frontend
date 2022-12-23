import { useEffect } from 'react';
import {
  BookingPage,
  Title,
  LabelMessage
} from './styles';
import useTicket from '../../../hooks/api/useTicket';
import useBooking from '../../../hooks/api/useBooking';
import { HotelComponent } from '../../../components/HotelComponents/HotelComponent';
import { useState } from 'react';
import BookingConfirmation from '../../../components/BookingConfirmation';
import useGetRoom from '../../../hooks/api/useGetRoom';

export default function Hotel() {
  const { ticket } = useTicket();
  const { getBooking } = useBooking();
  const [userTicket, setUserTicket] = useState();
  const [userBooking, setUserBooking] = useState();
  const [userRoom, setUserRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [bookings, setBookings] = useState(1);
  const { getRoom } = useGetRoom();

  useEffect(async() => {
    try{
      const userTicket = await ticket();
      setUserTicket(userTicket);
      const booking = await getBooking();
      const roomInfo = booking.Room;
      const room = await getRoom(roomInfo.id);
      setUserRoom(room);
      setHotel(room.Hotel);
      setBookings(room.Booking.length);
      setUserBooking(booking);
    }catch(error) {}
  }, []);

  const BookingLabel = ({ ticket }) => {
    return (
      ticket ? 
        (
          ticket.status === 'RESERVED' ? 
            <LabelMessage>Você precisa ter confirmado pagamento antes<br/>de fazer a escolha de hospedagem</LabelMessage>
            :
            (!ticket.TicketType.includesHotel) ?
              <LabelMessage>Sua modalidade de ingresso não inclui hospedagem<br/>Prossiga para a escolha de atividades</LabelMessage>
              :
              <HotelComponent setBooking={setUserBooking} setUserRoom={setUserRoom} setHotel={setHotel} />
              
        )
        :
        (<LabelMessage>Você precisa ter confirmado pagamento antes<br/>de fazer a escolha de hospedagem</LabelMessage>)
      
    );
  };

  return (
    <BookingPage>
      <Title>Escolha de hotel e quarto</Title>
      { userBooking ?
        <BookingConfirmation booking={userBooking} setBooking={setUserBooking} room={userRoom} hotel={hotel} bookings={bookings}/>
        : <>
          {ticket ?
            <BookingLabel ticket={userTicket}/>
            :
            <LabelMessage>Você precisa ter confirmado pagamento antes<br/>de fazer a escolha de hospedagem</LabelMessage>
          }
        </>
      }
      
    </BookingPage>
  );
}
