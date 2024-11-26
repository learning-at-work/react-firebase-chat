import { useEffect, useRef, useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";

const Chat = () => {
  const [chat, setChat] = useState(null);
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
	const {chatId} = useChatStore()


  const handleEmoji = e => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth"});
  }, [])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => unSub()
  }, [chatId])
  
  console.log(chat);

  return (
    <div className="chat" >
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
            <span>Juana</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt=""/>
          <img src="./video.png" alt=""/>
          <img src="./info.png" alt=""/>
        </div>
      </div>
      <div className="center">

        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam architecto aut ipsa maxime possimus suscipit itaque dignissimos, cum soluta nemo, commodi, aliquid quae exercitationem officia dolorem odio natus libero unde!</p>
            <span>1 min ago.</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam architecto aut ipsa maxime possimus suscipit itaque dignissimos, cum soluta nemo, commodi, aliquid quae exercitationem officia dolorem odio natus libero unde!</p>
            <span>1 min ago.</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam architecto aut ipsa maxime possimus suscipit itaque dignissimos, cum soluta nemo, commodi, aliquid quae exercitationem officia dolorem odio natus libero unde!</p>
            <span>1 min ago.</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam architecto aut ipsa maxime possimus suscipit itaque dignissimos, cum soluta nemo, commodi, aliquid quae exercitationem officia dolorem odio natus libero unde!</p>
            <span>1 min ago.</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
          <img src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam architecto aut ipsa maxime possimus suscipit itaque dignissimos, cum soluta nemo, commodi, aliquid quae exercitationem officia dolorem odio natus libero unde!</p>
            <span>1 min ago.</span>
          </div>
        </div>

        <div ref={endRef}></div>

      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input 
          type="text" 
          placeholder="Type a message..."
          value={text}
          onChange={e=>setText(e.target.value)}
        />
        <div className="emoji">

          <img src="./emoji.png" alt="" 
            onClick={() => setOpen(prev => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}

export default Chat