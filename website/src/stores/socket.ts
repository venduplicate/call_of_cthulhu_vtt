import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { io } from "socket.io-client";
import { API_URL } from "./static";
import type { ClientSocketType } from "./types/SocketTypes";
import { v4 as uuidv4 } from "uuid";

export const useSocketStore = defineStore("socket", () => {
  const socketStore: ClientSocketType = io(
    API_URL[process.env.NODE_ENV as string]
  );

  const sessionId: Ref<string | null> = ref(null);

  function updateSessionId(id: string) {
    sessionId.value = id;
  }

  function initSession(sessionId: string) {
    socketStore.emit("create-room", sessionId);
  }

  function getSessionId() {
    return sessionId.value;
  }

  return { socketStore, initSession, updateSessionId, getSessionId };
});
