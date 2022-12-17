import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import useEnrollment from '../hooks/api/useEnrollment';

export default function SelectTicketType() {
  const { enrollment } = useEnrollment();
  const [modality, setModality] = useState(null);
  const [options, setOptions] = useState([
    { id: 1,
      name: 'Presencial',
      price: 150,
      status: 'not-selected',
      isRemote: false },
    { name: 'Online',
      id: 2,
      price: 100,
      status: 'not-selected',
      isRemote: true }
  ]);

  function checkOption(target) {
    let index = target.id-1;
    if (target.id === 1) {
      setModality(false);
    }
    if (target.id === 2) {
      setModality(true);
    }

    let updatedOptions = [...options];       
    if (index === 0) {
      updatedOptions[index].status = 'selected';
      updatedOptions[1].status = 'not-selected';
    }
    if (index === 1) {
      updatedOptions[index].status = 'selected';
      updatedOptions[0].status = 'not-selected';
    }
    setOptions(updatedOptions);
  }

  return (
    <>
      {enrollment ? 
        <>
          <StyledTypography variant='h4'>Ingresso e Pagamento</StyledTypography>
          <StyledTypography variant='h5' color='textSecondary' >Primeiro, escolha sua modalidade de ingresso</StyledTypography>
          <OptionBox>
            {options.map(modality => <ModalityBox id={modality.id} color={modality.status} onClick={e => checkOption(e.currentTarget)}><h3>{modality.name}</h3>R${modality.price.toString()}</ModalityBox>)}            
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

