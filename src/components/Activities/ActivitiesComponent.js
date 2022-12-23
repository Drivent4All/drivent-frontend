import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import useEvent from '../../hooks/api/useEvent';
import ActivityBox from './ActivityBox';
import Day from './Day';

export default function ActivitiesComponent() {
  const { event } = useEvent();
  const [selected, setSelected] = useState(null);
  const handleSelected = (value) => {
    setSelected(value);
  };

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Container>
        <h3>{selected ? '' : 'Primeiro, filtre pelo dia do evento'} </h3>
      </Container>
      <DaysBox>
        <Day title="Sexta, 22/10" value={selected} handleSelected={handleSelected} />
        <Day title="Sab, 22/10" value={selected} handleSelected={handleSelected} />
        <Day title="Dom, 22/10" value={selected} handleSelected={handleSelected} />
      </DaysBox>
      {selected ? <ActivityBox /> : ''}
    </>
  );
}

const DaysBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 65%;
  margin-bottom: 3rem;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 40px !important;
`;

const Container = styled.div`
  margin-bottom: 2rem;
  h3 {
    color: #8e8e8e;
    font-size: 1.2rem;
  }
`;
