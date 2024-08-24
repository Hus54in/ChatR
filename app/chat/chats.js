class Message {
    constructor(payload) {
      this.messageID = payload.$id || ''; // Unique ID for the message
      this.collectionID = payload.$collectionId || '';
      this.senderID = payload.senderid || '';
      this.content = payload.content || '';
      this.read = payload.read || false;
      this.readAt = payload.readAt || null; // Timestamp for when the message was read
      this.replyingTo = payload.replyingTo || null; // ID of the message being replied to
      this.createdAt = payload.$createdAt || '';
      this.updatedAt = payload.$updatedAt || '';
      this.permissions = payload.$permissions || [];
    }
  
    // Update the message properties
    updateMessage(newData) {
      this.read = newData.read !== undefined ? newData.read : this.read;
      this.readAt = newData.readAt || this.readAt;
      this.updatedAt = newData.updatedAt || this.updatedAt;
      this.content = newData.content || this.content;
    }
  }
  


  import AsyncStorage from '@react-native-async-storage/async-storage';

  class MessageManager {
    constructor(chatID) {
      this.chatID = chatID; // Unique identifier for the chat
      this.messages = new Map(); // Store messages with document ID as the key
      this.loadMessages(); // Load messages from local storage on initialization
    }
  
    async loadMessages() {
      try {
        const savedMessages = await AsyncStorage.getItem(this.chatID);
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          this.messages = new Map(parsedMessages.map(message => [message.messageID, message]));
        }
      } catch (error) {
        console.error(`Failed to load messages for chat ${this.chatID}:`, error);
      }
    }
  
    async saveMessages() {
      try {
        const messagesArray = Array.from(this.messages.values());
        await AsyncStorage.setItem(this.chatID, JSON.stringify(messagesArray));
      } catch (error) {
        console.error(`Failed to save messages for chat ${this.chatID}:`, error);
      }
    }
  
    async addMessage(message) {
      this.messages.set(message.messageID, message);
      await this.saveMessages(); // Save to local storage
    }
  
    async updateMessage(messageID, newData) {
      if (this.messages.has(messageID)) {
        const message = this.messages.get(messageID);
        Object.assign(message, newData); // Update message with new data
        this.messages.set(messageID, message);
        await this.saveMessages(); // Save to local storage
      } else {
        console.error(`Message with ID ${messageID} not found.`);
      }
    }
  
    async deleteMessage(messageID) {
      if (this.messages.has(messageID)) {
        this.messages.delete(messageID);
        await this.saveMessages(); // Save to local storage
      } else {
        console.error(`Message with ID ${messageID} not found.`);
      }
    }
  
    getMessage(messageID) {
      return this.messages.get(messageID);
    }
  
    getAllMessages() {
      return Array.from(this.messages.values());
    }
  
    async clearChat() {
      this.messages.clear();
      await AsyncStorage.removeItem(this.chatID); // Clear local storage
    }
  
  }
    
    export default MessageManager;
    export { Message };