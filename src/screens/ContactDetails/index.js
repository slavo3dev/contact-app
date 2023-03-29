import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Contacts from 'expo-contacts';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ContactDetails = ({route,navigation}) => {

  const { phoneNumbers, emails, company, name } = route.params
  const [isFavorite, setIsFavorite] = useState(false);

    
    const handleFavorite = async () => {
        const updatedContact = { ...route.params, isFavorite: true };
        await Contacts.updateContactAsync(updatedContact);
        setIsFavorite(true);
    };


     const onPress = (contactData) => {
        navigation.navigate("ContactList", contactData)
    }


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="person" size={60} color="#333" />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
               {name}
          </Text>
          <Text>{company}</Text>
        </View>
        {isFavorite ? (
          <Icon name="favorite" size={30} color="red" />
        ) : (
          <TouchableOpacity onPress={handleFavorite}>
            <Icon name="favorite-border" size={30} color="#333" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        {emails?.length > 0 && emails.map((email) => (
          <Text key={email.id}>{email.email}</Text>
        ))}
        {phoneNumbers.map((phone) => (
          <Text key={phone.id}>{phone.number}</Text>
        ))}
      </View>
      <Button
        title="Back to contacts"
              onPress={() => onPress(isFavorite && {
                  name,
                  company,
                  phoneNumbers,
                  emails,
                  isFavorite
              })}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};