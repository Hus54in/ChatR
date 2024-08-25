import AppwriteClient from '../appwriteclient'; // Adjust the path as needed
import Message from './message'; // Adjust the path as needed
import MessageManager from './messagemanager'; // Adjust the path as needed
import * as Notifications from 'expo-notifications'; // Import everything from expo-notifications

async function schedulePushNotification(content) {
  await Notifications.scheduleNotificationAsync({
    content: content,
    trigger: { seconds: 1 }, // Trigger notification after 1 second
  });
}

class ChatManager {
  constructor(collectionID) {
    this.collectionID = collectionID;
    this.messageManager = new MessageManager(collectionID);
    this.subscribers = [];
    this.username = '';

  
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  async subscribeToChat() {
    try {
      AppwriteClient.client.subscribe(`databases.${AppwriteClient.databaseid}.collections.${this.collectionID}.documents`, async response => {
        console.log('Subscribed to collection:', this.collectionID);
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          this.messageManager.addMessage(response.payload);
         
          await schedulePushNotification({
            title: this.username,
            body: response.payload.content, 
          });

          this.notifySubscribers();
          
          console.log('New message:', response.payload);
        } else if (response.events.includes("databases.*.collections.*.documents.*.update")) {
          const messageID = response.payload.$id;
          this.messageManager.updateMessage(messageID, response.payload);
          this.notifySubscribers();
          console.log('Message updated:', response.payload);
        }
      });
    } catch (error) {
      console.error('Error subscribing to real-time updates:', error);
    }
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  notifySubscribers() {
    const messages = this.messageManager.getAllMessages();
    this.subscribers.forEach(callback => callback(messages));
  }

  async getAllChats() {
    try {
      const response = await AppwriteClient.database.listDocuments(AppwriteClient.databaseid, this.collectionID);
      for (let message of response.documents) {
        this.messageManager.addMessage(message);
      }
      return this.getMessages();
    } catch (error) {
      console.error('Error fetching all chats:', error);
      return [];
    }
  }

  async addMessage(messagePayload) {
    await this.messageManager.addMessage(messagePayload);
  }

  async updateMessage(messageID, newData) {
    await this.messageManager.updateMessage(messageID, newData);
  }

  getMessages() {
    return this.messageManager.getAllMessages();
  }
}

export default ChatManager;
