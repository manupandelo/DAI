import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import WeatherTime from './Screens/WeatherTime';
import AllContacts from './Screens/Contacts';
import AboutUs from './Screens/AboutUs';
import SetEmmergencyPhone from './Screens/SetEmmergencyPhone';

export default function App() {
  const Stack= createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Contacts" component={AllContacts}/>
          <Stack.Screen name="AboutUs" component={AboutUs}/>
          <Stack.Screen name="WeatherTime" component={WeatherTime} />
          <Stack.Screen name="SetEmmergencyPhone" component={SetEmmergencyPhone} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


/*<Stack.Screen name="WeatherTime" component={WeatherTime} />
<Stack.Screen name="BarCodeScanner" component={AboutUs} />
          <Stack.screen name="SetEmmergencyPhone" component={SetEmmergencyPhone} />*/