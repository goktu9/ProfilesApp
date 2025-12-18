import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// +++ Import the screens.
import ProfilesListScreen from './screens/ProfilesListScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';

// +++ Create the Stack Navigator object.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // +++ Wrap the app in NavigationContainer to manage navigation tree.
    <NavigationContainer>
      {/* +++ Define the Stack Navigator. */}
      <Stack.Navigator>
        {/* +++ Define the Profiles List screen as the initial route. */}
        <Stack.Screen name="Profiles" component={ProfilesListScreen} />
        
        {/* +++ Define the Profile Detail screen. */}
        <Stack.Screen 
          name="ProfileDetail" 
          component={ProfileDetailScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}