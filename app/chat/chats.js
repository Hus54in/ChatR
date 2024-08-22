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
  


  class MessageManager {
    constructor() {
      this.messages = new Map(); // Store messages with document ID as the key
    }
  
    addMessage(message) {
      this.messages.set(message.messageID, message);
    }
  
    updateMessage(messageID, newData) {
      if (this.messages.has(messageID)) {
        const message = this.messages.get(messageID);
        message.updateMessage(newData);
        this.messages.set(messageID, message);
      } else {
        console.error(`Message with ID ${messageID} not found.`);
      }
    }
  
    deleteMessage(messageID) {
      if (this.messages.has(messageID)) {
        this.messages.delete(messageID);
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
  }
  
    
    export default MessageManager;
    export { Message };