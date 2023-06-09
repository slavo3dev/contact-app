// Sort contacts alphabetically by first name
export const sortedContacts = contacts =>  contacts.sort((a, b) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
);


export const onPress = (screen, objData) => {
        navigation.navigate(screen, objData)
    } 