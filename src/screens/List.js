import React, {useEffect, useState} from 'react';
import {FlatList, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Page from '../components/Page';
import {black, gray, white} from '../modules/colors';
import getSongs from '../services/getSongs';

const List = ({navigation}) => {
  const [songs, setSongs] = useState();
  useEffect(() => {
    const retriveSongs = async () => {
      const retrievedSongs = await getSongs();
      setSongs(retrievedSongs);
    };

    retriveSongs();
  }, []);

  const ListItem = song => (
    <ListItemWrapper key={song.id} onPress={() => navigation.navigate('Song', {song})}>
      <Row>
        <Image source={{uri: song.image}} />
        <Column>
          <BasicInfo>
            <Title>{song.title}</Title>
          </BasicInfo>
          <Description>{song.description}</Description>
        </Column>
      </Row>
    </ListItemWrapper>
  );

  return (
    <Page>
      <FlatList data={songs} renderItem={({item}) => <ListItem {...item} />} />
    </Page>
  );
};

const ListItemWrapper = styled.TouchableOpacity`
  margin-bottom: 10px;
  padding: 16px;
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: ${gray};
  background-color: ${black};
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const Column = styled.View`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;

const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 4px;
`;

const BasicInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 16px;
  padding-left: 10px;
  color: ${white};
  font-weight: normal;
`;

const Description = styled.Text`
  padding: 10px;
  color: ${gray};
  font-size: 14px;
`;

List.navigationOptions = {
  title: 'Meditation',
  headerTitleStyle: {width: Dimensions.get('window').width}
};

export default List;
