import React, { useState, useEffect } from 'react'
import { database } from '../../firebase/Index';
import { Row, Col } from 'antd';
import ModalUpdateCate from './ModalUpdateCate'
import { Link} from 'react-router-dom';

function Categories(){
  const [category, setCategory] = useState([])


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
            setCategory(objectList)
        }
    });
  },[])
  
  const updateCate = (cateId, name) => {
    const idKey = cateId;
    database.ref('categories').child(idKey).update({
        name: name
    });
}

const onDeleteCate = (key) => {
    const idKey = key;
    database.ref('categories').child(idKey).remove();
}
  return(
    <div>
        <Row>
          <Col span={24}>
              <div className='divDataMana'>
                  <div className='divTable'>
                      <h2>Management categories</h2>
                      <p></p>
                      <button><Link to='/AddCate'/></button>
                      <table className='' >
                          <tr>
                              <th>Image category</th>
                              <th>Name Category</th>
                              <th colspan="2">Action</th>
                          </tr>
                          {category.map(itemcate => {
                              return (
                                  <tr key={itemcate.id}>
                                      <td><img width="60px" height="40px" src={itemcate.image}/></td>
                                      <td>{itemcate.name}</td>
                                      <td><ModalUpdateCate
                                        nameCate = {itemcate.name}
                                        cateId = {itemcate.id}
                                        updateCate={updateCate}
                                        image = {itemcate.image}
                                      /></td>
                                      <td><button onClick={()=>{onDeleteCate(itemcate.id)}}>Delete category</button></td>
                                  </tr>
                              )
                          })}
                      </table>
                  </div>
              </div>
          </Col>
        </Row>

    </div>
  )
}
export default Categories;