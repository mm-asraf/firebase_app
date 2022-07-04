import React from "react";
import { useState } from "react";
import { app, database, storage } from "./firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Login2 = () => {
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    const storageRef = ref(storage, `images/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={(e) => setData(e.target.files[0])} />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login2;
