import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input,Carousel } from 'antd';
import { database, auth } from '../../firebase/Index'

function Menus() {
    const [cate, setCate] = useState([]);
    const fetchData = async () => {
        let ref = await database.ref('/categories');
        ref.on('value', snapshot => {
            var state = snapshot.val();
            if (state) {
                const objectList = Object.keys(state).map(key => ({
                    ...state[key],
                    id: key
                }));
                setCate(objectList)
            }
        });
    }
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <div className="slidersMenu">
            <Row className="danhmuc">
            <Col span={24} >
                    {cate.map(item => {
                        return (
                    <div class="vertical-menus" key={item.id}>
                        <a href="#home">
                            <div className="menucons">
                                <img width="70px" height="50px" src={item.image}></img>
                            <div> {item.name}</div>
                            </div>
                        </a>
                     </div>
                       )})
                    }
                    </Col>
            </Row>
            <Row className="slideCon">
                <Col className="slideCon" span={24}>
                    <img className="sss" width="100%" height="100%" src="https://minhduongads.com/wp-content/uploads/2019/09/thiet-ke-banner-dep-quang-cao-online-minh-duong1-9.jpg" ></img> 
                </Col>
            </Row>
        </div>

    )
}
export default Menus;
