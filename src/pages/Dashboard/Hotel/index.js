import { useEffect } from 'react';
import {
  BookingPage,
  Title,
  LabelMessage,
  Hotels,
  HotelContainer
} from './styles';

import useTicket from '../../../hooks/api/useTicket';
import useHotel from '../../../hooks/api/useHotel';

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
          <HotelsComponent />
    );
  };

  const HotelsComponent = () => {
    const { hotel, getHotel } = useHotel();

    useEffect(async() => {
      await getHotel();
    }, []);

    return (
      <Hotels>
        <p>Primeiro, escolha seu hotel</p>

        {hotel ? 
          hotel.map(hotel => <HotelComponent hotel={hotel} />)
          :
          <></>
        }
      </Hotels>
    );
  };

  const HotelComponent = ({ hotel }) => {
    return (
      <HotelContainer>
        <img src={hotel.image} />
        <p>{hotel.name}</p>
      </HotelContainer>
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
