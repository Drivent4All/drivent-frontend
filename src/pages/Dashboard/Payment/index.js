import SelectTicketType from '../../../components/TicketType';
import MakePayment from '../../../components/Payment';
import useTicket from '../../../hooks/api/useTicket';
import { useState, useEffect } from 'react';

export default function Payment() {
  const { ticket } = useTicket();
  const [hasTicket, setHasTicket] = useState(false);

  useEffect(async() => {
    try{
      const userTicket = await ticket();
      setHasTicket(userTicket);
    }catch(error) {}
  }, []);

  return (
    <>
      { hasTicket ?
        <MakePayment /> :
        <SelectTicketType setHasTicket={setHasTicket}/>
      }
    </>    
  );
}
