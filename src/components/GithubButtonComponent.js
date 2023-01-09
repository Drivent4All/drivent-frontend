import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiFillGithub } from 'react-icons/ai';

const GithubButton = styled.div`
  width: 340px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0 10px 0;
  background-color: #333333;
  font-size: 16px;
  border-radius: 4px;
  color: #ffffff;

  .githubIcon {
    font-size: 20px;
    color: #ffffff;
    margin-right: 5px;

  
  }
  &:hover{
    cursor: pointer;
    background-color: #262626;
  }
`;

const GithubArea = styled.div`
  margin-top: 10px;

  h1{
    color: #555555;
  }
`;

export const GithubButtonComponent = ({ onClick }) => {
  return (
    <GithubArea>
      <h1>ou</h1>
      <GithubButton onClick={onClick} >
        <IconContext.Provider value={{ className: 'githubIcon' }}>
          <AiFillGithub />
        </IconContext.Provider>
        <p>Login with Github</p>
      </GithubButton>
    </GithubArea>
  );
};
