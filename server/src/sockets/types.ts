
import type {Server} from "socket.io";
interface ClientToServerEvents {
    "do this": () => void;
}

interface ServerToClientEvents{

}

interface InterServerEvents {
    
}
export type IOServer = Server<ClientToServerEvents, ServerToClientEvents>