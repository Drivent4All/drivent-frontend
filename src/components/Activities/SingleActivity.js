import styled from 'styled-components';
import eventFull from '../../assets/images/ant-design_close-circle-outlined.png';
import eventNotFull from '../../assets/images/pepicons_enter.png';
import subscribed from '../../assets/images/akar-icons_circle-check.png';
import usePostActivity from '../../hooks/api/usePostActivity';
import { toast } from 'react-toastify';
import useCheckSubscription from '../../hooks/api/useCheckSubscription';
import { useEffect, useState } from 'react';

export default function SingleActivity({ title, duration, isFull, spaceAvaliable, size, index }) {
  const { postActivity } = usePostActivity();
  const { checkSubscription } = useCheckSubscription();
  const [ isSubscribed, setIsSubcribed ] = useState(false);

  useEffect(async() => {
    try {
      const sub = await checkSubscription(index);
      if(!sub) return;
      setIsSubcribed(true);
    }catch(err) {
    }
  }, [] );

  const subscribe = async(id) => {
    if(isSubscribed) {
      toast('Você já está inscrito nessa atividade');
      return;
    };
    if(spaceAvaliable === 0) {
      toast('Capacidade máxima atingida');
      return;
    }
    try {
      await postActivity(id);
      setIsSubcribed(true);
      toast('Inscrito com sucesso!');
    }catch(err) {
      toast(err.response.data);
    }
  };

  return (
    <Wrapper isFull={isFull} size={size} isSubscribed={isSubscribed} onClick={ () => subscribe(index)}>
      <div className="left">
        <h1>{title}</h1>
        <h2>{duration}</h2>
      </div>
      <div className="middle"></div>
      <div className="right">
        <img src={isSubscribed ? subscribed : isFull ? eventFull : eventNotFull} alt='icon' />
        <p> {isSubscribed ? 'Inscrito' : isFull ? 'esgotado' : `${spaceAvaliable} vagas`}</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => (props.isSubscribed ? '#D0FFDB' : '#f1f1f1')};
  border-radius: 5px;
  height: ${(props) => (props.size === 'double' ? '11rem' : '5rem')};
  min-height: ${(props) => (props.size === 'double' ? '11rem' : '5rem')};
  padding: 0.5rem;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  transition: all 0.5s;
  z-index: 1;
  :hover {
    cursor: pointer;
    filter: brightness(0.95);
    scale: 1.05;
  }
  :active {
    scale: 1;
  }

  .left {
    min-width: 75%;
    max-width: 75%;
    h1 {
      margin-bottom: 7px;
      font-size: 11px;
    }
    h2 {
      font-size: 11px;
    }
  }
  .middle {
    background-color: lightgray;
    width: 2px;
    height: ${(props) => (props.size === 'double' ? '16 0px' : '60px')};
  }
  .right {
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-size: 10px;
    align-items: center;
    justify-content: center;
    p {
      text-align: center;
      margin-top: 5px;
      color: ${(props) => (props.isFull ? props.isSubscribed? 'green' : 'red' : 'green')};
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
