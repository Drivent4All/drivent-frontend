import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useGetActivitiesByDay from '../../hooks/api/useGetActivitiesByDay';
import { useEffect, useState } from 'react';
import SingleActivity from './SingleActivity';
import { toast } from 'react-toastify';

export default function ActivityBox({ day }) {
  const date = day.postDate.toString();
  const { getActivities } = useGetActivitiesByDay();
  const [activitiesList, setActivitiesList] = useState([]);
  const [activitiesInfo, setActivitiesInfo] = useState({});

  useEffect(async() => {
    try {
      const activities = await getActivities(date);
      const grouped = activities.reduce((acc, curr) => {
        const key = curr.place;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      }, {});
      setActivitiesList(Object.keys(grouped));
      setActivitiesInfo(grouped);
    } catch (error) {
      toast('Algo deu errado!');
    }
  }, [day]);

  return (
    <Wrapper>
      {activitiesList && activitiesList.map((activity, index) => (
        <div key={index}>
          <StyledTypography variant="h5">{activity}</StyledTypography>
          <ul className="column">
            {activitiesInfo[activity] && activitiesInfo[activity].map((singleActivity, index) => (
              <SingleActivity
                key={index}
                index={singleActivity.id}
                title={singleActivity.name}
                duration={`${singleActivity.startsAt} - ${singleActivity.endsAt}`}
                isFull={singleActivity.capacity === 0 ? true : false}
                spaceAvaliable={singleActivity.capacity}
                size={Number(singleActivity.endsAt.split('h')[0]) - Number(singleActivity.startsAt.split('h')[0]) === 2 ? 'double' : 'regular'}
              />
            ))}
          </ul>
        </div>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 34%;
  }

  .column {
    border: 1px solid #d7d7d7;
    padding: 0.5rem;
    min-width: 100%;
    max-width: 100%;
    min-height: 40vh;
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  font-size: 1.2rem !important;
  color: gray;
`;
