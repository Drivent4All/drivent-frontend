import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function ActivitiesComponent() {
  return(
    <> 
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Container>
        <h3>Primeiro, filtre pelo dia do evento</h3>
      </Container>
      <DaysBox>
        <Day>Sexta, 22/10</Day>
        <Day>Sexta, 22/10</Day>
        <Day>Sexta, 22/10</Day>
      </DaysBox>
    </>
  );
}

const Day = styled.div`
background-color: #E0E0E0;
width: 20vw;
height: 5vh;
border-radius: 8px;
margin-right: 1rem;
display: flex;
justify-content: center;
align-items: center;
box-shadow: 0 3px 15px 2px rgba(0,0,0,0.1);
`;

const DaysBox = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 65%;
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
