// const { Chat } = require("../modals/chatModel"); // Assuming you have the Chat model as created earlier
// const axios = require("axios"); // For interacting with the chatbot API
// const  {ApiError}  = require('../utils/ApiError');
// const  { ApiResponse}  = require('../utils/ApiResponse');
// //const ApiResponse = require("../utils/ApiResponse"); // Custom response wrapper
// const FormData = require('form-data');
// // Base URL of the chatbot API
// const CHATBOT_API_URL = "https://a815-154-192-137-16.ngrok-free.app/chat";

// // Create a new chat session or add messages to an existing one
// // const createOrUpdateChat = async (req, res) => {
// //     console.log("req.user",req.user);

// //     const userId = req.user._id;
// //     const {  sessionID, message } = req.body;
// //     console.log("value",sessionID, message, userId)
   
// //     if (!userId || !sessionID || !message) {
       
// //         // throw new ApiError(400, "userId, sessionId, and message are required");
// //         throw new ApiError(400, "Something went wrong ")
// //     }

// //     // Create form data
// // const formData = new FormData();
// // formData.append('userID', userId);
// // formData.append('sessionID', req.body.sessionID);
// // formData.append('message', req.body.message);
// //     try {
       
// //         // Send the user's message to the chatbot API
// //         const chatbotResponse = await axios.post(CHATBOT_API_URL, formData, {
// //             headers: {
// //                 ...formData.getHeaders(), // Include form data headers
// //             },
// //         });
// // console.log("chatbotResponse",chatbotResponse);

// //         // Extract chatbot's response and sessionID
// //         const { response, sessionID } = chatbotResponse.data;

// //         // Find or create the chat session in the database
// //         let chat = await Chat.findOne({ sessionId });

// //         if (!chat) {
// //             // If no session exists, create a new one
// //             chat = await Chat.create({
// //                 userId,
// //                 sessionId: sessionID,
// //                 messages: []
// //             });
// //         }

// //         // Add the new message from the user and bot to the conversation
// //         chat.messages.push(
// //             { sender: "user", message, timestamp: new Date() },
// //             { sender: "bot", message: response, timestamp: new Date() }
// //         );

// //         // Save the updated chat session
// //         await chat.save();

// //         return res.status(200).json(new ApiResponse(200, chat, "Message processed successfully"));
// //     } catch (error) {
// //         console.error("Error processing chat message:", error);
// //         throw new ApiError(500, "Failed to process chat message");
// //     }
// // };
// function getSessionNameFromMessage(message) {
//     // Split the message into words
//     const words = message.split(' ');
//     // Take the first one or two words for session name
//     const sessionName = words.slice(0, 2).join(' ');
//     return sessionName;
// }
// // const createOrUpdateChat = async (req, res) => {
// //     console.log("req.user", req.user);
// //     const userId = req.user._id;
    
// //     const { sessionID, message } = req.body;
// //     console.log("value", sessionID, message, userId);
    
// //     // Validation check for missing required fields
// //     if (!userId || !sessionID || !message) {
// //         throw new ApiError(400, "Something went wrong ");
// //     }
// //     // Extract session name from the first one or two words of the message
// //     const sessionName = getSessionNameFromMessage(message);
// //     console.log("Extracted sessionName:", sessionName);
// //     // Create form data for chatbot request
// //     const formData = new FormData();
// //     formData.append('userID', String(userId));
// //     formData.append('sessionID', String(req.body.sessionID));
// //     formData.append('message', String(req.body.message));
// //     try {
// //         // Send the user's message to the chatbot API
// //         const chatbotResponse = await axios.post(CHATBOT_API_URL, formData, {
// //             headers: {
// //                 ...formData.getHeaders(), // Include form data headers
// //             },
// //         });
// //         // Extract chatbot's response and sessionID
// //         const { response, sessionID: newSessionID } = chatbotResponse.data;
// //         // Find or create the chat session in the database
// //         let chat = await Chat.findOne({ sessionID: newSessionID, userID: userId });
// //         if (!chat) {
// //             // If no session exists, create a new one
// //             chat = await Chat.create({
// //                 userID: userId,
// //                 sessionID: newSessionID,
// //                 sessionName: sessionName, // Save the extracted session name
// //                 messages: []
// //             });
// //         }
// //         // Add the new message from the user and bot to the conversation
// //         chat.messages.push(
// //             { sender: "user", message, timestamp: new Date() },
// //             { sender: "bot", message: response, timestamp: new Date() }
// //         );
// //         // Save the updated chat session
// //         await chat.save();

