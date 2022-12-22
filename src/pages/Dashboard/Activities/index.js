import { Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import useEvent from '../../../hooks/api/useEvent';
import useTicket from '../../../hooks/api/useTicket';
export default function Activities() {
  const { ticket } = useTicket();
  const { event } = useEvent();
  const [ userTicket, setUserTicket] = useState([]);
  const [ isRemote, setIsRemote ] = useState([]);
  const [ isPayed, setIsPayed ] = useState(false);

  useEffect(async() => {
    const userTicket = await ticket();
    setUserTicket(userTicket);
    if(userTicket.TicketType.isRemote) {
      setIsRemote(true);
    }
    if(userTicket.status === 'PAID') {
      setIsPayed(true);
    }
  }, []);

  return (
    <>
      {isPayed? 
        isRemote? 
          <WarnMessage>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</WarnMessage> :
          <WarnMessage>PAGO</WarnMessage> : 
        <WarnMessage>Você precisa ter confirmado pagamento antes
        de fazer a escolha de atividades</WarnMessage>
      }
     
    </>
  );
}

const WarnMessage = styled.div`
  width: 80%;
  height: 100%;
  transform: translateX(10%);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 1.2rem;
  color: gray;
  font-weight: lighter;

`;
