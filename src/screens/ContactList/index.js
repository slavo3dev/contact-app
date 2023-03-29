import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import {CONTACTS} from "../../../dummy-data";
import * as Contacts from 'expo-contacts';

export const ContactList = ({route, navigation}) => {
    

    const onPress = (contactData) => {
        navigation.navigate("ContactDetails", contactData)
    }

    // TO DO if there is favorites in the list
    // const favoriteContact = CONTACTS.find((contact) => contact.favorite);
    const [contactsData,setContactsData] = useState([]);
    

     useEffect(() => {
        (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
            });

            if (data.length > 0) {
                setContactsData(data);
            }
        }
        })();
     },[]);
    
    
  return (
    <ScrollView>
      {route.params && (
        <ListItem
          key={route.params.name}
          bottomDivider
          onPress={() => onPress(route.params)}
          containerStyle={styles.favorite}
        >
          <Avatar
            rounded
            title={route.params.name[0]}
            backgroundColor="#bcbec1"
          />
          <ListItem.Content>
            <ListItem.Title>{route.params.name}</ListItem.Title>
            <ListItem.Subtitle>{route.params.phoneNumbers[0].digits}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )}
      {contactsData.map((contact) => (
        <ListItem
          key={contact.id}
          bottomDivider
              onPress={() => onPress(contact)}
              containerStyle={styles.container}
        >
          <Avatar
            rounded
            title={contact.firstName[0]}
            backgroundColor="#bcbec1"
          />
          <ListItem.Content>
            <ListItem.Title>{contact.name}</ListItem.Title>
            <ListItem.Subtitle>{contact.phoneNumbers[0].digits}</ListItem.Subtitle>
            <ListItem.Subtitle>{contact.company}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  favorite: {
    backgroundColor: '#fce4ec',
    },
    container: {
        backgroundColor: '#ADD8E6',
    }
});
