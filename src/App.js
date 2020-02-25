import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import List from './screens/List';
import Song from './screens/Song';
import {veryBlack, white} from './modules/colors';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: List},
    Song: {screen: Song}
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: veryBlack
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
