
import React, { useState } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import '../../App.css'

function Page() {
    const [listData, setListData]= useState([]);
    return (
        <div className="contents">
            <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
    renderItem={item => (
      <List.Item
      >
        
        {item.content}
      </List.Item>
    )}
  />  
        </div>
    )
}
export default Page;
