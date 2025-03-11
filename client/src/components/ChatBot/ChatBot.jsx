

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   IconButton,
//   TextField,
//   Typography,
//   Paper,
//   Divider,
// } from "@mui/material";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import CloseIcon from "@mui/icons-material/Close";
// import { Send, ShowChart } from "@mui/icons-material";
// import axios from "axios";
// import ChatLoader from "./ChatLoader/ChatLoader";

// const ChatBot = () => {
//   const [open, setOpen] = useState(false);
//   const [sessions, setSessions] = useState([
//     { id: 1, name: "Session 1", messages: [] },
//   ]);
//   const [activeSessionId, setActiveSessionId] = useState(null);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const toggleChat = () => setOpen(!open);
//   const API_BASE = "https://hoteldemo.ranaafaqali.com/api/chat";
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhmNzYyZDQzMTU4OTc0OGUwN2Q3ZTgiLCJlbWFpbCI6IndhaGFiMTFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ3YWhhYiIsImlhdCI6MTczNzQ1NTE2MywiZXhwIjoxNzM3NTQxNTYzfQ.7GrIXkD6sswJvPhb6dlG4tz48S2pxK6k0QeVWXKQncU";
//   const fetchSessions = async () => {
//     try {
//       const response = await axios.get(`${API_BASE}/chatbyuser`, {
//         headers: {
//           Authorization: `Bearer ${token}`,

//           "ngrok-skip-browser-warning": "69420",
//         },
//       });
//       setSessions(response.data.data);
//       setActiveSessionId(response.data.data[0]?.sessionID)
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//     }
//   };

//   const handleSend = async () => {
//     if (input.trim() === "") return;

//     const currentSession = sessions.find(
//       (session) => session.sessionID === activeSessionId
//     );
//     const userMessage = {
//       sender: "user",
//       message: input,
//       timestamp: new Date().toISOString(),
//     };
//     const updatedMessages = [...currentSession.messages, userMessage];

