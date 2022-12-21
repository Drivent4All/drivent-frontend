import { useEffect } from 'react';
import {
  BookingPage,
  Title,
  LabelMessage
} from './styles';

import useTicket from '../../../hooks/api/useTicket';
import { HotelComponent } from '../../../components/HotelComponents/HotelComponent';
import { useState } from 'react';

export default function Hotel() {
  const { ticket } = useTicket();
  const [userTicket, setUserTicket] = useState();

  useEffect(async() => {
    const userTicket = await ticket();
    setUserTicket(userTicket);
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
      {ticket ?
        <BookingLabel ticket={userTicket}/>
        :
        <LabelMessage>Você precisa ter confirmado pagamento antes<br/>de fazer a escolha de hospedagem</LabelMessage>
      }
    </BookingPage>
  );
}
