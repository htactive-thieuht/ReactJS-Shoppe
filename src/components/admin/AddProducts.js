import React, { useState, useEffect } from "react";
import { database, storage } from '../../firebase/Index'
import { Redirect } from 'react-router-dom'
import '../Style.css'
import Footer from'../webPage/Footer';
import '../../App.css'
import { Row, Col, Input } from 'antd';
import Item from "antd/lib/list/Item";
const { Search } = Input;
const sty = {
    color: 'orange',
    backgroundcolor: 'orangered',
    width:700,
}

function Addproducts() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [avata, setAvata] = useState(null);
    const [rollback, setRollBack] = useState(false)
    const [rollbackHome, setRollBackHome] = useState(false)
    const [categoryArr, setCategoryArr] = useState([])


    useEffect(()=>{
      let ref = database.ref('/categories');
      ref.on('value', snapshot => {
          var state = snapshot.val();
          if (state) {
              const objectList = Object.keys(state).map(key => ({
                  ...state[key],
                  id: key
                  })
              );
              setCategoryArr(objectList)
          }
      });
    },[])
  
    
    const Add = (name, price, quantity,cateId) => {
            var productId = database.ref().child('products').push().key;
            database.ref(`products/${productId}`).set({
                name: name,
                price: price,
                quantity: quantity,
                categoryId: cateId,
                avata: avata,
        })
        setName('')
        setPrice('')
        setQuantity('')
    }
        const handleOnChange = e => {
            setCategory(e.target.value)
        };

    const handleImage = e => {
        if (e.target.files[0]) {
            setAvata(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const upLoadTask = storage.ref(`images/${avata.name}`).put(avata);
        upLoadTask.on(
            "state_changed",
            snapshot => { },
            error => { console.log(error) },
            () => {
                storage.ref("images")
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

    const rollBack = () => {
        setRollBack(true)
    }

    if (rollback) {
        return <Redirect to='/ProductsList' />
    }

    const rollBackHome = () => {
        setRollBackHome(true)
    }

    if (rollbackHome) {
        return <Redirect to='/' />
    }
    return (

        <div className="contents">
        <div className="headeradd">
            <Row className="center">
                    <Col span={5} className="logoadd">
                        <img className="logos" src="y-nghia-logo-shopee.jpg" width="200px" height="150px"></img> 
                    </Col>
                    <Col span={19} > 
                    <div class="vertical-menu">
                        <div className="addhearder">
                        <a href="#home"><Search style={sty} placeholder="input search text" onSearch={value => console.log(value)} enterButton /></a>
                        <a href="#home" onClick={()=>rollBack()}>View products</a>
                        <a href="#home" onClick={()=>rollBackHome()}> LogOut</a>
                        </div>
                     </div>
                    </Col>        
            </Row>
        </div>
        <div>
            <div className='divForm'>
                <h2>ADD PRODUCTS</h2>
                <input type='text' value={name} placeholder='Enter your product name' onChange={e => setName(e.target.value)} /><br />
                <input type='number' value={price} placeholder='Enter your product price ' onChange={e => setPrice(e.target.value)} /><br />
                <input type='number' value={quantity} placeholder='Enter your product quantity' onChange={e => setQuantity(e.target.value)} /><br />
                <select onChange={handleOnChange}>
                    {categoryArr.map((item)=>{
                        return(
                            <option value={item.id}>{item.name}</option>
                        )
                    })}
                </select><br/>
                <input type='file' name='avata' onChange={handleImage} /><br/>
                <button onClick={handleUpload}>upload image</button><br /><br/>
                <button onClick={() => Add(name, price, quantity,category, avata)}>Nhập sản phẩm</button>
            </div>

        </div>
        <div className="footer">
            <Footer />
        </div>
    </div>
       
    )
}
export default Addproducts;