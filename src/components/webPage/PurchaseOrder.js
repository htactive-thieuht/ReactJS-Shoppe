import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import Header from './Header';
import '../../App.css';
import './payment.css'
import { database, auth } from '../../firebase/Index';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

function PurchaseOrder() {
  const InforUser = JSON.parse(localStorage.getItem("InforUser"));
  const [viewOrders, setViewOrders] = useState([]);
  const userID = localStorage.getItem('KeyUser')
  useEffect(() => {
    let ref = database.ref(`orderProducts/${userID}`);
    ref.on('value', snapshot => {
      var orderlist = snapshot.val();
      if (orderlist) {
        const objectList = Object.keys(orderlist).map(key => ({
          ...orderlist[key],
          id: key
        })
        );
        setViewOrders(objectList.filter(item => item.status === 1))
      }
    });
  }, []);
  return (
    <div className="contents">
      <div className="header">
        <Header />
      </div>
      <div className="contentPayment">
        <div className="contentDetail">
          <div className="all_purchaseOder">
            <Col span={4}>{InforUser.username}</Col>
            <Col span={20}>
              <div>
                <Row className="address">
                  <Col span={4}><p><strong>Tất cả</strong></p></Col>
                  <Col span={4}><p><strong>Chờ xác nhận</strong></p></Col>
                  <Col span={4}><p><strong>Chờ lấy hàng</strong></p></Col>
                  <Col span={4}><p><strong>Đang giao</strong></p></Col>
                  <Col span={4}><p><strong>Đã nhận hàng</strong></p></Col>
                  <Col span={4}><p><strong>Đã hủy</strong></p></Col>
                </Row>
                {viewOrders.map((item) => {
                  return (
                    <Row className="contentDetailsss" key={item.id}>
                      <Col span="24"> Mã đơn hàng: {item.id}</Col>
                      {item.products.map(items => {
                        return (
                          <Col span={24}>
                            <div>
                              <Row key={items.id}>
                                <Col span={4}><img width='60px' height='60px' src={items.avata} /></Col><br />
                                <Col span={6}>{items.name}</Col><br />
                                <Col span={2}> x </Col><br />
                                <Col span={3}>{items.quantitys}</Col><br />
                                <Col span={4}>{items.price}</Col><br />
                                <Col span={5}>Total price: {item.totalPrice} VND</Col><br />
                              </Row>
                            </div>
                          </Col>
                        ) })}<br />
                    </Row>
                  )
                })}<br />
              </div>
            </Col>
          </div>
        </div>
      </div>
    </div>

    //  <div className=''>
    //    <Row>
    //     
    //    </Row>

    //    <Row>
    // {viewOrders.map((item)=>{
    //   return (
    //           <div key={item.id}>
    //                <Col span={12}>Mã đơn hàng: {item.id}</Col><br />
    //             {item.products.map(items=>{
    //                 return(
    //                   <Row key={items.id}>
    //                     <Col span={6}><img width='60px' height='60px' src={items.avata} /></Col><br />
    //                     <Col span={6}>{items.name}</Col><br />
    //                     <Col span={6}>
    //                         {items.quantitys}
    //                     </Col><br />
    //                     <Col span={6}>{items.price}</Col><br />
    //                   </Row>
    //                 )
    //             })}<br/>
    //             <Col span={12}>Total price: {item.totalPrice} VND</Col><br />
    //           </div>
    //         )
    //       })}
    //   </Row>
    //  </div>
  )
}
export default PurchaseOrder;