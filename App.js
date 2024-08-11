import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import ChatsScreen from "./app/chats_screen";
export default function App() {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ChatR</Text>
      </SafeAreaView>

      <ChatsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03a5fc",
  },
  title: {
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "start",
    color: "#fff",
  },
});
