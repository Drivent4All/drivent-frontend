import styled from 'styled-components';

export default function SingleActivity({ title, duration }) {
  return (
    <Wrapper>
      <div className="left">
        <h1>Mine</h1>
        <h2>{duration}</h2>
      </div>
      <div className="middle"></div>
      <div className="right">27 vagas</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f1f1f1;
  border-radius: 5px;
  min-height: 4rem;
  padding: 0.5rem;
  font-size: 13px;
  display: flex;
  justify-content: space-between;

  .middle {
    background-color: lightgray;
    width: 2px;
    height: 50px;
  }

  h1 {
    font-weight: bold;
  }
`;
