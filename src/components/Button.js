import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components';
import play from '../../assets/icons/play.png';
import pause from '../../assets/icons/pause.png';
import stop from '../../assets/icons/stop.png';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px;
  background: red;
  padding: 10px;
  width: 120px;
  border: 1px solid red;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
`;

const Button = ({text, image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <ButtonText>{text}</ButtonText>
        {image && <Image source={image} alt={text} style={{width: 18, height: 18}} />}
      </Container>
    </TouchableOpacity>
  );
};

export const PlayButton = ({onPress}) => {
  return <Button text="Play" image={play} onPress={onPress} />;
};

export const ResumeButton = ({onPress}) => {
  return <Button text="Resume" image={pause} onPress={onPress} />;
};

export const PauseButton = ({onPress}) => {
  return <Button text="Pause" image={pause} onPress={onPress} />;
};

export const StopButton = ({onPress}) => {
  return <Button text="Stop" image={stop} onPress={onPress} />;
};
