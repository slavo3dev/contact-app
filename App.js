import {StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ContactList, ContactDetails} from "./src/screens";
import {CONTACTS} from "./dummy-data";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen
          name="ContactList"
          options={{ title: 'Contacts' }}
          component={(props) => (
            <ContactList {...props} contacts={CONTACTS} />
          )}
        />
        <Stack.Screen
          name="ContactDetails"
          options={({ route }) => ({ title: route.params.contact.name })}
          component={(props) => (
            <ContactDetails {...props} contact={props.route.params.contact} />
          )}
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
