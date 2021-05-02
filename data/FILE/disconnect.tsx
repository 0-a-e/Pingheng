import React from 'react';
import { send } from './useSend';

const disconnect = () => {
    send({
        "type": "disconnect",
        "body": {
          "id": "timeline",

          "params": {}
        }
      });
}
export default disconnect;