// //         return res.status(200).json(new ApiResponse(200, chat, "Message processed successfully"));
// //     } catch (error) {
// //         console.error("Error processing chat message:", error);
// //         throw new ApiError(500, "Failed to process chat message");
// //     }
// // };

// // Function to extract the session name from the first one or two words of the message



// // Retrieve a chat session by sessionId

// const createOrUpdateChat = async (req, res) => {
//     console.log("req.user", req.user);
//     const userId = req.user._id;

//     const { message } = req.body;

//     console.log("value", userId, message);

//     // Validation check for missing required fields
//     if (!userId || !message) {
//         throw new ApiError(400, "Something went wrong");
//     }

//     // Extract session name from the first one or two words of the message
//     const sessionName = getSessionNameFromMessage(message);
//     console.log("Extracted sessionName:", sessionName);

//     try {
//         // Find an existing chat session for the user
//         let chat = await Chat.findOne({ userID: userId });

//         if (!chat) {
//             // If no session exists, create a new session
//             const uniqueSessionID = `${userId}_${Math.floor(1000 + Math.random() * 9000)}`;
//             chat = await Chat.create({
//                 userID: userId,
//                 sessionID: uniqueSessionID,
//                 sessionName: sessionName, // Save the extracted session name
//                 messages: []
//             });
//         }

//         // Create form data for the chatbot API request
//         const formData = new FormData();
//         formData.append('userID', String(userId));
//         formData.append('sessionID', chat.sessionID);
//         formData.append('message', String(message));

//         // Send the user's message to the chatbot API
//         const chatbotResponse = await axios.post(CHATBOT_API_URL, formData, {
//             headers: {
//                 ...formData.getHeaders(), // Include form data headers
//             },
//         });

//         // Extract chatbot's response
//         const { response } = chatbotResponse.data;

//         // Add the user's message and bot's response to the chat session
//         chat.messages.push(
//             { sender: "user", message, timestamp: new Date() },
//             { sender: "bot", message: response, timestamp: new Date() }
//         );

//         // Save the updated chat session
//         await chat.save();

//         return res.status(200).json(new ApiResponse(200, chat, "Message processed successfully"));
//     } catch (error) {
//         console.error("Error processing chat message:", error);
//         throw new ApiError(500, "Failed to process chat message");
//     }
// };



// const getChatBySessionId = async (req, res, next) => {
//     try {
//         const { sessionID } = req.query;

//         if (!sessionID) {
//             throw new ApiError(400, "sessionId is required");
//         }

//         console.log("Searching for chat session with ID:", sessionID);

//         const chat = await Chat.findOne({ sessionID });

//         if (!chat) {
//             throw new ApiError(404, `Chat session with ID "${sessionID}" not found`);
//         }

//         return res.status(200).json(
//             new ApiResponse(200, chat, "Chat session retrieved successfully")
//         );
//     } catch (error) {
//         console.error("Error retrieving chat session:", error.message || error);
//         next(error);
//     }
// };
// const getChatsByUserId = async (req, res, next) => {
//     try {
//         const userID = req.user._id;
//         console.log(`getChatsByUser`, userID);

//         // Validate input
//         if (!userID) {
//             throw new ApiError(400, "userID is required");
//         }

//         console.log("Retrieving chat sessions for userID:", userID);

//         // Query chats for the given userID
//         const chats = await Chat.find({ userID });

//         // Check if chats exist
//         if (!chats || chats.length === 0) {
//             // Return a static chat session when no chats exist for the user
//             const defaultChat = {
//                 _id: "1",
//                 userID,
//                 messages: [
//                     {
//                         sender: "bot",
//                         message: "How can I assist you today?",
//                         timestamp: new Date(),
//                         _id: "1",
//                     },
//                 ],
//                 sessionID: "1", // Static session ID for the default message
//                 sessionName: "How can",
//                 status: "active",
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//                 __v: 0,
//             };

//             return res.status(200).json(
//                 new ApiResponse(200, [defaultChat], "Chat sessions retrieved successfully")
//             );
//         }

//         // Respond with the retrieved chats
//         return res.status(200).json(
//             new ApiResponse(200, chats, "Chat sessions retrieved successfully")
//         );
//     } catch (error) {
//         console.error("Error retrieving user chats:", error.message || error);

//         // Pass the error to the middleware
//         next(error);
//     }
// };


// // Delete a chat session by sessionId
// const deleteChatBySessionId = async (req, res) => {
//     const { sessionId } = req.params;
//     if (!sessionId) {
//         throw new ApiError(400, "sessionId is required");
//     }
//     try {
//         const chat = await Chat.findOneAndDelete({ sessionId });
//         if (!chat) {
//             throw new ApiError(404, "Chat session not found");
//         }
//         return res.status(200).json(new ApiResponse(200, null, "Chat session deleted successfully"));
//     } catch (error) {
//         console.error("Error deleting chat session:", error);
//         throw new ApiError(500, "Failed to delete chat session");
//     }
// };

