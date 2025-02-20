import React, { createContext, useEffect, useState } from "react";
export const WebSocketContext = createContext<WebSocket | null>(null);
export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:3334");
  //   setSocket(ws);
  //   return () => ws.close();
  // }, []);
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
