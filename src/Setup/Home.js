// importing required modules
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// importing dummy data
import data from '../data.json';

// importing css
import './dropdown.css'

// returns last message
const lastMessage = (id) => {
  const { messages } = id;
  const x = messages.length;
  const lastmsg = messages[x - 1]['message'];
  if (messages[x - 1]['isMyMessage']) {
    return 'You:' + lastmsg;
  }
  return lastmsg;
}

// Home component
const Home = () => {

  // useState for search bar
  const [searchQuery, setSearchQuery] = useState('');
  return <>

    <div className='people-list' id='people-list'>

      {/* search bar */}
      <div className='search'>
        <input type="text" placeholder='search' onChange={e => setSearchQuery(e.target.value)} />
        <i className="fa fa-search"></i>
      </div>

      {/* new conversation */}
      <div className="dropdown" style={{ padding: '20px' }}>
        <button className="dropbtn">New Conversation</button>
        <div className="dropdown-content">
          {
            data.map(person => {
              return <Link to={`/chat/${person['id']}`} key={person['id']}>{person['login']}</Link>
            })
          }

        </div>
      </div>

      {/* list of conversations */}
      <ul className='list'>
        {

          data.filter(
            post => {
              if (searchQuery === '') {
                return post;
              } else if (post['login'].toLowerCase().includes(searchQuery.toLowerCase())) {
                return post;
              }
            }
          ).map(person => {

            return <Link to={`/chat/${person['id']}`} key={person['id']} style={{
              color: 'white'
            }}>
              <li className='clearfix'>
                <img src={person['image']} className='user-image' alt={person['login']} />
                <div className='about'>
                  <div className='name'>{person['login']}</div>
                  <div className='status limit-chars'>{person['messages'].length > 0 ? lastMessage(person) : <p></p>}</div>

                </div>
              </li>
            </Link>

          })
        }

      </ul>
    </div>

  </>
}


// exporting Home component
export default Home