// // Delete all chat sessions for a specific user
// const deleteChatsByUserId = async (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//         throw new ApiError(400, "userId is required");
//     }

//     try {
//         await Chat.deleteMany({ userId });
//         return res.status(200).json(new ApiResponse(200, null, "All chat sessions for user deleted successfully"));
//     } catch (error) {
//         console.error("Error deleting user chats:", error);
//         throw new ApiError(500, "Failed to delete user chats");
//     }
// };
// module.exports = {
//     createOrUpdateChat,
//     getChatBySessionId,
//     getChatsByUserId,
//     deleteChatBySessionId,
//     deleteChatsByUserId
// };
const User = require('../modals/index.js').userModel;
const { Chat, Message } = require('../modals/index.js').chatModel;
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const axios = require('axios');
const FormData = require('form-data');

//const CHATBOT_API_URL = "https://a815-154-192-137-16.ngrok-free.app/chat";
const CHATBOT_API_URL = "https://chatbot.ranaafaqali.com/chat";
function getSessionNameFromMessage(message) {
    const words = message.split(' ');
    return words.slice(0, 2).join(' ');
}

// const createOrUpdateChat = async (req, res) => {
//     const userId = req.user.id;
//     const { message } = req.body;

//     if (!userId || !message) {
//         throw new ApiError(400, "Something went wrong");
//     }

//     const sessionName = getSessionNameFromMessage(message);

//     try {
//         let chat = await Chat.findOne({ where: { userID: userId } });
//         if (!chat) {
//             const uniqueSessionID = `${userId}_${Math.floor(1000 + Math.random() * 9000)}`;
//             chat = await Chat.create({
//                 userID: userId,
//                 sessionID: uniqueSessionID,
//                 sessionName: sessionName,
//             });
//         }
//         const formData = new FormData();
//         formData.append('userID', userId);
//         formData.append('sessionID', chat.sessionID);
//         formData.append('message', message);

//         const chatbotResponse = await axios.post(CHATBOT_API_URL, formData, {
//             headers: formData.getHeaders(),
//         });

//         const { response } = chatbotResponse.data;
// console.log("response",response);

//      const messages =   await Message.bulkCreate([
//             { sender: 'user', message, timestamp: new Date(), chatId: chat.id },
//             { sender: 'bot', message: response, timestamp: new Date(), chatId: chat.id },
//         ]);
// console.log(messages);

// const updatedChat = await Chat.findByPk(chat.id, { 
//     include: [{ model: Message, as: 'messages' }], 
//     raw: true 
// });
// console.log(updatedChat)
//         return res.status(200).json(new ApiResponse(200, updatedChat, "Message processed successfully"));
//     } catch (error) {
//         console.error("Error processing chat message:", error);
//         throw new ApiError(500, "Failed to process chat message");
//     }
// };
//.....................doesnot work......................
// const createOrUpdateChat = async (req, res) => {
//     const userId = req.user.id;
//     const { message } = req.body;

//     console.log("User ID:", userId, "Message:", message);

//     // Validation check for missing required fields
//     if (!userId || !message) {
//         throw new ApiError(400, "Something went wrong");
//     }

//     // Extract session name from the first one or two words of the message
//     const sessionName = getSessionNameFromMessage(message);
//     console.log("Extracted sessionName:", sessionName);

//     try {
//         // Find an existing chat session for the user
//         let chat = await Chat.findOne({
//             where: { userID: userId },
//             include: [{ model: Message, as: 'messages' }],
//         });

//         if (!chat) {
//             // If no session exists, create a new session
//             const uniqueSessionID = `${userId}_${Math.floor(1000 + Math.random() * 9000)}`;
//             chat = await Chat.create(
//                 {
//                     userID: userId,
//                     sessionID: uniqueSessionID,
//                     sessionName: sessionName,
//                     messages: [], // Initialize with an empty message array
//                 },
//                 {
//                     include: [{ model: Message, as: 'messages' }], // Include messages during creation
//                 }
//             );
//         }

//         // Create form data for the chatbot API request
//         const formData = new FormData();
//         formData.append('userID', String(userId));
//         formData.append('sessionID', chat.sessionID);
//         formData.append('message', String(message));

