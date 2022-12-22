import styled from 'styled-components';
import eventFull from '../../assets/images/ant-design_close-circle-outlined.png';
import eventNotFull from '../../assets/images/pepicons_enter.png';

export default function SingleActivity({ title, duration, isFull, spaceAvaliable, size }) {
  return (
    <Wrapper isFull={isFull} size={size}>
      <div className="left">
        <h1>{title}</h1>
        <h2>{duration}</h2>
      </div>
      <div className="middle"></div>
      <div className="right">
        <img src={isFull ? eventFull : eventNotFull} />
        <p> {isFull ? 'esgotado' : `${spaceAvaliable} vagas`}</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f1f1f1;
  border-radius: 5px;
  min-height: ${(props) => (props.size === 'double' ? '11rem' : '5rem')};
  padding: 0.5rem;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .left {
    min-width: 75%;
    max-width: 75%;
    h1 {
      margin-bottom: 7px;
    }
  }
  .middle {
    background-color: lightgray;
    width: 2px;
    height: ${(props) => (props.size === 'double' ? '16 0px' : '60px')};
  }
  .right {
    width: 20%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-size: 10px;
    align-items: center;
    justify-content: center;
    p {
      text-align: center;
      margin-top: 5px;
      color: ${(props) => (props.isFull ? 'red' : 'green')};
    }
    img {
      max-width: 30px;
    }
  }

  h1 {
    font-weight: bold;
    font-size: 12px;
  }
`;
