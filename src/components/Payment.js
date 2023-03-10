import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import PaymentForm from '../pages/Dashboard/Payment/PaymentForm';
import useTicket from '../hooks/api/useTicket';
import { useEffect } from 'react';
import { useState } from 'react';
import usePayment from '../hooks/api/usePayment';
import PaymentConfirmation from '../pages/Dashboard/Payment/PaymentConfirmation';
import useEnrollment from '../hooks/api/useEnrollment';
import { toast } from 'react-toastify';

export default function MakePayment() {
  const { ticket } = useTicket();
  const { paymentLoading, payment } = usePayment();
  const [ ticketType, setTicketType] = useState([]);
  const [ userTicket, setUserTicket] = useState([]);
  const [isPayed, setIsPayed] = useState(false);
  const [ isEnrolled, setIsEnrolled ] = useState(false);
  const { getEnrollment } = useEnrollment();

  useEffect(async() => {
    try {
      const userTicket = await ticket();
      setTicketType(userTicket.TicketType);
      setUserTicket(userTicket);
      if(userTicket.status === 'PAID') {
        setIsPayed(true);
      }
    }catch(err) {}
  }, [isEnrolled]);

  useEffect(async() => {
    try{
      await getEnrollment();
      setIsEnrolled(true);
    }catch(err) {
    };
  }, [isPayed]);

  return (
    <>{isEnrolled?   
      <>
        <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
        <Container>
          <h3>Ingresso Escolhido</h3>
          <TicketTypeBox>
            <p>
              {ticketType.isRemote? 'Remoto' : ticketType.includesHotel? 'Presencial + Com Hotel' : 'Presencial + Sem Hotel'}
              <span>R$ {ticketType.price/100}</span>
            </p>
          </TicketTypeBox>
        </Container>
        <Container>
          <h3>Pagamento</h3>
        </Container>
        {isPayed? 
          <PaymentConfirmation/> :  
          <PaymentForm payment={payment} ticketId={userTicket.id} paymentLoading={paymentLoading} setIsEnrolled={setIsEnrolled}/>}
      </>
      : <UnenrolledMessage>Voc?? precisa completar sua inscri????o antes de prosseguir para a escolha do ingresso</UnenrolledMessage>} 
    </>
  );
}

const UnenrolledMessage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  transform: translateX(50%);
  text-align: center;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 1.5rem;
  color: gray;
  font-weight: lighter;

`;

const StyledTypography = styled(Typography)`
  margin-bottom: 40px !important;
`;

const Container = styled.div`
  margin-bottom: 2rem;
  h3 {
    color: #8e8e8e;
    font-size: 1rem;
  }
`;

const TicketTypeBox = styled.div`
  width: 20rem;
  height: 5rem;
  background-color: #ffeed2;
  margin: 1rem 0;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background-color: #ffeed2;
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    span {
      margin-top: 0.5rem;
      display: block;
      color: #898989;
    }
  }
`;
