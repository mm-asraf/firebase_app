import React, { useEffect } from "react";
import { useState } from "react";
import { app, database } from "./firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const userData = {
  email: "",
  password: "",
  firstName: "",
  age: "",
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

  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      console.log(data);
    });
  });

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

  const ageQuery = query(collectionRef, where("age", ">", 28));

  //   collecion submit add data
  const addData = () => {
    addDoc(collectionRef, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      age: Number(data.age),
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
    // getDocs(collectionRef).then((res) => {
    //   console.log(
    //     res.docs.map((item) => {
    //       return { ...item.data(), id: item.id };
    //     })
    //   );
    // });
    onSnapshot(collectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
    //realtime updates with filter
    // onSnapshot(ageQuery, (data) => {
    //   console.log(
    //     data.docs.map((item) => {
    //       return item.data();
    //     })
    //   );
    // });
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

  useEffect(() => {
    onSnapshot(collectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
    onAuthStateChanged(auth, (data) => {
      if (data) {
        alert("Logged In");
      } else {
        alert("Not logged In");
      }
    });
  }, []);

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
      <button onClick={handleLogout}>Logout</button>
      <br />

      <input
        type="text"
        placeholder="Enter firstName"
        name="firstName"
        value={data.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter email"
        name="email"
        value={data.email}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Enter age"
        name="age"
        value={data.age}
        onChange={handleChange}
      />
      <br />

      <button onClick={handleSubmitSigninWithGoogle}>Login</button>
      <button onClick={addData}>add data</button>
      <button onClick={getData}>get data</button>
      <button onClick={updateData}>update data</button>
      <button onClick={deleteData}>delete data</button>
    </div>
  );
};

export default Login;
