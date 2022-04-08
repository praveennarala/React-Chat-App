// importing required modules
import React, { useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';

// importing dummy data
import data from '../data.json';

// reducer function 
const reducer = (state, action) => {
  // action for sending new message
  if (action.type === 'ADD_MESSAGE') {
    const index = action.payload['personId'] - 1;
    const newmsg = action.payload['newMessage'];
    state[index]['messages'].push(newmsg);
    return state;
  }
}

// returns time using timestamp
const time = (timestamp) => {
  const date = new Date(timestamp);

  return (date.getDate() +
    "/" + (date.getMonth() + 1) +
    "/" + date.getFullYear() +
    " " + date.getHours() +
    ":" + date.getMinutes());
}

// Chat component
const Chat = () => {

  // id form url
  const { id } = useParams();

  // value from message input
  const [msg, setMsg] = useState('');

  // reducer for new message
  const [state, dispatch] = useReducer(reducer, data);

  // form for new message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg) {
      const newMsg = {
        "personId": id,
        "newMessage": {
          "id": new Date().getTime(),
          "message": document.getElementById('message').value,
          "isMyMessage": true
        }
      }

      dispatch({ type: 'ADD_MESSAGE', payload: newMsg });

      setMsg('');

    }
  }

  return <>
    <div className='chat'>

      {/* username */}
      <div className='chat-header clearfix'>
        <div className='chat-about'>
          <div className='chat-with'>{state[id - 1]['login']}</div>
        </div>
      </div>

      {/* conversation */}
      <div className='chat-history'>
        <ul>
          {
            state[id - 1]['messages'].map(message => {
              if (message.isMyMessage) {
                // my message
                return <li className="clearfix" key={message['id']}>
                  <div className="message-data align-right">
                    <span className="message-data-time">{time(message['id'])}</span> &nbsp; &nbsp;
                  </div>
                  <div className="message other-message float-right">
                    {message['message']}
                  </div>
                </li>
              }
              // friend message 
              return <li key={message['id']}>
                <div className="message-data ">

                  <span className="message-data-time">{time(message['id'])}</span>
                </div>
                <div className="message my-message">
                  {message['message']}
                </div>
              </li>
            })
          }

        </ul>
      </div>
      <div className="chat-message clearfix">
        {/* form for sending message */}
        <form onSubmit={handleSubmit}>
          <textarea id="message" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type your message" rows="3"></textarea>

          <button type='submit'>Send</button>
        </form>
      </div>

    </div>
  </>
}

// exporting Chat component
export default Chat;