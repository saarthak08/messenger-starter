import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  readMessages,
} from "./store/conversations";
import {
  isTyping
} from "./store/user";

const socket = io("http://localhost:3001", {
  withCredentials: true
});

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("messages-read", (data) => {
    store.dispatch(readMessages(data.conversationId, data.messages));
  });
  socket.on('is-typing', (data) => {
    console.log(data);
    store.dispatch(isTyping(data));
  });
});

export default socket;
