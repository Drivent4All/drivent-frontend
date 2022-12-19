import { useEffect } from 'react';
import {
  BookingPage,
  Title,
  LabelMessage
} from './styles';

import useTicket from '../../../hooks/api/useTicket';
import { HotelComponent } from '../../../components/HotelComponents/HotelComponent';

export default function Hotel() {
  const { ticket, getTicket } = useTicket();

  useEffect(async() => {
    await getTicket();
  }, []);

  const BookingLabel = ({ ticket }) => {
    return (
      ticket.status === 'RESERVED' ? 
        <LabelMessage>Você precisa ter confirmado pagamento antes<br/>de fazer a escolha de hospedagem</LabelMessage>
        :
        (!ticket.TicketType.includesHotel) ?
          <LabelMessage>Sua modalidade de ingresso não inclui hospedagem<br/>Prossiga para a escolha de atividades</LabelMessage>
          :
          <HotelComponent />
    );
  };

  return (
    <BookingPage>
      <Title>Escolha de hotel e quarto</Title>
      {ticket ?
        <BookingLabel ticket={ticket}/>
        :
        <LabelMessage>Você precisa ter confirmado pagamento antes<br/>de fazer a escolha de hospedagem</LabelMessage>
      }
    </BookingPage>
  );
}
