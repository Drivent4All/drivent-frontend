import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import useEnrollment from '../hooks/api/useEnrollment';
import useTicketType from '../hooks/api/useTicketType';
import useCreateTicket from '../hooks/api/useCreateTicket';
import { toast } from 'react-toastify';

export default function SelectTicketType({ setHasTicket }) {
  const { enrollment } = useEnrollment();
  const { ticketType } = useTicketType();
  const [modality, setModality] = useState(null);
  const [prices, setPrices] = useState([]);
  const [withHotel, setWithHotel] = useState(null);
  const [isFinal, setIsFinal] = useState(null);
  const [total, setTotal] = useState(0);
  const { createTicket } = useCreateTicket();
  const [ ticket, setTicket ] = useState([]);

  useEffect(async() => {
    const newTicket = await ticketType();
    setTicket(newTicket);
    let updatedPrices = [];
    const noHotelOption = newTicket.filter(e => e.isRemote === false && e.includesHotel === false);
    const remoteOption = newTicket.filter (e => e.isRemote === true);
    const withHotelOption = newTicket.filter (e => e.isRemote === false && e.includesHotel === true);
    updatedPrices = [noHotelOption[0].price, remoteOption[0].price, (withHotelOption[0].price - noHotelOption[0].price)];
    setPrices(updatedPrices);
  }, []);

  function checkOption(target) {      
    if (target.id === '0') {
      setModality(true);
      setIsFinal(false);
      if (withHotel) {
        setTotal(prices[0] + prices[2]);
      }
      else {
        setTotal(prices[0]);
      }
    };
    if (target.id === '1') {
      setModality(false);
      setWithHotel(null);
      setTotal(prices[1]);
      setIsFinal(true);
    }
    if (target.id === '2') {
      setWithHotel(false);
      setTotal(prices[0]);
      setIsFinal(true);
    }
    if (target.id === '3') {
      setWithHotel(true);
      setTotal(prices[0] + prices[2]);
      setIsFinal(true);
    }
  }

  async function placeReservation() {
    const ticketTypeId = findTicketType();
    try {
      await createTicket({ ticketTypeId });
      toast('Ticket reservado com sucesso');
      setHasTicket(true);
    } catch (err) {
      toast('Houve um erro ao processar as informações');
    };
  }

  function findTicketType() {
    let selectedTicketType = ticket.filter(e => e.isRemote === !modality);
    if (selectedTicketType.length > 1) {
      selectedTicketType = selectedTicketType.filter(e => e.includesHotel === withHotel);
    }
    return selectedTicketType[0].id;
  }

  return (
    <>
      {enrollment ? 
        <>
          <StyledTypography variant='h4'>Ingresso e Pagamento</StyledTypography>
          <HeadLiner>Primeiro, escolha sua modalidade de ingresso</HeadLiner>
          <OptionBox>
            <ModalityBox id={0} color={modality} onClick={e => checkOption(e.currentTarget)}><h3>Presencial</h3>R$ {(prices[0]/100).toString()}</ModalityBox>
            <ModalityBox id={1} color={modality===false} onClick={e => checkOption(e.currentTarget)}><h3>Online</h3>R$ {(prices[1]/100).toString()}</ModalityBox>          
          </OptionBox>   
          {modality ?
            <>          
              <HeadLiner>Ótimo! Agora escolha sua modalidade de hospedagem</HeadLiner>
              <OptionBox>
                <ModalityBox id={2} color={withHotel===false} onClick={e => checkOption(e.currentTarget)}><h3>Sem Hotel</h3>+ R$ 0</ModalityBox>
                <ModalityBox id={3} color={withHotel} onClick={e => checkOption(e.currentTarget)}><h3>Com Hotel</h3>+ R$ {(prices[2]/100).toString()}</ModalityBox>          
              </OptionBox>          
            </>  
            : ''}       
        </>
        : <UnenrolledMessage>Você precisa completar sua inscrição antes de prosseguir para a escolha do ingresso</UnenrolledMessage>}      
      {isFinal ?
        <>
          <HeadLiner>{'Fechado! O total ficou em '}<h3>&nbsp;R$ {(total/100).toString()}</h3>. Agora é só confirmar:</HeadLiner>
          <Button onClick={placeReservation}>RESERVAR INGRESSO</Button>
        </>
        : ''}
    </>
  );
}

const handleColorType = color => {
  switch (color) {
  case true:
    return '#FFEED2';      
  default:
    return '#FFFFFF';
  }
};

const handleBorderColorType = color => {
  switch (color) {
  case true:
    return '#FFEED2';      
  default:
    return '#CECECE';
  }
};

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const HeadLiner = styled.div`
  display: flex;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom: 17px;

  h3 {
    font-weight: 600;
  }
`;

const ModalityBox = styled.div`
  width: 145px;
  height: 145px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  color: #898989;
  background: ${({ color }) => handleColorType(color)};
  border: 1px solid ${({ color }) => handleBorderColorType(color)};
  z-index: 1;
  cursor: pointer;

  h3 {
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }
`;

const OptionBox = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 44px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const UnenrolledMessage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  transform: translateX(50%);
  text-align: center;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 1.5rem;
  color: gray;
  font-weight: lighter;

`;
