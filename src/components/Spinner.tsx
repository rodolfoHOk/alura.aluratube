import styled, { keyframes } from 'styled-components';

const spin = keyframes` 
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  width: 14px;
  height: 14px;
  transform: translateY(-2px);

  ::after {
    content: ' ';
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;

export function Spinner() {
  return <StyledSpinner />;
}