//         // Send the user's message to the chatbot API
//         const chatbotResponse = await axios.post(CHATBOT_API_URL, formData, {
//             headers: {
//                 ...formData.getHeaders(), // Include form data headers
//             },
//         });

//         // Extract chatbot's response
//         const { response } = chatbotResponse.data;

//         // Add the user's message and bot's response to the chat session
//         const userMessage = await Message.create({
//             sender: "user",
//             message,
//             timestamp: new Date(),
//             chatId: chat.id,
//         });

//         const botMessage = await Message.create({
//             sender: "bot",
//             message: response,
//             timestamp: new Date(),
//             chatId: chat.id,
//         });

//         // Reload chat with the latest messages
//         const updatedChat = await Chat.findByPk(chat.id, { 
//             include: [{ model: Message, as: 'messages' }], 
//             raw: true 
//         });
        
// console.log(updatedChat,".................")
//         return res
//             .status(200)
//             .json(new ApiResponse(200, updatedChat, "Message processed successfully"));
//     } catch (error) {
//         console.error("Error processing chat message:", error);
//         throw new ApiError(500, "Failed to process chat message");
//     }
// };

const createOrUpdateChat = async (req, res) => {
    console.log("req.user", req.user);
    const userId = req.user.id;
    const { message } = req.body;

    console.log("value", userId, message);

    // Validation check for missing required fields
    if (!userId || !message) {
        throw new ApiError(400, "User ID and message are required");
    }

    // Extract session name from the first one or two words of the message
    const sessionName = getSessionNameFromMessage(message);
    console.log("Extracted sessionName:", sessionName);

    try {
        // Find or create a chat session for the user
        console.log("Creating chat session")
       
        let chat = await Chat.findOne({
            where: { userID: userId },
            include: [{ model: Message, as: 'messages' }] // Include existing messages
            ,raw:true
        });
       

        if (!chat) {
            // Create a new chat session
            const uniqueSessionID = `${userId}_${Math.floor(1000 + Math.random() * 9000)}`;
            chat = await Chat.create({
                userID: userId,
                sessionID: uniqueSessionID,
                sessionName: sessionName,
            });
            chat.messages = []; // Initialize messages as an empty array
        }

        // Prepare form data for chatbot API request
        const formData = new FormData();
        formData.append('userID', String(userId));
        formData.append('sessionID', chat.sessionID);
        formData.append('message', String(message));

        // Send the user's message to the chatbot API
        const chatbotResponse = await axios.post(CHATBOT_API_URL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
      
        // Extract chatbot's response
        const { response } = chatbotResponse.data;
        // Add the user's message and bot's response to the chat session
        const userMessage = await Message.create({
            sender: "user",
            message,
            timestamp: new Date(),
            chatId: chat.id,
        });

        const botMessage = await Message.create({
            sender: "bot",
            message: response,
            timestamp: new Date(),
            chatId: chat.id,
        });


        // Reload chat with the latest messages
        // chat = await Chat.findOne({id:chat.id}, {
        //     include: [{ model: Message, as: 'messages' }], 
            
        // });
        // chat = await Chat.findOne({
        //     where: { id: chat.id }, // Use "where" to filter by ID
        //     include: [{ model: Message, as: 'messages' }] // Ensure alias matches your association
        // });
        console.log(chat.id,"chat................id")
        chat = await Chat.findOne({
            where: { id: chat.id }, // Query by the correct ID
        });
        if (!chat) {
            throw new ApiError(404, "Chat not found");
        }
        
        const messages = await Message.findAll({
            where: { chatId: chat.id }, // Filter messages by `chatId`
            order: [['timestamp', 'ASC']], // Optional: order by timestamp
        });
        console.log(chat, messages, "both");
        
        // Reformat the response to include messages directly as part of the `chat` object
        const chatResponse = {
            userID: chat.userID,
            sessionID: chat.sessionID,
            sessionName: chat.sessionName,
            messages: messages.map((msg) => ({
                sender: msg.sender,
                message: msg.message,
                timestamp: msg.timestamp,
            })),
        };
        
        console.log("Final Chat Response:", chatResponse);

        return res.status(200).json(new ApiResponse(200, chatResponse, "Message processed successfully"));
    } catch (error) {
        console.error("Error processing chat message:", error);
        throw new ApiError(500, "Failed to process chat message");
    }
};





const getChatBySessionId = async (req, res) => {
    const { sessionID } = req.query;

    if (!sessionID) {
        throw new ApiError(400, "sessionId is required");
    }

    try {
        const chat = await Chat.findOne({
            where: { sessionID },
            include: [{ model: Message, as: 'messages' }],
        });

        if (!chat) {
            throw new ApiError(404, `Chat session with ID "${sessionID}" not found`);
        }

        return res.status(200).json(new ApiResponse(200, chat, "Chat session retrieved successfully"));
    } catch (error) {
        console.error("Error retrieving chat session:", error);
        throw new ApiError(500, "Failed to retrieve chat session");
    }
};

const getChatsByUserId = async (req, res, next) => {
    try {
        const userID = req.user.id; // Ensure you fetch `id` for Sequelize
        console.log(`getChatsByUser`, userID);

        // Validate input
        if (!userID) {
            throw new ApiError(400, "userID is required");
        }

        console.log("Retrieving chat sessions for userID:", userID);

        // Query chats for the given userID
        const chats = await Chat.findAll({
            where: { userID },
            include: [
                {
                    model: Message, // Include related messages
                    as: 'messages',
                    attributes: ['id', 'sender', 'message', 'timestamp'], // Ensure the correct attributes are fetched
                },
            ],
            raw:true
        });

        // Check if chats exist
        if (!chats || chats.length === 0) {
            // Return a static chat session when no chats exist for the user
            const defaultChat = {
                id: "1",
                userID,
                messages: [
                    {
                        sender: "bot",
                        message: "How can I assist you today?",
                        timestamp: new Date(),
                        id: "1", // Static ID for default message
                    },
                ],
                sessionID: "1", // Static session ID for the default message
                sessionName: "How can",
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            return res.status(200).json(
                new ApiResponse(200, [defaultChat], "Chat sessions retrieved successfully")
            );
        }
console.log(chats,"......................")
        // Reformat the response to match the desired structure
        // const formattedChats = chats.map((chat) => ({
        //     id: chat.id,
        //     userID: chat.userID,
        //     sessionID: chat.sessionID,
        //     sessionName: chat.sessionName,
        //     status: "active", // Add a static "status" if needed
        //     createdAt: chat.createdAt,
        //     updatedAt: chat.updatedAt,
        //     messages: chat.messages.map((msg) => ({
        //         id: msg.id,
        //         sender: msg.sender,
        //         message: msg.message,
        //         timestamp: msg.timestamp,
        //     })),
        // }));
        const formattedChats = Object.values(
            chats.reduce((acc, chat) => {
                if (!acc[chat.id]) {
                    // Initialize the chat object
                    acc[chat.id] = {
                        id: chat.id,
                        sessionID: chat.sessionID,
                        sessionName: chat.sessionName,
                        userID: chat.userID,
                        createdAt: chat.createdAt,
                        updatedAt: chat.updatedAt,
                        messages: [],
                    };
                }
        
                // Add message only if it exists (to avoid null entries)
                if (chat['messages.id']) {
                    acc[chat.id].messages.push({
                        id: chat['messages.id'],
                        sender: chat['messages.sender'],
                        message: chat['messages.message'],
                        timestamp: chat['messages.timestamp'],
                    });
                }

        return acc;
    }, {})
);
        // Respond with the retrieved chats
        return res.status(200).json(
            new ApiResponse(200, formattedChats, "Chat sessions retrieved successfully")
        );
    } catch (error) {
        console.error("Error retrieving user chats:", error.message || error);

        // Pass the error to the middleware
        next(error);
    }
};


const deleteChatBySessionId = async (req, res) => {
    const { sessionId } = req.params;

    if (!sessionId) {
        throw new ApiError(400, "sessionId is required");
    }

    try {
        const chat = await Chat.findOne({ where: { sessionID: sessionId } });

        if (!chat) {
            throw new ApiError(404, "Chat session not found");
        }

        await Message.destroy({ where: { chatId: chat.id } });
        await chat.destroy();

        return res.status(200).json(new ApiResponse(200, null, "Chat session deleted successfully"));
    } catch (error) {
        console.error("Error deleting chat session:", error);
        throw new ApiError(500, "Failed to delete chat session");
    }
};

const deleteChatsByUserId = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, "userId is required");
    }

    try {
        const chats = await Chat.findAll({ where: { userID: userId } });

        if (chats.length > 0) {
            for (const chat of chats) {
                await Message.destroy({ where: { chatId: chat.id } });
            }
            await Chat.destroy({ where: { userID: userId } });
        }

        return res.status(200).json(new ApiResponse(200, null, "All chat sessions for user deleted successfully"));
    } catch (error) {
        console.error("Error deleting user chats:", error);
        throw new ApiError(500, "Failed to delete user chats");
    }
};

module.exports = {
    createOrUpdateChat,
    getChatBySessionId,
    getChatsByUserId,
    deleteChatBySessionId,
    deleteChatsByUserId,
};
