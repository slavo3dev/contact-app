import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import {CONTACTS} from "../../../dummy-data";
import * as Contacts from 'expo-contacts';

export const ContactList = ({navigation}) => {
    

    const onPress = (contactData) => {
        navigation.navigate("ContactDetails", contactData)
    }

    const favoriteContact = CONTACTS.find((contact) => contact.favorite);
    const [contactsData,setContactsData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    

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
    
    
     useEffect(() => {
        const fetchFavorites = async () => {
        const { data } = await Contacts.getFavoritesAsync();
            setFavorites(data);
            console.log(data)
        };
        fetchFavorites();
     },[]);
    
    
    console.log("Favorites: ", favorites)
    console.log("Contact Data: ", contactsData)
  return (
    <ScrollView>
      {favoriteContact && (
        <ListItem
          key={favoriteContact.id}
          bottomDivider
          onPress={() => onPress(favoriteContact)}
          containerStyle={styles.favorite}
        >
          <Avatar
            rounded
            title={favoriteContact.name[0]}
            backgroundColor="#bcbec1"
          />
          <ListItem.Content>
            <ListItem.Title>{favoriteContact.name}</ListItem.Title>
            <ListItem.Subtitle>{favoriteContact.phone}</ListItem.Subtitle>
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
