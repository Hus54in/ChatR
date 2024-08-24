import AppwriteClient from '../appwriteclient.js';
class ChatManager {
  constructor(collectionID) {
    this.collectionID = collectionID;
    this.messages = [];
    this.subscribeToChat();
  }

  subscribeToChat() {
    try {
      AppwriteClient.client.subscribe(`databases.${AppwriteClient.databaseid}.collections.${this.collectionID}.documents`, response => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          this.addMessage(response.payload);
          // Trigger a notification here if needed
        }
      });
    } catch (error) {
      console.error('Error subscribing to real-time updates:', error);
    }
  }

  addMessage(message) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }
}

class ChatManagerPool {
  constructor() {
    this.chatManagers = new Map(); // Store ChatManagers with collection ID as the key
  }

  // Add a new ChatManager for a given collection ID
  static addChatManager(collectionID) {
    if (!ChatManagerPool.chatManagers.has(collectionID)) {
      const chatManager = new ChatManager(collectionID);
      ChatManagerPool.chatManagers.set(collectionID, chatManager);
      console.log(`ChatManager created for collection: ${collectionID}`);
    } else {
      console.log(`ChatManager for collection: ${collectionID} already exists.`);
    }
  }

  // Remove a ChatManager for a given collection ID
  static removeChatManager(collectionID) {
    if (ChatManagerPool.chatManagers.has(collectionID)) {
      ChatManagerPool.chatManagers.delete(collectionID);
      console.log(`ChatManager removed for collection: ${collectionID}`);
    } else {
      console.error(`ChatManager for collection: ${collectionID} not found.`);
    }
  }

  // Get a ChatManager for a given collection ID
  static getChatManager(collectionID) {
    return ChatManagerPool.chatManagers.get(collectionID);
  }

  // Get all ChatManagers
  static getAllChatManagers() {
    return Array.from(ChatManagerPool.chatManagers.values());
  }

  // Method to start the ChatManagerPool in the background
  static startPool() {
    // Initialize all required ChatManagers
    // This could be triggered at app start or when a user logs in
    const chatCollections = ["u2u"]; // Replace with actual collection IDs

    chatCollections.forEach(collectionID => {
      ChatManagerPool.addChatManager(collectionID);
    });

    console.log('ChatManagerPool started');
  }
}



export default ChatManagerPool;
