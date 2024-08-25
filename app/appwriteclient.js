import { Client, Account, Databases, Users } from "react-native-appwrite";

class AppwriteClient {
  static client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66c27c9900115c049a13")
    .setPlatform("com.endem.ChatR");
  static databaseid = '66c302157b5e7708824c';
  static collection_user = '66c306b2000e1ccc322c';
  static account = new Account(AppwriteClient.client);
  static userid = AppwriteClient.account.get().$id;

  static database = new Databases(AppwriteClient.client);
}

export default AppwriteClient;
