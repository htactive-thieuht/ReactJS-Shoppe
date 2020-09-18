import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/Index';
import { Row, Col} from 'antd';
import Header from './Header';
import { Link, Redirect} from 'react-router-dom';
import '../../App.css';
import './payment.css'

function Payment() {
const userID = localStorage.getItem('KeyUser')
const [outPayment,setoutPayment ] = useState(false)
const user = JSON.parse(localStorage.getItem("InforUser"));
const totalPrice = localStorage.getItem("TotalPrice");
console.log(totalPrice, "total price");
const [dateOrder, setDateOrder] = useState('');
const [cart, setCart] = useState([])

useEffect(()=>{
    const today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setDateOrder(date);
    
    database.ref(`cart/${userID}`).on('value',(snapp)=>{
        var orderlist = snapp.val();
        if (orderlist) {
            const objectList = Object.keys(orderlist).map(key => ({
                ...orderlist[key],
                id: key
                })
            );
            setCart(objectList)
        }
    })
},[])

console.log(cart, "cart nè");

const orderProducts = ()=>{
        database.ref(`orderProducts/${userID}`).push({
            username: user.username,
            address: user.address,
            phone: user.phone,
            products:cart,
            dateOrder: dateOrder,
            totalPrice: totalPrice,
            status: 1
        });
        cart.map(item=>{
            removeItemCart(item.id);
         })
        cometoHome();
}
    const removeItemCart=(idProdt)=>{
        database.ref(`cart/${userID}`).child(idProdt).remove();
    }

    const cometoHome = () => {
        setoutPayment(true)
      }
      
      if (outPayment) {
        return <Redirect to='/'/>
      }
    return (
        <div className="contents">
            <div className="header">
                <Header />
            </div>
            <div className="contentPayment">
                <div className="contentDetail">
                    <div className="all_contents">
                        <Row  className="address">
                            <Col span={8}><p><strong>Số điện thoại: {user.phone}</strong></p></Col>
                            <Col span={8}><p><strong>Địa chỉ giao hàng:{user.address}</strong></p></Col>  
                        </Row>
                        <Row  className="contentDetailsss">
                            <Col span={3}> <h3><strong>Image</strong></h3></Col>
                            <Col span={10}><h3><strong>Name</strong></h3></Col>
                            <Col span={4}><h3><strong>Quantitys</strong></h3></Col>
                            <Col span={6}><h3><strong>Price</strong></h3></Col>
                        </Row>
                        {cart.map(item=>{
                            return (
                            <Row className="contentDetailsss" key={item.id}>
                                <Col span={3}> <h3><img width='100px' height='100px' src={item.avata} /></h3></Col>
                                <Col span={10}><h3>{item.name}</h3></Col>
                                <Col span={4}><h3> {item.quantitys}</h3></Col>
                                <Col span={6}><h3>{item.price}</h3></Col>
                            </Row>
                        )
                            })}
                         <Row  className="totalPrice">
                            <Col span={16}><p><h2><strong>Total price:</strong></h2></p></Col>
                            <Col span={8}><p><h2><strong>{totalPrice}</strong></h2></p></Col>
                        </Row>
                        <div className="buttonss">
                            <Row  className="">
                                <Col  className="coool" span={12}><button className="button1"><Link to="/">Trở lại</Link></button></Col>
                                <Col span={12}> <button className="button2" onClick={()=>orderProducts()}>Đặt hàng</button></Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    
    )
}
export default Payment;