import logo from './logo.svg';
import './App.css';
import React, {useState, createContext} from "react";
import Container from "./Container";

const channelContext = createContext({
  connecction: null, 
  updateChannel: () => {}
});

const connectionContext = createContext({
  connection : null, 
  updateConnection: () => {}
});

function App() {
    const [channel, setChannel] = useState(null);
    const [connection, setConnection] = useState(null);
    const updateConnection = conn => {
      setConnection(conn);  
    };
    const updateChannel = chnl => {
      setChannel(chnl);
    };
    return;     
};

/* make connection and channel available to nested components as props */
export const ConnectionConsumer = connectionContext.Consumer; // allows us to subscribe to a context within a function component and render based on context values
export const ChannelConsumer = channelContext.Consumer; 
export default App;
