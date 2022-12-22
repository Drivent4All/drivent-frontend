import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import SingleActivity from './SingleActivity';

export default function ActivityBox() {
  return (
    <Wrapper>
      <div className="left">
        <StyledTypography variant="h5">Auditório Principal</StyledTypography>
        <ul className="column">
          <SingleActivity title={'Minecraft: montando o PC ideal'} duration={'09:00 - 10:00'} />
        </ul>
      </div>
      <div className="middle">
        <StyledTypography variant="h5">Auditório Principal</StyledTypography>
        <ul className="column"></ul>
      </div>

      <div className="right">
        {' '}
        <StyledTypography variant="h5">Auditório Principal</StyledTypography>
        <ul className="column"></ul>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 100vw;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .column {
    border: 2px solid #d7d7d7;
    padding: 0.5rem;
    width: 15.9rem;
    min-height: 40vh;
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  font-size: 1.2rem !important;
  color: gray;
`;
