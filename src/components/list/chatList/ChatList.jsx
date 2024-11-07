import { useEffect, useState } from "react"
import "./chatList.css"
import AddUser from "./addUser/AddUser"
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";

const ChatList = () => {

	const [chats, setChats] = useState([])
	const [addMode, setAddMode] = useState(false)

	const {currentUser, isLoading, fetchUserInfo} = useUserStore()

	useEffect(() => {

		const unSub = onSnapshot(
			doc(db, "userchats", currentUser.id), 
			async (res) => {
				const items = res.data().chats;

				const promises = items.map( async (item) => {
					const userDocRef = doc(db, "users", item.receiverId);
					const userDocSnap = await getDoc(userDocRef);

					const user = userDocSnap.data();

					return { ...items, user }
				});

				const chatData = await Promise.all();
				setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt ));
			}
		);

		return () => {
			unSub()
		}
	}, [currentUser.id]);

	console.log(chats);

	return (
		<div className="chatList" >
			<div className="search">
				<div className="searchBar">
					<img src="./search.png" alt="" />
					<input type="text" placeholder="Search" />
				</div>
				<img
					src={addMode ? "./minus.png" : "./plus.png"}
					alt=""
					className="add"
					onClick={
						() => setAddMode((prev) => !prev)
					}
				/>
			</div>

			{chats.map((chat) => (
				<div className="item" key={chat.chatId} >
					<img src="./avatar.png" alt="" />
					<div className="texts">
						<span>Juana</span>
						<p>{chat?.lastMessage}</p>
					</div>
				</div>
			))}

			{addMode && (<AddUser />)}
		</div>
	)
}

export default ChatList