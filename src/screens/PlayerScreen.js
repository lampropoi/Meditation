import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import Slider from 'react-native-slider';
import Sound from 'react-native-sound';
import styled from 'styled-components';
import {green, gray, white} from '../modules/colors';

import pauseImage from '../../assets/icons/pause.png';
import playImage from '../../assets/icons/play.png';

const PlayerScreen = ({file, duration}) => {
  // status can be playing, paused, loading
  const [status, setStatus] = useState('paused');
  const [playSeconds, setPlaySeconds] = useState(0);
  const [sound, setSound] = useState(null);
  const [sliderEditing, setSliderEditing] = useState(false);

  // if we leave this screen, release (hard stop) the sound
  useEffect(
    () => () => {
      if (sound) {
        sound.release();
        setSound(null);
      }
    },
    [sound]
  );

  // update the slider position every x milliseconds
  useEffect(() => {
    const timeout = setInterval(() => {
      if (sound && sound.isLoaded() && status === 'playing' && !sliderEditing) {
        sound.getCurrentTime(seconds => setPlaySeconds(Math.round(seconds)));
      }
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [sound, status, sliderEditing]);

  // on play, either continue playing, or load the sound
  //  we dont load earlier to avoid wasting user 4G data
  const play = async () => {
    if (sound) {
      sound.play(playComplete);
      setStatus('playing');
    } else {
      setStatus('loading');
      const newSound = new Sound(file, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
        } else {
          setSound(newSound);
          // console.log(newSound.getDuration());
          newSound.play(playComplete);
          setStatus('playing');
        }
      });
    }
  };

  const pause = () => {
    sound.pause();
    setStatus('paused');
  };

  const playComplete = () => {
    setStatus('paused');
    setPlaySeconds(0);
  };

  const onSliderEditStart = () => {
    setSliderEditing(true);
  };
  const onSliderEditEnd = () => {
    setSliderEditing(false);
  };

  const onSliderEditing = value => {
    if (sound) {
      sound.setCurrentTime(value);
      setPlaySeconds(value);
    }
  };

  const getAudioTimeString = totalSeconds => {
    const minutes = parseInt((totalSeconds % (60 * 60)) / 60, 10);
    const seconds = parseInt(totalSeconds % 60, 10);

    const minutesFull = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFull = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutesFull}:${secondsFull}`;
  };

  const currentTimeString = getAudioTimeString(playSeconds);
  const durationString = getAudioTimeString(duration);

  return (
    <Container>
      <SliderContainer>
        <Slider
          onSlidingStart={onSliderEditStart}
          onSlidingComplete={onSliderEditEnd}
          onValueChange={onSliderEditing}
          value={playSeconds}
          maximumValue={duration}
          maximumTrackTintColor={gray}
          minimumTrackTintColor={green}
          thumbTintColor={green}
        />
      </SliderContainer>
      <Time>{`${currentTimeString} / ${durationString}`}</Time>

      <ActionButtons>
        {status === 'playing' && (
          <TouchableOpacity onPress={pause}>
            <PlayPauseButton source={pauseImage} />
          </TouchableOpacity>
        )}
        {status === 'paused' && (
          <TouchableOpacity onPress={play}>
            <PlayPauseButton source={playImage} />
          </TouchableOpacity>
        )}
        {status === 'loading' && <Loading size="large" color={gray} />}
      </ActionButtons>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  width: 100%;
`;

const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const SliderContainer = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0 20px;
  flex-direction: column;
`;

const PlayPauseButton = styled.Image`
  width: 60px;
  height: 60px;
`;

const Loading = styled.ActivityIndicator`
  width: 60px;
  height: 60px;
`;

const Time = styled.Text`
  color: ${white};
  padding: 5px 20px;
`;

export default PlayerScreen;
