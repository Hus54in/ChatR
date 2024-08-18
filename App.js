import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import ChatsScreen from "./app/chats_screen";

const DATA = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  // Add more items as needed
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <ChatsScreen style={styles.item_view} data={DATA} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "black",
  },
  title: {
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "start",
    color: "white",
  }, 
  item_view: {
    padding: 10
  }
});