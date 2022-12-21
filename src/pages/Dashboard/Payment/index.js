import SelectTicketType from '../../../components/TicketType';
import MakePayment from '../../../components/Payment';
import useTicket from '../../../hooks/api/useTicket';
import { useState, useEffect } from 'react';

export default function Payment() {
  const { ticket } = useTicket();
  const [hasTicket, setHasTicket] = useState(false);

  useEffect(async() => {
    const userTicket = await ticket();
    if (userTicket) {
      setHasTicket(true);
    }    
  }, []);

  return (
    <>
      { hasTicket ?
        <MakePayment /> :
        <SelectTicketType />
      }
    </>    
  );
}
