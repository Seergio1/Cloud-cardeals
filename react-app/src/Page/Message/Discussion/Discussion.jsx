import React, { useState, useEffect } from 'react';
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { auth, firestore } from '../../../firebase-config';
import { collection, query, orderBy, where, onSnapshot, addDoc, serverTimestamp, doc } from 'firebase/firestore';


// Définition du composant Discussion
function Discussion() {
  const [messages, setMessages] = useState([]);

  /////////////////////////////////////////ito le currentID anh//////////////////////////////////
  const currentUserID = auth.currentUser?.uid;
  const otherUserId = localStorage.getItem("up");

  console.log('up ' + otherUserId);
  useEffect(() => {

    if (currentUserID && otherUserId) {
      const q = query(
        collection(firestore, 'messages'),
        orderBy('date'),
        where('expediteur', 'in', [currentUserID, otherUserId]),
        where('destinataire', 'in', [currentUserID, otherUserId])
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let updatedMessages = [];
        querySnapshot.forEach((doc) => {
          updatedMessages.push({ ...doc.data(), id: doc.id });
        });

        setMessages(updatedMessages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUserID, otherUserId]);

  useEffect(() => {
    scrollToEnd()
  }, [messages])
  const scrollToEnd = () => {
    let contentScroll = document.querySelector('.content-discussion');
    // contentScroll.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    contentScroll.scrollTop = contentScroll.scrollHeight;
  }
  return (
    <div className='discussion-container'>
      <div className='header-discussion'>
        <div className='user-info'>
          <div className='user-img'></div>
          <div className='user-name'>Sergio</div>
        </div>
      </div>

      <div className='content-discussion'>
        {messages != null ?
          messages.map((message) => (
            <div key={message.id} className={`discussion-item ${message.expediteur === currentUserID ? 'right' : ''}`}>
              <div className='user-img '></div>
              {/*raha message.expediteur mitovy amle currentID de droite*/}
              <div className='user-msg '>
                {message.text}
              </div>
              <div className='msg-time'>{message.date ? message.date.toDate().toLocaleString() : 'Date not available'}</div>
            </div>
          ))
          : <div className='discussion-item'>
            <div className='user-img skeleton'></div>
            <div className='user-msg skeleton'></div>
            <div className='msg-time skeleton'></div>
          </div>}

      </div>

      {/* Afficher le composant SendMessage */}
      <SendMessage />
    </div>
  );
}

function SendMessage() {
  const [msg, setMsg] = useState('')
  const messagesRef = collection(firestore, "messages");

  const sendMsg = async (e) => {
    const { uid } = auth.currentUser

    await addDoc(messagesRef, {
      text: msg,
      date: serverTimestamp(),
      expediteur: uid,
      destinataire: localStorage.getItem("up")
    })
    setMsg('');
  };

  return (
    <div className='box-send-msg'>
      <textarea
        placeholder='Type your message'
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      ></textarea>
      <div className='send-button'>
        <div className='send-button-text' onClick={sendMsg}>Send</div>
        <HiOutlinePaperAirplane />
      </div>
    </div>
  );
}

export default Discussion