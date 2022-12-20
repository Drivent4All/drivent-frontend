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

  useEffect(() => {
    if (ticketType) {
      let newOptions = [];
      const present = ticketType.filter((e) => (e.isRemote === true && e.includesHotel === true));
      if (present[0]) {
        present[0] = { ...present[0],
          name: 'Presencial',
          id: 0,
          status: 'not-selected' };
        newOptions.push(present[0]);
      };      
      const online = ticketType.filter((e) => (e.isRemote === true));
      if (online[0]) {
        online[0] = { ...online[0],
          name: 'Online',
          id: 1,
          status: 'not-selected' };
        newOptions.push(present[0]);
        setOptions(newOptions);
      } 
    }   
  }, []);

  function checkOption(target) {
    let updatedOptions = [...options];
    updatedOptions.map(option => option.status = 'not-selected');
    updatedOptions[target.id].status = 'selected';
    setModality(updatedOptions[target.id].isRemote);
    setOptions(updatedOptions);
  }

  return (
    <>
      {enrollment ? 
        <>
          <StyledTypography variant='h4'>Ingresso e Pagamento</StyledTypography>
          <StyledTypography variant='h5' color='textSecondary' >Primeiro, escolha sua modalidade de ingresso</StyledTypography>
          <OptionBox>
            {options.map(modality => <ModalityBox id={modality.id} color={modality.status} onClick={e => checkOption(e.currentTarget)}><h3>{modality.name}</h3>R$ {(modality.price/100).toString()}</ModalityBox>)}            
          </OptionBox>
        </>  
        : 'Nada aqui'}
    </>
  );
}

const handleColorType = color => {
  switch (color) {
  case 'selected':
    return '#FFEED2';      
  default:
    return '#FFFFFF';
  }
};

const handleBorderColorType = color => {
  switch (color) {
  case 'selected':
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
`;

