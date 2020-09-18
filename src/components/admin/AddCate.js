import React, { useState } from 'react'
import { database,storage } from '../../firebase/Index';

function AddCate(){
  const [nameCate, setNameCate] = useState('')
  const [avata, setAvata] = useState(null);

  const addCate = (namecate)=>{
      var cateId = database.ref().child('categories').push().key;
      database.ref(`categories/${cateId}`).set({
        name: namecate,
        image:avata
      })
      setNameCate('')
    }
    const handleImage = e => {
      if (e.target.files[0]) {
          setAvata(e.target.files[0]);
      }
  };
  const handleUpload = () => {
      const upLoadTask = storage.ref(`imagesCate/${avata.name}`).put(avata);
      upLoadTask.on(
          "state_changed",
          snapshot => { },
          error => { console.log(error) },
          () => {
              storage.ref("imagesCate")
              .child(avata.name)
              .getDownloadURL()
              .then(url => {
                  setAvata(url)
                  console.log("url", url);
              })
              console.log("avata", avata);
          }
      )
  }
  return(
    <div>
      <input value={nameCate} onChange={e=>setNameCate(e.target.value)}></input>
      <input type='file' name='avata' onChange={handleImage} /><br/>
      <button onClick={handleUpload}>upload image</button><br /><br/>
      <button onClick={()=>addCate(nameCate)}>Add category</button>
    </div>
  )
}
export default AddCate;