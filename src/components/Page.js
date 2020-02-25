import React from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components';
import {black, veryBlack} from '../modules/colors';

const Page = ({children}) => (
  <SAV>
    <StatusBar barStyle="light-content" backgroundColor={veryBlack} />
    {children}
  </SAV>
);

const SAV = styled.SafeAreaView`
  background-color: ${black};
  flex: 1;
`;

export default Page;
