import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import useEvent from '../../hooks/api/useEvent';
import ActivityBox from './ActivityBox';
import Day from './Day';
import useGetActivitiesDates from '../../hooks/api/useGetActivitiesDates';
import { useEffect } from 'react';

export default function ActivitiesComponent() {
  const { event } = useEvent();
  const { activities, getActivitiesDates } = useGetActivitiesDates();
  const [datesDisplay, setDatesDisplay] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(async() => {
    const dates = await getActivitiesDates();
    let formattedDates = [];
    for (let date of dates) {      
      const newDate = new Date(date.date);
      const postDate = newDate.toISOString().slice(0, 10);
      const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
      const displayDate = newDate.toLocaleDateString('pt-BR', options);
      let id = dates.indexOf(date);
      formattedDates.push({ id, postDate, displayDate });
    }
    console.log(formattedDates);
    setDatesDisplay(formattedDates);
  }, []);

  // function removeSuffix(weekday) {
  //   const index = weekday.indexOf('-');
  //   return index !== -1 ? weekday.substring(0, index) : weekday;
  // }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Container>
        <h3>{selectedDay ? '' : 'Primeiro, filtre pelo dia do evento'} </h3>
      </Container>
      <DaysBox>
        {datesDisplay.map((day, index) => <Day onClick={() => setSelectedDay(day)} day={day} title={day.displayDate} key={index} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />)}
      </DaysBox>
      {selectedDay ? <ActivityBox day={selectedDay}/> : ''}
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
