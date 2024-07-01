import React, { useState } from 'react';
import styled from 'styled-components';
import anime from 'animejs'; // Updated import with TypeScript support

const Proposal: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const handleMoveButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const top = getRandomNumber(window.innerHeight - button.offsetHeight);
    const left = getRandomNumber(window.innerWidth - button.offsetWidth);

    animateMove(button, 'left', left);
    animateMove(button, 'top', top);
  };

  const getRandomNumber = (num: number) => {
    return Math.floor(Math.random() * (num + 1));
  };

  const animateMove = (element: HTMLElement, prop: string, pixels: number) => {
    anime({
      targets: element,
      [prop]: `${pixels}px`,
      easing: 'easeOutCirc',
    });
  };

  return (
    <Container>
      <Background />
      <Content>
        <Header>Kaavya, Will You Marry Me?</Header>
        <Heart />
        <Message>
          From the moment I met you, I knew you were the one. You've filled my life with love, joy, and laughter. I
          can't imagine spending my life with anyone else. Will you make me the happiest person in the world and marry
          me?
        </Message>
        <ButtonContainer>
          <Button onClick={() => alert('She said YES!')}>Yes</Button>
          <MovingButton
            id="runaway-btn"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMoveButton}
          >
            I need more time
          </MovingButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

const Heart = styled.div`
  width: 100px;
  height: 100px;
  background-color: #e2264d;
  clip-path: polygon(
    50% 0%,
    100% 38%,
    82% 100%,
    18% 100%,
    0% 38%
  );
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #f7f7f7, #ffe4e1);
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  z-index: 1;
`;

const Header = styled.h1`
  font-size: 3em;
  color: #e2264d;
  margin: 0;
`;

const Message = styled.p`
  font-size: 1.5em;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  position: relative;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  margin: 10px;
  cursor: pointer;
  background-color: #e2264d;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #bf1d3c;
    transform: scale(1.05);
  }
`;

const MovingButton = styled(Button)`
  position: absolute;
  transition: top 0.3s ease, left 0.3s ease;
`;

export default Proposal;
