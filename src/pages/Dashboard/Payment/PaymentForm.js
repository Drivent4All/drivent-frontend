import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    issuer: ''
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submit = async(e) => {
    e.preventDefault();
    const body = { ticketId: this.props.ticketId, cardData: this.state };
    try {
      await this.props.payment(body);
      toast('Pagamento Concluído');
      this.props.setIsEnrolled(false);
      this.props.setIsEnrolled(true);
    }catch(err) {
      toast('Houve um erro ao processar o pagamento');
    }
  };

  render() {
    return (
      <>
        <FormContainer>
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
            callback={(type) => {
              this.setState({ issuer: type.issuer.toUpperCase() });
            }}
          />
          <form onSubmit={this.submit} id="card">
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              maxLength={19}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <label>E.g: 49.., 51.., 36.., 37..</label>
            <input
              type="tel"
              name="name"
              placeholder="Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <div className="division">
              <input
                type="tel"
                maxLength={4}
                name="expiry"
                placeholder="Valid Thru"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <input
                type="tel"
                name="cvc"
                maxLength={3}
                placeholder="CVC"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
          </form>
        </FormContainer>
        <Button form="card" type="submit" disabled={this.props.paymentLoading}>
          finalizar pagamento
        </Button>
      </>
    );
  }
}

const FormContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin-bottom: 2rem;
  .rccs {
    margin: 0 15px 0 0;
  }
  .division {
    display: flex;
    justify-content: space-between;
    input:nth-child(1) {
      width: 60%;
    }
    input:nth-child(2) {
      width: 30%;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    .button {
      position: absolute;
      left: -20rem;
      bottom: -5rem;
    }
    label {
      color: grey;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      font-size: 0.8rem;
      position: absolute;
      top: 2.7rem;
      left: 0;
      margin-top: 0.3rem;
    }

    input {
      height: 2.5rem;
      border-radius: 4px;
      border: 1px solid lightgrey;
      padding-left: 0.5rem;
      ::placeholder {
        color: grey;
        font-size: 1rem;
      }
    }
  }
`;
