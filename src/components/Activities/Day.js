import styled from 'styled-components';
import { useState, useEffect } from 'react';

export default function Day({ selectedDay, onClick, day }) {
  const [ selected, setSelected ] = useState(false);
  
  useEffect(() => {
    if(selectedDay) {
      if(selectedDay.id === day.id) {
        setSelected(true);
      }else{
        setSelected(false);
      }
    }
  }, [selectedDay]);

  return(
    <Wrapper selected={selected} onClick={onClick} >{ day.displayDate } 
    </Wrapper>
  );
};

const Wrapper = styled.div`
background-color: ${props => props.selected ? '#FFD37D ': '#E0E0E0'};
width: 20vw;
height: 5vh;
border-radius: 8px;
margin-right: 1rem;
display: flex;
justify-content: center;
align-items: center;
box-shadow: 0 3px 15px 2px rgba(0,0,0,0.1);
transition: all .5s;
    :hover{
        filter: brightness(1.1);
        cursor: pointer;
        scale: 1.05;
    }
`;
