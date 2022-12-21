import styled from 'styled-components';
import check from '../../../assets/images/check.png';

export default function PaymentConfirmation() {
  return (
    <Wrapper>
      <div className='left'>
        <img alt='check' src={check}/>
      </div>
      <div className='right'>
        <h4>Pagamento confirmado!</h4>
        <h5>Prossiga para escolha de hospedagem e atividades</h5>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
display: flex;
align-items: center;
  .left{
    img{
      width: 3rem;
    }
  };
  .right{
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 2.4rem;
    h4{
      font-weight: bold;
    }
  };
`;
