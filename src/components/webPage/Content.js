import React, { useState, useEffect } from 'react';
import './Content.css'
import { database, auth } from '../../firebase/Index'
import { Row, Col, List } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Page from './Page'
function Content() {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([])
    const [listproducts, setListproducts] = useState()
    const fetchData = async () => {
        let ref = await database.ref('/products');
        ref.on('value', snapshot => {
            var state = snapshot.val();
            if (state) {
                const objectList = Object.keys(state).map(key => ({
                    ...state[key],
                    id: key
                }));
                setProduct(objectList)
            }
        });
    }
  
    useEffect(() => {
        fetchData()
    }, []);
    const [listData, setListData] = useState(product);
     const addToCart = productItem =>{
        const userID = window.localStorage.getItem('KeyUser');
        if(userID){
            database.ref(`cart/${userID}`).once('value').then((snapshot) => {
                // Get list Cart
                const valueCart=  snapshot.val()    
                if (valueCart) {
                    const objectListPr = Object.keys(valueCart).map(key => ({
                        ...valueCart[key],
                        id: key
                    }));
                    // find productItem
                    let findProduct = objectListPr.find(item => item.id === productItem.id)
                    // is productItem true
                    if (findProduct) {
                        findProduct = {...findProduct, quantitys: findProduct.quantitys + 1}
                        delete findProduct.id
                        database.ref(`cart/${userID}/${productItem.id}`).update(findProduct)
                    }
                    // is productItem false
                    else {
                        database.ref(`cart/${userID}/${productItem.id}`).set({...productItem, quantitys: 1})
                    }
                
                } else {
                    database.ref(`cart/${userID}`).child(`/${productItem.id}`).set({...productItem, quantitys: 1})
                }
              });
        }else{
            alert('Chưa Đăng nhập tài khoản của bạn');
        }
    }
    
    return (
    <div>    
     <div className="all_contents">
                <div className="" >
                    <List
                        grid={{ gutter: 16, column: 6 }}
                        pagination={{
                            pageSize: 12,
                        }}
                        dataSource={product}
                        renderItem={item => (
                            <List.Item >
                                    <div className="thumbanailsMain">
                                            <div className="thumbanail ">
                                                <div className="image-first">
                                                    <div className=" thubanailImge ">
                                                        <div className="index">
                                                            <div className="label1">
                                                                <label>yêu thích</label>
                                                            </div>
                                                            <div className="label1">
                                                                <label>40% giảm</label>
                                                            </div>
                                                        </div>
                                                        <Link to={{ pathname: '/DetailProduct', params: { item } }}>
                                                            <img className="img" src={item.avata} width="200px" height="250px"></img>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className=" thumbanailcontent">
                                                    <div className="abcss">
                                                        <p>{item.name}</p>
                                                    </div>
                                                    <div className="bottom"></div>
                                                        <div className="contentLetter">
                                                        <strong><h3>{item.price}<u>đ</u></h3></strong>
                                                        </div>
                                                        <div className="contentButton2">
                                                            <button  className="buttn" onClick={() => addToCart(item)}> add to cart <ShoppingCartOutlined /></button>
                                                        </div>
                                                    </div>
                                            </div>
                                    </div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
export default Content;

