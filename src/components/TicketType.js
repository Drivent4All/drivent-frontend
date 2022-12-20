import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import useEnrollment from '../hooks/api/useEnrollment';
import useTicketType from '../hooks/api/useTicketType';

export default function SelectTicketType() {
  const { enrollment } = useEnrollment();
  const { ticketType } = useTicketType();
  const [modality, setModality] = useState(null);
  const [options, setOptions] = useState([]);
  const [prices, setPrices] = useState([]);
  const [withHotel, setWithHotel] = useState(null);

  useEffect(() => {
    if (ticketType) {      
      setOptions(ticketType);
      let updatedPrices = [];
      const noHotelOption = ticketType.filter(e => e.isRemote === false && e.includesHotel === false);
      const remoteOption = ticketType.filter (e => e.isRemote === true);
      const withHotelOption = ticketType.filter (e => e.isRemote === false && e.includesHotel === true);
      updatedPrices = [noHotelOption[0].price, remoteOption[0].price, (withHotelOption[0].price - noHotelOption[0].price)];
      setPrices(updatedPrices);
    };
  }, []);

  function checkOption(target) {
    console.log(prices);
    if (target.id === '0') {
      setModality(true);
    };
    if (target.id === '1') {
      setModality(false);
    }
    if (target.id === '2') {
      setWithHotel(false);
    }
    if (target.id === '3') {
      setWithHotel(true);
    }
  }

  return (
    <>
      {enrollment ? 
        <>
          <StyledTypography variant='h4'>Ingresso e Pagamento</StyledTypography>
          <StyledTypography variant='h5' color='textSecondary' >Primeiro, escolha sua modalidade de ingresso</StyledTypography>
          <OptionBox>
            <ModalityBox id={0} color={modality} onClick={e => checkOption(e.currentTarget)}><h3>Presencial</h3>R$ {(prices[0]/100).toString()}</ModalityBox>
            <ModalityBox id={1} color={!modality} onClick={e => checkOption(e.currentTarget)}><h3>Online</h3>R$ {(prices[1]/100).toString()}</ModalityBox>          
          </OptionBox>          
        </>  
        : 'Nada aqui'}
      {modality ?
        <>          
          <StyledTypography variant='h5' color='textSecondary' >Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
          <OptionBox>
            <ModalityBox id={2} color={!withHotel} onClick={e => checkOption(e.currentTarget)}><h3>Sem Hotel</h3>+ R$ 0</ModalityBox>
            <ModalityBox id={3} color={withHotel} onClick={e => checkOption(e.currentTarget)}><h3>Com Hotel</h3>+ R$ {(prices[2]/100).toString()}</ModalityBox>          
          </OptionBox>          
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

