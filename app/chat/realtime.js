class ChatManager {
    constructor(collectionID, messageManager) {
      this.collectionID = collectionID;
      this.messageManager = messageManager;
    }
  
    // Subscribe to updates and trigger the event callback
    subscribeToUpdates(onNewMessage) {
      try {
        AppwriteClient.client.subscribe(
          `databases.${AppwriteClient.databaseid}.collections.${this.collectionID}.documents`,
          (response) => {
            console.log('Real-time update:', response);
            
            // Check if it's a create event
            if (response.events.includes(`databases.*.collections.*.documents.*.create`)) {
              const newMessage = new Message(response.payload);
              
              // Trigger the callback routine with the new message
              onNewMessage(newMessage);
              
              console.log('New message:', newMessage);
            }
          }
        );
      } catch (error) {
        console.error('Error subscribing to real-time updates:', error);
      }
    }
  }
  
  
  class ChatManagerPool {
    constructor() {
      this.chatManagers = new Map(); // Store ChatManagers with collection ID as the key
    }
  
    // Add a new ChatManager for a given collection ID
    addChatManager(collectionID) {
      if (!this.chatManagers.has(collectionID)) {
        const chatManager = new ChatManager(collectionID);
        chatManager.subscribeToUpdates();
        this.chatManagers.set(collectionID, chatManager);
        console.log(`ChatManager created for collection: ${collectionID}`);
      } else {
        console.log(`ChatManager for collection: ${collectionID} already exists.`);
      }
    }
  
    // Remove a ChatManager for a given collection ID
    removeChatManager(collectionID) {
      if (this.chatManagers.has(collectionID)) {
        this.chatManagers.delete(collectionID);
        console.log(`ChatManager removed for collection: ${collectionID}`);
      } else {
        console.error(`ChatManager for collection: ${collectionID} not found.`);
      }
    }
  
    // Get a ChatManager for a given collection ID
    getChatManager(collectionID) {
      return this.chatManagers.get(collectionID);
    }
  
    // Get all ChatManagers
    getAllChatManagers() {
      return Array.from(this.chatManagers.values());
    }
  }
  