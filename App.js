
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
        console.log(data[1]);
      }
    }
  };
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%",
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          marginTop: 50,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Contacts
      </Text>
      <FlatList
        ItemSeparatorComponent={listSeparator}
        data={contacts}
        renderItem={({ item }) => {
          return (
            <Text>
              {item.name}, {item.phoneNumbers[0].number}
            </Text>
          );
        }}
      />
      <Button onPress={getContacts} title="Get contacts" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  
});

