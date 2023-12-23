import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { Fontisto, MaterialCommunityIcons } from 'react-native-vector-icons';
import HomeScreen from '../Screens/Home';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <Pressable onPress={() => console.log('working')}>
                <Fontisto name="right-align" size={20} color="#4498D6" />
              </Pressable>
            ),
            title: 'Cleaning Calender',
            headerStyle: {},
            headerTitleStyle: {
              // textAlign: 'center',
              // flex: 1,
            },
            headerLeft: () => (
              <Pressable onPress={() => console.log('working')}>
                <MaterialCommunityIcons
                  name="arrow-left-circle"
                  size={25}
                  color="#4498D6"
                />
              </Pressable>
            ),
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
