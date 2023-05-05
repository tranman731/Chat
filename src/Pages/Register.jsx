/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Add from "../Images/a1.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Register Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Đang tải lên và nén hình ảnh vui lòng đợi..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

// const Register = () => {
//   const [err, setErr] = useState(false);
//   const navigate = useNavigate();

//     // Code xử lý sự kiện khi nhấn vào nút button
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = () => {
//     setIsLoading(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0];

//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       const storageRef = ref(storage, displayName);

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       // Register three observer
//       uploadTask.on(
//         (error) => {
//           setErr(true);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateProfile(res.user, {
//               displayName,
//               photoURL: downloadURL,
//             });
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid: res.user.uid,
//               displayName,
//               email,
//               photoURL: downloadURL,
//             });

//             await setDoc(doc(db, "userChats", res.user.uid), {});
//             navigate("/");
//           });
//         }
//       );
//     } catch (err) {
//       console.log(err);
//       setErr(true);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="formContainer">
//       <div className="formWrapper">
//         <span className="logo">Register Chat</span>
//         <span className="title">Register</span>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="Display name" />
//           <input type="email" placeholder="email" />
//           <input type="password" placeholder="password" />
//           <input style={{ display: "none" }} type="file" id="file" />
//           <label htmlFor="file">
//             <img src={Add} alt="" />
//             <span>Add An Avatar</span>
//           </label>
//           <button onClick={handleClick}>Sign up</button>
//           {isLoading && <p>Đang tải dữ liệu...</p>}
//           {err && <span>Something went wrong</span>}
//         </form>
//         <p>
//           You have a account ? <Link to="/login"> Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
