import React from 'react'
import { Row, Col } from 'antd';
import './payment.css'
import Header from './Header';
import { Link, Redirect } from 'react-router-dom';

function FormCheckout(props) {
  const { saveInfor, nameCustomer, setNameCustomer, phoneNumber, setPhoneNumber, address, setAddress } = props;

  return (
    // <div>
    //   <h2></h2>
    //   <Row>
    //     <Col span={10}>
            // <input type='name' value={nameCustomer} placeholder='Họ và Tên'
            //     onChange={e => setNameCustomer(e.target.value)} />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col span={10}>
            // <input type='phone' value={phoneNumber} placeholder='Số điện thoại'
            //     onChange={e => setPhoneNumber(e.target.value)} />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col span={10}>
            // <input type='address' value={address} placeholder='Địa chỉ'
            //     onChange={e => setAddress(e.target.value)} />
    //     </Col>
    //   </Row>
    //   <button onClick={()=>saveInfor(nameCustomer,phoneNumber,address)}>Hoàn thành</button>
    // </div>

    <div className="contents">
      <div className="header">
        <Header />
      </div>
      <div className="contentPayment">
        <div className="contentDetail">
          <div className="all_contents">
            <Row className="address">
              <Col span={8}><p><strong>THÔNG TIN HÀNG HÀNG</strong></p></Col>
            </Row>
            <Row className="contentcheckout">
            {/* <p><strong>Mời nhập thông tin của bạn</strong></p> */}
                  <Col className="information" span={24}>
                      <input className="input" type='name' value={nameCustomer} placeholder='Họ và Tên'
                      onChange={e => setNameCustomer(e.target.value)} />
                      <br/><p></p>
                        <input className="input" type='phone' value={phoneNumber} placeholder='Số điện thoại'
                        onChange={e => setPhoneNumber(e.target.value)} />
                      <br />
                        <input className="input" type='address' value={address} placeholder='Địa chỉ'
                        onChange={e => setAddress(e.target.value)} />
                </Col>
            </Row>
            <div className="buttonss">
              <Row className="">
                <Col className="coool" span={12}><button className="button1"><Link to="/">Trở lại</Link></button></Col>
                <Col span={12}> <button onClick={() => saveInfor(nameCustomer, phoneNumber, address)} className="button2">Hoàn Thành</button></Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormCheckout;