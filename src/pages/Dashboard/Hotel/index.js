import { useEffect } from 'react';
import {
  BookingPage,
  Title,
  LabelMessage
} from './styles';
import useTicket from '../../../hooks/api/useTicket';
import { HotelComponent } from '../../../components/HotelComponents/HotelComponent';
import { useState } from 'react';
import useBooking from '../../../hooks/api/useBooking';
import BookingConfirmation from '../../../components/BookingConfirmation';

export default function Hotel() {
  const { ticket } = useTicket();
  const { booking } = useBooking();
  const [userTicket, setUserTicket] = useState();
  const [userBooking, setUserBooking] = useState();

  useEffect(async() => {
    const userTicket = await ticket();
    setUserTicket(userTicket);
  }, []);

  useEffect(async() => {
    const userBooking = await booking();
    setUserBooking(userBooking);
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
              <HotelComponent />
        )
        :
        (<LabelMessage>Você precisa ter confirmado pagamento antes<br/>de fazer a escolha de hospedagem</LabelMessage>)
      
    );
  };

  return (
    <BookingPage>
      <Title>Escolha de hotel e quarto</Title>
      { booking ?
        <BookingConfirmation booking={userBooking} />
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
