import {StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ContactList, ContactDetails} from "./src/screens";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen
          name="ContactList"
          options={{ title: 'Contacts' }}
          component={ContactList}
        />
        <Stack.Screen
           name="ContactDetails"
           options={{ title: 'Contacts Details' }}
        //   options={({ route }) => ({ title: route.params.contact.name })}
          component={ContactDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
