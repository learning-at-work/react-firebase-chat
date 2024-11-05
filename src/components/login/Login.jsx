import { useState } from "react"
import "./login.css"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import upload from "../../lib/upload"

const Login = () => {

  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });

  const [loading, setLoading] = useState(false)

  const handleAvatar = e => {
    if(e.target.files[0]) {

      setAvatar({
        file:e.target?.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleLogin = e => {
    e.preventDefault()
    toast.success("Hello")
  }

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target)

    const {
      username,
      email,
      pwd
    } = Object.fromEntries(formData)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, pwd)

      const imgUrl = await upload(avatar.file)

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: []
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: []
      });

      toast.success("Account created!")

    } catch (error) {

      console.log(error)
      toast.message(error.message)

    } finally {
      setLoading(false)
    }

  }
  
  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>

          <input type="text" placeholder="Email" name="email"/>
          <input type="password" placeholder="Password" name="pwd"/>
          <button disabled={loading}>{loading ? "Loading" : "Login"}</button>

        </form>
      </div>

      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="fileAvatar">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>

          <input 
            type="file" 
            id="fileAvatar" 
            style={{ display: "none" }} 
            onChange={handleAvatar}
          />

          <input type="text" placeholder="Username" name="username"/>
          <input type="text" placeholder="Email" name="email"/>
          <input type="password" placeholder="Password" name="pwd"/>
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>

        </form>
      </div>
    </div>
  )
}

export default Login