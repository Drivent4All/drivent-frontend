import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import PaymentForm from './PaymentForm';
import useTicket from '../../../hooks/api/useTicket';
import { useEffect } from 'react';
import { useState } from 'react';
import usePayment from '../../../hooks/api/usePayment';
import useGetPayment from '../../../hooks/api/useGetPayment';

export default function Payment() {
  const { ticket } = useTicket();
  const { paymentLoading, payment } = usePayment();
  const { getPayment } = useGetPayment();
  const [ ticketType, setTicketType] = useState([]);
  const [ userTicket, setUserTicket] = useState([]);
  const [isPayed, setIsPayed] = useState(false);

  useEffect(async() => {
    const userTicket = await ticket();
    setTicketType(userTicket.TicketType);
    setUserTicket(userTicket);

    if(userTicket.status === 'PAID') {
      setIsPayed(true);
    }
  }, []);

  // useEffect(async() => {
  //   const payment = await getPayment(userTicket.id);
  //   if(!payment) console.log('não tem pagamento ainda');

  //   console.log(payment);
  // }, []);

  return (
    <>
      <h1>{isPayed? 'Ta pago' : 'n ta'}</h1>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Container>
        <h3>Ingresso Escolhido</h3>
        <TicketTypeBox>
          <p>
            {ticketType.isRemote? 'Remoto' : ticketType.includesHotel? 'Presencial + Com Hotel' : 'Presencial + Sem Hotel'}
            <span>R$ {ticketType.price}</span>
          </p>
        </TicketTypeBox>
      </Container>
      <Container>
        <h3>Pagamento</h3>
      </Container>
      <PaymentForm payment={payment} ticketId={userTicket.id} paymentLoading={paymentLoading}/>
    </>
  );
}

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
