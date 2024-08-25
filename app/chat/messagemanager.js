import Message from './message'; // Adjust the path as needed

class MessageManager {
  constructor(chatID) {
    this.chatID = chatID; // Unique identifier for the chat
    this.messages = new Map(); // Store messages with document ID as the key
  }

  async addMessage(messagePayload) {
    try {
      const message = new Message(messagePayload);
      if (!this.messages.has(message.messageID)) {
     
        this.messages.set(message.messageID, message);

      } else {
        console.warn(`Message with ID ${message.messageID} already exists. Skipping.`);
      }
    } catch (error) {
      console.error('Error adding message:', error);
    }
  }

  async updateMessage(messageID, newData) {
    try {
      if (this.messages.has(messageID)) {
        const message = this.messages.get(messageID);
        message.updateMessage(newData); // Update message with new data
        this.messages.set(messageID, message);
        console.log(`Updated message: ${messageID}`);
      } else {
        console.error(`MessageManager: update Message with ID ${messageID} not found.`);
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  }

  async deleteMessage(messageID) {
    try {
      if (this.messages.has(messageID)) {
        this.messages.delete(messageID);
        console.log(`Deleted message: ${messageID}`);
      } else {
        console.error(`MessageManager: delete Message with ID ${messageID} not found.`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
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
    console.log('Cleared all messages.');
  }
}

export default MessageManager;
