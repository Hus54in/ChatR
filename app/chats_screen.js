import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function ChatsScreen(data, styles) {
  return (
    <FlatList
      styles={styles}
      data={data.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.text}>{item.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  text: {
    color: "white",
  },
});
