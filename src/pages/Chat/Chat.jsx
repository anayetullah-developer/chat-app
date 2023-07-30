import {getFirestore, addDoc, collection, serverTimestamp, onSnapshot, where, query, orderBy} from "firebase/firestore"
import app from "../../firebase/Firebase.config";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../provider/AuthProvider";

const Chat = (props) => {
const {room} = props;
const db = getFirestore(app);
const messageCollection = collection(db, "messages");
const {user} = useContext(AuthContext);   
const [newMessage, setNewMessage] = useState("");
const [messages, setMessages] = useState([]);

useEffect( () => {
    const queryMessages = query(messageCollection, where("room", "==", room), orderBy("createdAt"))
    let messages = [];
    const unsubscribe = onSnapshot(queryMessages, (data) => {
        data.forEach( (doc) => {
            messages.push({...doc.data(), id: doc.id})
        })

        setMessages(messages);
    })

    return () => unsubscribe();
}, [messageCollection])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(newMessage === "") return;
    await addDoc(messageCollection, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: user.displayName,
        room: room   
    })

    setNewMessage("")
  }

  return (
    <div className="bg-secondary-subtle w-75 w-sm-100 mx-auto pt-3 px-md-5 px-3 min-vh-90 position-relative">
        {
            messages.map( (message) => {
                return <div key={message.id}>
                    <span className="fw-bold text-primary">{message.user}: </span>
                    <span>{message.text}</span>
                </div>
            })
        }
      <div className="w-75 w-sm-100 mx-auto position-absolute bottom-0 p-3">
        <Form className="pt-5 text-center" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="2">
            <input
              type="text"
              required
              name="message"
              value={newMessage}
              placeholder="Message"
              className="py-2 px-4 w-75 w-sm-50 rounded-pill border-0 me-1"
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button
              type="submit"
              className="mb-2 btn-solid-primary border-0 fw-bold"
            >
              send
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
