import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export const ContactList = ({ contacts, onPress }) => {
  const favoriteContact = contacts.find((contact) => contact.favorite);

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
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          bottomDivider
              onPress={() => onPress(contact)}
              containerStyle={styles.container}
        >
          <Avatar
            rounded
            title={contact.name[0]}
            backgroundColor="#bcbec1"
          />
          <ListItem.Content>
            <ListItem.Title>{contact.name}</ListItem.Title>
            <ListItem.Subtitle>{contact.phone}</ListItem.Subtitle>
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