//     setSessions((prevSessions) =>
//       prevSessions.map((session) =>
//         session.sessionID === activeSessionId
//           ? { ...session, messages: updatedMessages }
//           : session
//       )
//     );

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${API_BASE}/chatStart`,
//         { message: input },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           },
//         }
//       );
//       const botMessage = response.data.data.messages.slice(-1)[0];

//       setSessions((prevSessions) =>
//         prevSessions.map((session) =>
//           session.sessionID === activeSessionId
//             ? { ...session, messages: [...updatedMessages, botMessage] }
//             : session
//         )
//       );
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setLoading(false);
//     }

//     setInput("");
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   };

//   const activeSession = sessions.find(
//     (session) => session.sessionID === activeSessionId
//   );

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   useEffect(() => {
//     if (open) {
//       scrollToBottom();
//     }
//   }, [activeSession?.messages, open, loading]);

//   return (
//     <Box sx={{ position: "fixed", bottom: 10, right: 16 , zIndex: 1}}>
//       {!open && (
//         <IconButton
//           onClick={toggleChat}
//           sx={{
//             backgroundColor: "primary.main",
//             color: "white",
//             boxShadow: 3,
//             padding: 2.5,
//             "&:hover": {
//               backgroundColor: "primary.main",
//             },
//           }}
//         >
//           <ChatBubbleOutlineIcon />
//         </IconButton>
//       )}

//       {open && (
//         <Paper
//           elevation={4}
//           sx={{
//             width: { xs: 300, sm: 400 },
//             height: { xs: 600, sm: 550 },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             boxShadow: 4,
//           }}
//         >
//           {/* Header */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               p: 1.5,
//               backgroundColor: "#2c6fa8",
//               color: "white",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ fontSize: "16px", fontWeight: "bold" }}
//             >
//              𝐂𝐡𝐚𝐭𝐁𝐨𝐭 💬
//             </Typography>
//             <IconButton
//               onClick={toggleChat}
//               sx={{ color: "white", padding: 0.5 }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <Divider sx={{ margin: 0 }} />

//           {/* Messages */}
//           <Box
//             sx={{
//               flex: 1,
//               overflowY: "auto",
//               p: 1.5,
//               backgroundColor: "#f9f9f9",
//             }}
//           >
//             {activeSession?.messages.map((message, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   justifyContent:
//                     message.sender === "user" ? "flex-end" : "flex-start",
//                   mb: 1,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     maxWidth: "70%",
//                     p: 1,
//                     borderRadius: 2,
//                     backgroundColor:
//                       message.sender === "user" ? "#2c6fa8" : "grey.200",
//                     color: message.sender === "user" ? "white" : "black",
//                   }}
//                 >
//                   <Typography variant="body2" sx={{ fontSize: "14px" }}>
//                     {message.message}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//             {loading && (
//               <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
//                 {/* <CircularProgress size={24} /> */}
//                 <ChatLoader />
//               </Box>
//             )}
//             <div ref={messagesEndRef} />
//           </Box>

//           {/* Input */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               p: 1.5,
//               borderTop: "1px solid #ddd",
//             }}
//           >
//             <TextField
//               variant="outlined"
//               size="small"
//               fullWidth
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Type your message..."
//               sx={{ mr: 1 }}
//               disabled={loading}
//             />
//             <IconButton
//               onClick={handleSend}
//               disabled={!input.trim() || loading}
//               sx={{
//                 backgroundColor: "#2c6fa8",
//                 color: "#fff",
//                 "&:hover": {
//                   backgroundColor: "#2c6fa8",
//                 },
//               }}
//             >
//               <Send style={{ fontSize: 20 }} />
//             </IconButton>
//           </Box>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ChatBot;

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Send, ShowChart } from "@mui/icons-material";
import axios from "axios";
import ChatLoader from "./ChatLoader/ChatLoader";
import { Link } from "react-router-dom";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const messagesEndRef = useRef(null);

  const toggleChat = () => setOpen(!open);
  const API_BASE = "https://hoteldemo.ranaafaqali.com/api/chat";


  const [tokenn , setTokenn] = useState(null);
  const [userr , setUser] = useState(null)
  console.log(userr); // Using bracket notation
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")

    if (token) {
      setTokenn(token);
      const parsedUser = JSON.parse(user);
    setUser(parsedUser);
     
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchSessions(token);
    }
  }, []);

  const fetchSessions = async (token) => {
    try {
      const response = await axios.get(`${API_BASE}/chatbyuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setSessions(response.data.data);
      setActiveSessionId(response.data.data[0]?.sessionID);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const currentSession = sessions.find(
      (session) => session.sessionID === activeSessionId
    );
    const userMessage = {
      sender: "user",
      message: input,
      timestamp: new Date().toISOString(),
    };
    const updatedMessages = [...currentSession.messages, userMessage];

    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.sessionID === activeSessionId
          ? { ...session, messages: updatedMessages }
          : session
      )
    );

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/chatStart`,
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const botMessage = response.data.data.messages.slice(-1)[0];

      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.sessionID === activeSessionId
            ? { ...session, messages: [...updatedMessages, botMessage] }
            : session
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const activeSession = sessions.find(
    (session) => session.sessionID === activeSessionId
  );

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [activeSession?.messages, open, loading]);

  return (
    <Box sx={{ position: "fixed", bottom: 10, right: 16, zIndex: 1 }}>
      {!open && (
        <IconButton
          onClick={toggleChat}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            boxShadow: 3,
            padding: 2.5,
            "&:hover": {
              backgroundColor: "primary.main",
            },
          }}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      )}

      {open && (
        <Paper
          elevation={4}
          sx={{
            width: { xs: 300, sm: 400 },
            height: { xs: 600, sm: 550 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1.5,
              backgroundColor: "#2c6fa8",
              color: "white",
            }}
          >

            {!tokenn && (
 <Typography
 variant="h6"
 sx={{ fontSize: "16px", fontWeight: "bold" }}
>
🤖 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 
</Typography>
            )}

{tokenn && (
 <Typography
 variant="h6"
 sx={{ fontSize: "15px" , textTransform: 'capitalize'}}
>
💬 <span style={{fontSize: 20}}>Welcome,</span> {userr?.username}
</Typography>
            )}
           

            <IconButton
              onClick={toggleChat}
              sx={{ color: "white", padding: 0.5 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ margin: 0 }} />

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 1.5,
              backgroundColor: "#f9f9f9",
            }}
          >
            {isLoggedIn ? (
              activeSession?.messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      message.sender === "user" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      p: 1,
                      borderRadius: 2,
                      backgroundColor:
                        message.sender === "user" ? "#2c6fa8" : "grey.200",
                      color: message.sender === "user" ? "white" : "black",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: "14px" }}>
                      {message.message}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <ShowChart style={{ fontSize: 50, color: "#888" }} />
                <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                  Please log in to start chatting with us. Thank you!
                </Typography>
                <Link to={'/login'}>
                <Button style={{fontWeight:'bold'}} >
                  Click Here
                </Button>
                </Link>
              
              </Box>
            )}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <ChatLoader />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          {isLoggedIn && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                borderTop: "1px solid #ddd",
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                sx={{ mr: 1 }}
                disabled={loading}
              />
              <IconButton
                onClick={handleSend}
                disabled={!input.trim() || loading}
                sx={{
                  backgroundColor: "#2c6fa8",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#2c6fa8",
                  },
                }}
              >
                <Send style={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ChatBot;
