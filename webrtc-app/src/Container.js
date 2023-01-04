/* Subscribes to context changes */
import React from "react";
import Chat from "./Chat.js";
import {ChannelConsumer, ConnectionConsumer} from "./App.js";

const Container = () => {
    return (
      <ConnectionConsumer>
        {({ connection, updateConnection }) => (
          <ChannelConsumer>
            {({ channel, updateChannel }) => (
              <Chat
                connection={connection}
                updateConnection={updateConnection}
                channel={channel}
                updateChannel={updateChannel}
              />
            )}
          </ChannelConsumer>
        )}
      </ConnectionConsumer>
    );
  };
  