import { Manager } from "socket.io-client";

const manager = new Manager("http://localhost:3000");
export const webSocket = manager.socket("/");

// shorter alternative below has some TS issue.
// import io from "socket.io-client";
// export const webSocket = (io as any)();
