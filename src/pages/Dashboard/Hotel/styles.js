import styled from 'styled-components';

export const BookingPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 34px;
  font-weight: 400;
  margin-bottom: 35px;
`;

export const LabelMessage = styled.div`
  width: 60%;
  margin: auto;
  color: #8E8E8E;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const Hotels = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  p {
    color: #8E8E8E;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
  }
`;

export const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  padding: 15px;
  border-radius: 10px;
  background-color: #EBEBEB;

  img{
    width: 168px;
    height: 109px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  p{
    color: #343434;
    font-size: 20px;
    font-weight: 400;
  }

  &:hover {
    cursor: pointer;
  }

`;
