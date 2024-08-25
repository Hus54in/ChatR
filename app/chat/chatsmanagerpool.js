import ChatManager from './chatmanager'; // Adjust the path as needed

class ChatManagerPool {
  constructor() {
    this.chatManagers = new Map(); // Store ChatManagers with collection ID as the key
  }

  addChatManager(collectionID) {
    if (!this.chatManagers.has(collectionID)) {
      const chatManager = new ChatManager(collectionID);
      this.chatManagers.set(collectionID, chatManager);
      console.log(`ChatManager created for collection: ${collectionID}`);
    } else {
      console.log(`ChatManager for collection: ${collectionID} already exists.`);
    }
  }

  removeChatManager(collectionID) {
    if (this.chatManagers.has(collectionID)) {
      this.chatManagers.delete(collectionID);
      console.log(`ChatManager removed for collection: ${collectionID}`);
    } else {
      console.error(`ChatManager for collection: ${collectionID} not found.`);
    }
  }

  getChatManager(collectionID) {
    return this.chatManagers.get(collectionID);
  }

  getAllChatManagers() {
    return Array.from(this.chatManagers.values());
  }

  startPool() {
    // Initialize or start any necessary background tasks here
    console.log('ChatManagerPool started');

    chats = ["u2u"];
    chats.forEach(chat => {
      this.addChatManager(chat);
    });
  }
}

const ChatManagerPoolInstance = new ChatManagerPool();
export default ChatManagerPoolInstance;
