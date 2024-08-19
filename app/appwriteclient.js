import { Client, Account } from "react-native-appwrite";

class AppwriteClient {
  static client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66c27c9900115c049a13")
    .setPlatform("com.endem.ChatR");

  static account = new Account(AppwriteClient.client);
}

export default AppwriteClient;
