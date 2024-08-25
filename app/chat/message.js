// Message.js
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

export default Message ;