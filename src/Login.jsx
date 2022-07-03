import React from "react";
import { useState } from "react";
import { app, database } from "./firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const userData = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(userData);
  let auth = getAuth();
  const GoogleProvider = new GoogleAuthProvider();

  //   collections
  const collectionRef = collection(database, "users");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const datas = { ...data, [name]: value };
    setData(datas);
  };

  const handleSubmitSignup = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmitSignin = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmitSigninWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((res) => {
        console.log(res.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //   collecion submit add data
  const handleSubmitColl = () => {
    addDoc(collectionRef, {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        alert("Data added");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //   getdata
  const getData = () => {
    getDocs(collectionRef).then((res) => {
      console.log(
        res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const updateData = () => {
    const docToUpdate = doc(database, "users", "dp11EnJQjeo10ULh7mDp");
    updateDoc(docToUpdate, {
      email: "ABC",
      password: 12345,
    })
      .then((res) => {
        alert("Data Updated");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteData = () => {
    const docToDelete = doc(database, "users", "dp11EnJQjeo10ULh7mDp");
    deleteDoc(docToDelete, {
      email: "ABC",
      password: 12345,
    })
      .then((res) => {
        alert("Data deleted");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter email"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter password"
        name="password"
        value={data.password}
        onChange={handleChange}
      />

      <button onClick={handleSubmitSignup}>Signup</button>
      <button onClick={handleSubmitSignin}>Login</button>
      <br />

      <button onClick={handleSubmitSigninWithGoogle}>Login</button>
      <button onClick={handleSubmitColl}>add data</button>
      <button onClick={getData}>get data</button>
      <button onClick={updateData}>update data</button>
      <button onClick={deleteData}>delete data</button>
    </div>
  );
};

export default Login;
