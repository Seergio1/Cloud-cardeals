import { useEffect, useState } from "react";
import { HiFilter } from "react-icons/hi";
import { collection, limit, query, orderBy, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { firestore, auth } from '../../../firebase-config';
import { useNavigate } from "react-router-dom";


function ActiveUser(params) {
    const navigate = useNavigate()
    useEffect(() => {
        let msg = document.querySelectorAll(".liste-message-user-item");
        let box_container = document.querySelector(".box-liste-message-user");
        let heightTotal = 0;
        msg.forEach((item) => {
            let height = item.getBoundingClientRect().height;
            heightTotal += height
        })
        // box_container.style.maxHeight = heightTotal + "px";
    })
    return <>
        <div className="active-container">
            {/* header */}
            <div className="back-button" onClick={() => {
                navigate('/')
            }}>BACK</div>
            <div className="header">
                <div className="title">Active</div>
                <div className="number-active">15</div>
            </div>
            {/* header */}
            <div className="box-active">
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
                <div className="active-user-item"></div>
            </div>
        </div>
    </>
}
const getUserNameByUserId = async (uid) => {
    try {
        const userDoc = await getDoc(doc(firestore, 'users', uid));

        if (userDoc.exists()) {

            const userData = userDoc.data();
            return userData.displayName || null;
        } else {
            console.error('Document not found');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du nom', error);
        return null;
    }
}
function ListeMessageUser(params) {
    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const userId = auth.currentUser?.uid;
                console.log('current_user ' + auth.currentUser.displayName);

                if (!userId) {
                    throw new Error('User not authenticated');
                }

                const q1 = query(
                    collection(firestore, 'messages'),
                    where('expediteur', '==', userId),
                    orderBy('date', 'desc')
                );
                const q2 = query(
                    collection(firestore, 'messages'),
                    where('destinataire', '==', userId),
                    orderBy('date', 'desc')
                );

                const [result1, result2] = await Promise.all([getDocs(q1), getDocs(q2)]);
                const combinedResult = [...result1.docs, ...result2.docs];
                combinedResult.sort((a, b) => b.data().date - a.data().date);

                const chatListData = [];
                const encounteredIds = new Set();
                console.log('length ' + combinedResult.length);

                for (const doc of combinedResult) {
                    const otherUserId = doc.data().destinataire !== userId
                        ? doc.data().destinataire
                        : doc.data().expediteur;

                    if (!encounteredIds.has(otherUserId)) {
                        encounteredIds.add(otherUserId);

                        //const firstId = Array.from(encounteredIds)[0];
                        localStorage.setItem('up', otherUserId);

                        const nom = await getUserNameByUserId(otherUserId);
                        const lastMessage = await getLastMessage(otherUserId);
                        chatListData.push({ otherUserId, nom, lastMessage });
                    }
                }

                setChatList(chatListData);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching chat list:', error);
                setError('Error fetching chat list: ' + error.message);
                setLoading(false);
            }
        };

        fetchChatList();
    }, []);

    const getLastMessage = async (otherUserId) => {
        try {
            const userId = auth.currentUser?.uid;

            const q = query(
                collection(firestore, 'messages'),
                where('destinataire', '==', userId),
                where('expediteur', '==', otherUserId),
                orderBy('date', 'desc'),
                limit(1)
            );

            const q2 = query(
                collection(firestore, 'messages'),
                where('destinataire', '==', otherUserId),
                where('expediteur', '==', userId),
                orderBy('date', 'desc'),
                limit(1)
            );

            const [result1, result2] = await Promise.all([getDocs(q), getDocs(q2)]);
            const combinedResult = [...result1.docs, ...result2.docs];

            if (combinedResult.length > 0) {
                combinedResult.sort((a, b) => b.data().date - a.data().date);
                const lastMessageData = combinedResult[0].data();

                return {
                    text: lastMessageData.text,
                    date: lastMessageData.date.toDate()
                };
            }
        } catch (error) {
            console.error('Error fetching last message:', error);
            return null;
        }
    };

    return <>
        <div className="liste-message-user-container">
            {/* header */}
            <div className="header">
                <div className="title">Chat</div>
                <HiFilter />
            </div>
            {/* header */}

            <div className="box-liste-message-user">
                {loading ? (
                    <p>Loading</p>
                ) : (
                    <>
                        {chatList.length > 0 ? (
                            chatList.map(({ otherUserId, nom, lastMessage }) => {
                                return <>
                                    {/* item */}
                                    < div key={otherUserId} className="liste-message-user-item " onClick={() => {
                                        localStorage.setItem("up", otherUserId);
                                        console.log(otherUserId);
                                    }}>
                                        <div className="active-message ">.</div>
                                        <div className="user-img "></div>
                                        <div className="user-info">
                                            <div className="user-name ">{nom}</div>
                                            <div className="user-message ">
                                                {lastMessage.text}
                                            </div>
                                        </div>
                                        <div className="send-time ">{lastMessage.date.toLocaleString()}</div>
                                    </div>
                                    {/* item */}
                                </>
                            }
                            )
                        ) : (
                            <p>No chat history found.</p>
                        )}
                    </>
                )}



            </div>
        </div >
    </>
}

function ListeMessage(params) {
    return <>
        <div className="liste-message-container">
            <ActiveUser />
            <ListeMessageUser />
        </div>
    </>
}
export default ListeMessage;



{/* < div key={otherUserId} className="liste-message-user-item skeleton" onClick={() => {
    localStorage.setItem("up", otherUserId);
}}>
    <div className="active-message skeleton">.</div>
    <div className="user-img skeleton"></div>
    <div className="user-info">
        <div className="user-name skeleton">{nom}</div>
        <div className="user-message skeleton">
            {lastMessage.text}
        </div>
    </div>
    <div className="send-time ">{lastMessage.date.toLocaleString()}</div>
</div> */}