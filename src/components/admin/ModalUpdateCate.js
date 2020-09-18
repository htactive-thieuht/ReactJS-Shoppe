import { Modal, Row, Col, Input } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';


function ModalUpdateCate(props) {
    const [visible, setVisible] = useState(false);
    const {cateId, nameCate ,updateCate, image } = props; 
    const [names, setValueNames] = useState(nameCate);

    const showModal = () => {
        setVisible(true);
    };
    const handleOk = e => {
        updateCate(cateId, nameCate);
        setVisible(false);
    }
    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };
    return (
        <div className="buttonUpdate">
            <button onClick={showModal}>Update category</button>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                title="UPDATE PRODUCT"
            >
                <div className="content">
                    <Row className="ac">
                        <Col span={12}>
                            <div className="card">
                                <h4>IMAGE OF CATEGORY</h4>
                                <img src={image} width="100%"></img>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="card">
                                <div className="container">
                                    <h4> UPDATE CATEGORY INFOMATION</h4>
                                    <br/>
                                    category name:
                                    <Input
                                        placeholder="Type here for Product name"
                                        value={names}
                                        onChange={e => setValueNames(e.target.value)}
                                    />
                                    <p/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    );
}
export default ModalUpdateCate;