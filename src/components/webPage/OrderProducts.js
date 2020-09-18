import { Modal, Row, Col, Button, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { database } from '../../firebase/Index'
import 'antd/dist/antd.css';
import '../../App.css';
import './Order.css';
import { Link } from 'react-router-dom'

function OrderProduct(props) {
    const [visible, setVisible] = useState(false);
    const { array } = props;
    const [edit, setEdit] = useState(true)
    const [arrayOrders, setArrayOrders] = useState(array);
    useEffect(() => {
        setArrayOrders(array);
    }, [array])
    const userID = localStorage.getItem('KeyUser')


    const showModal = () => {
        setVisible(true);
    };
    const handleOk = e => {
        setVisible(true);
        setEdit(false)
    }
    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    const totalPrice = () => {
        const total = arrayOrders.reduce((sum, { price, quantitys }) => parseInt(sum) + parseInt(price) * quantitys, 0);
        window.localStorage.setItem('TotalPrice', total)
        return total;
    }

    const deleteItemCart = (product) => {
        const id = product;
        database.ref(`cart/${userID}`).child(id).remove();
    }
    const clearCart = () => {
        database.ref(`cart/${userID}`).remove();
    }

    const tangSL = (idPro, quantities, quantity) => {
        let quantitiesInDatabse = parseInt(quantity);
        let ascendingQuantityItem = quantities;
        const listQuantityOrder = (arrayOrders || []).map(item => {
                if (item.id === idPro && ascendingQuantityItem < quantitiesInDatabse) {
                    ascendingQuantityItem++;
                    return {
                        ...item,
                        quantitys: ascendingQuantityItem
                    } 
                }
            return item
        })
        setArrayOrders(listQuantityOrder);
        UpdateProToCart(idPro,ascendingQuantityItem)  
    }
    const giamSL = (idPro, quantities) => {
        let reductionQuantityItem = quantities;
        const listQuantityOrder = (arrayOrders || []).map(item => {
            if (item.id === idPro && reductionQuantityItem > 1) {
                reductionQuantityItem--;
                return { ...item, quantitys: reductionQuantityItem }
            }
            else if(item.id === idPro && reductionQuantityItem==1){
                deleteItemCart(idPro)
            }
            return item
        })
        setArrayOrders(listQuantityOrder);
        UpdateProToCart(idPro,reductionQuantityItem)  
    }

    const UpdateProToCart = (productItem,valueQuantitys) =>{
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
                    let findProduct = objectListPr.find(item => item.id === productItem)
                    // is productItem true
                    if (findProduct) {
                        findProduct = {...findProduct, quantitys: valueQuantitys}
                        delete findProduct.id
                        database.ref(`cart/${userID}/${productItem}`).update(findProduct)
                    }
                } 
              });
        }
    }

    return (
        <div className="buttonUpdate">
            <ShoppingCartOutlined className='divIconCard' onClick={showModal} />
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                title="Order Product"
            >
                <div className="Contents">

                    <div>
                        <Row>
                            <Col span={12} >
                                <div className="Headermodal1">
                                    <Button><Link to="/"> Add New Product</Link></Button>
                                </div>
                            </Col>
                            <Col span={12} className="Headermodal2">
                                <div className="Headermodal2">
                                    <Button onClick={() => clearCart()}> clear cart</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className="Contentitems">
                            <Col span={5}>
                                <div className="Contentitem">
                                    Avata
                            </div>
                            </Col>
                            <Col span={6}>
                                <div className="Contentitem">
                                    Name
                            </div>
                            </Col>
                            <Col span={6}>
                                <div className="Contentitem">
                                    Price
                            </div>
                            </Col>
                            <Col span={5}>
                                <div className="Contentitem">
                                    Quantity
                            </div>
                            </Col>
                            <Col span={2}>
                                <div className="Contentitem">
                                    delete
                            </div>
                            </Col>
                        </Row>
                        {(arrayOrders || []).map(cartPro => {
                            console.log(cartPro, "99999999999999999999999999");
                            return (
                                <Row key={cartPro.id}>
                                    <Col span={5}><img width='60px' height='60px' src={cartPro.avata} /></Col><br />
                                    <Col span={6}>{cartPro.name}</Col><br />
                                    <Col span={6}>{cartPro.price}</Col><br />
                                    <Col span={5}>
                                        <button onClick={() => tangSL(cartPro.id, cartPro.quantitys, cartPro.quantity)}>+</button>
                                        {cartPro.quantitys}
                                        <button onClick={() => giamSL(cartPro.id, cartPro.quantitys)}>-</button>
                                    </Col><br />
                                    <Col span={2}><button onClick={() => deleteItemCart(cartPro.id)}>x</button></Col><br />
                                </Row>
                            )
                        })}
                        <Link to={{ pathname: '/Checkout', params: { array, totalPrice }}}>Mua hàng</Link>
                        <Row className="bottom">
                            <Col span={12}>
                                <div className="Headermodal1">
                                    Total:
                            </div>
                            </Col>
                            <Col span={12} className="Headermodal2">
                                <div className="Headermodal2">
                                    {totalPrice()}
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>

            </Modal>

        </div>
    );
}
export default OrderProduct;