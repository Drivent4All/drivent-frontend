import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export const Room = ({ onClick, room, selectedRoom }) => {
  const isDisabled = (room.capacity - room.Booking.length > 0) ? false : true;
  const isSelectedRoom = selectedRoom ? ((selectedRoom.id === room.id) ? true : false) : false;

  const Vacancies = () => {
    const [ vacanciesArray, setVacanciesArray ] = useState([]);

    useEffect(() => {
      let array = [];
      let selectedAlreadyExist = false;
      for(let i = 0; i < room.capacity; i++) {
        if(room.Booking[i]) {
          array.push(2);
        } else if(selectedRoom) {
          if(selectedRoom.id === room.id && !selectedAlreadyExist) {
            array.push(1);
            selectedAlreadyExist = true;
          } else {
            array.push(0);
          }
        } else {
          array.push(0);
        };
      };
      array.sort();
      setVacanciesArray(array);
    }, []);
    
    return (
      <IconContext.Provider value={{ className: 'icons' }}>
        <div>
          {vacanciesArray.map((vacancy, index) => {
            return (<Vacancy key={index} >
              {vacancy === 2 ?
                <BsPersonFill key={index} />
                :
                vacancy === 1 ?
                  <span>
                    <IconContext.Provider value={{ className: 'selectable' }}>
                      <BsPersonFill key={index} />
                    </IconContext.Provider>
                  </span>
                  :
                  <BsPerson key={index} />
              }
            </Vacancy>);
          })}
        </div>
      </IconContext.Provider>
    );
  };

  return (
    <RoomComponent onClick={isDisabled ? () => {} : onClick } disabled={isDisabled} selected={isSelectedRoom} >
      <p>{room.name}</p>
      <Vacancies />
    </RoomComponent>
  );
};

const Vacancy = styled.div`
  .selectable {
    font-size: 22px;
    color: #FF4791;
  }
`;

const RoomComponent = styled.div`
  width: 190px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #CECECE;
  margin-right: 17px;
  margin-bottom: 10px;

  p{
    color: #454545;
  }

  div{
    display: flex;
    flex-direction: row;
  }

  ${props => props.selected ? 
    `
    background-color: #FFEED2;
    `
    : ''}

  ${props => props.disabled ?
    `
      background-color: #E9E9E9;
      p{
        font-weight: 700;
        color: #9D9D9D;
      }
    
      .icons {
        font-size: 22px;
        color: #8C8C8C;
      }
    `
    : 
    `
      &:hover{
        cursor: pointer;
      }
    
      p{
        font-weight: 700;
        color: #454545;
      }
    
      .icons {
        font-size: 22px;
      }
    `
}`;
