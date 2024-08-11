import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const DATA = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  // Add more items as needed
];

export default function ChatsScreen() {
  return <ListView />;
}

function ListView() {
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    backgroundColor: "darkblue",
    padding: 20,
    alignItems: "center",
  },
  topBarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
