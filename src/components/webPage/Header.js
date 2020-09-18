import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { database, auth } from '../../firebase/Index'
import OrderProduct from './OrderProducts'
import { Menu, Dropdown, Button } from 'antd';

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://shopee.vn/user/purchase/">
          Tài khoản của tôi
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://shopee.vn/user/purchase/">
        <Link to="/PurchaseOrder"> Đơn mua</Link>
        </a>
      </Menu.Item>
    </Menu>
  );
const { Search } = Input;
const sty = {
    color: '#e5380c'
}
function Header(props) {
    const [user, setUser] = useState(null)
    const [array, setArray] = useState([]);
    const userID = localStorage.getItem('KeyUser')
    const userEmail = window.localStorage.getItem('EmailUser');
    const [valueSearch,setValueSearch]=useState(null)
    const logout = () => {
        auth.signOut().then(function () {
            window.localStorage.setItem('KeyUser', '');
            window.localStorage.setItem('EmailUser', '');
            window.localStorage.setItem('arrayCart', '');
            window.localStorage.setItem('InforUser', '');
            window.localStorage.setItem('TotalPrice', '');
            setArray([]);
        }, function (error) {
            alert('logout không thành công')
        });
    }
    useEffect(() => {
        if(userID){
            const cartProduct = database.ref(`/cart/${userID}`);
            cartProduct.on('value', snapshot => {
                const valueCart = snapshot.val();
                if (valueCart) {
                    const objectListPr = Object.keys(valueCart).map(key => ({
                        ...valueCart[key],
                        id: key
                    }));
                    setArray(objectListPr)
                }
            });
        }else{
            console.log("flase");
        }
     
    }, []);
    window.localStorage.setItem("arrayCart", JSON.stringify(array));
    const changeTosearchPage=(value)=>{

    }
    return (
        <div className="contents_Header">
            <Row className="center">
                <Col span={12} >
                    <div class="vertical-menu">
                        <a href="#home">Kênh người bán</a>
                        <a href="#home">Tải ứng dụng</a>
                        <a href="#home">Kết nối</a>
                        <a href="#home"> instagram</a>
                    </div>
                </Col>
                <Col span={12}>
                    {userEmail ?
                        <Row className="center-top">
                            <Col span={24}>
                                <div>
                                    <div class="vertical-menu">
                                        <a href="#home">Thông báo </a>
                                        <a href="#home">Trợ giúp </a>
                                        <a className="userCurrunt">
                                            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                                <p>{userEmail}</p>
                                            </Dropdown>
                                        </a>
                                        <a onClick={logout}>Đăng Xuất</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        :
                        <Row className="center-top">
                            <Col span={24}>
                                <div>
                                    <div class="vertical-menu">
                                        <a href="#home">Thông báo </a>
                                        <a href="#home">Trợ giúp </a>
                                        <Link to="/Register"> Đăng ký </Link>
                                        <Link to="/SignIn"> Đăng nhập </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
            <Row className="center ">
                <Col span={6}>
                    <Link to="/"><img className="logo" src="y-nghia-logo-shopee.jpg" width="200px" height="150px"></img></Link>
                </Col>
                <Col span={12}>
                    <Link to={{ pathname: '/search/:keySearch', params: { valueSearch } }}>
                        <Search style={sty} placeholder="input search text"  onChange={e => setValueSearch(e.target.value)} onSearch={value => console.log(value, 'dasdasd')} />
                    </Link>
                    <div class="vertical-menu">
                        <a href="#home">Đầm nữ </a>
                        <a href="#home">sandal nữ </a>
                        <a href="#home">Dép nam</a>
                        <a href="#home"> Dép nữ</a>
                        <a href="#home">Áo thể thao</a>
                        <a href="#home"> Áo dài </a>
                        <a href="#home">Mũ</a>
                        <a href="#home"> Giày thể thao </a>
                    </div>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={5}> <OrderProduct array={array}  {...useEffect} /></Col>
                        <Col span={6}> {array.length}</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default Header;

