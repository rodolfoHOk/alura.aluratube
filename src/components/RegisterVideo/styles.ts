import styled, { keyframes } from 'styled-components';

const backIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const inForm = keyframes`
  0% {
    transform: translate(200%, 100%);
    opacity: 50%;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

export const StyledRegisterVideo = styled.div`
  .add-video {
    width: 50px;
    height: 50px;
    font-size: 20px;
    color: #f9f9f9;
    position: fixed;
    bottom: 16px;
    right: 16px;
    border: 0;
    background-color: red;
    border-radius: 50%;
    z-index: 99;
    cursor: pointer;

    :hover,
    :focus {
      opacity: 75%;
      transition: opacity ease-in-out 0.2s;
    }
  }

  .close-modal {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 8px;
    right: 16px;
    color: inherit;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  button[type='submit'] {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: bold;
    background-color: red;
    padding: 8px 16px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    color: inherit;

    :hover,
    :focus {
      opacity: unset;
      background-color: rgba(255, 0, 0, 0.7);
    }

    :disabled {
      background-color: rgba(255, 0, 0, 0.1);
      cursor: default;
    }
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    align-self: center;
    margin-bottom: 16px;
  }

  form {
    width: 100%;
    padding: 5%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;

    animation: ${backIn} ease-in-out 0.3s;

    & > div {
      flex: 1;
      border-radius: 8px;
      max-width: 320px;
      background-color: ${({ theme }) => theme.backgroundLevel2};
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 16px;
      padding-top: 40px;

      animation: ${inForm} ease-in-out 0.3s;
    }
  }

  input,
  select {
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.borderBase};
    padding: 8px 10px;
    margin-bottom: 10px;
    outline: none;
    color: #222222;
    background-color: #f9f9f9;
    color: ${({ theme }) => theme.textColorBase};
    background-color: ${({ theme }) => theme.backgroundBase};
  }

  span {
    transform: translateY(-10px);
    padding-left: 4px;
    margin-bottom: 2px;
    font-size: 14px;
    color: red;
  }

  img {
    border-radius: 4px;
    margin-bottom: 10px;
  }
`;
