import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import PlayerScreen from './PlayerScreen';
import Page from '../components/Page';
import {white} from '../modules/colors';

console.disableYellowBox = true;

const Song = ({navigation}) => {
  const song = navigation.getParam('song');

  return (
    <Page>
      <Content vertical={true}>
        <Image source={{uri: song.image}} />
        <PlayerScreen file={song.file} duration={song.duration} />
        <Description>{song.descriptionfull}</Description>
      </Content>
    </Page>
  );
};

const Content = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center'
  }
}))``;

const Image = styled.Image`
  margin: 40px 0 20px 0;
  width: 240px;
  height: 240px;
  border-radius: 4px;
`;

const Description = styled.Text`
  padding: 30px;
  font-size: 16px;
  color: ${white};
  flex: 1;
`;

Song.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('song').title,
  headerTitleStyle: {width: Dimensions.get('window').width}
});

export default Song;
