import React,{useState, useEffect} from 'react'
import FormCheckout  from './FormCheckout'
import { database } from '../../firebase/Index';
import {Redirect} from 'react-router-dom'

function Checkout(){
  const [nameCustomer, setNameCustomer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [address, setAddress] = useState("");
  const [user, setUser] = useState({});
  const userID = localStorage.getItem('KeyUser')
  const [checkout,setCheckout ] = useState(false)

  useEffect(()=>{
    database.ref(`users/${userID}`).on('value',(snapp)=>{
      setUser(snapp.val());
   })
  },[])

  const saveInfor=(name,phone,address)=>{
    database.ref(`users/${userID}`).set({
      username: name,
      phone: phone,
      address: address,
      email: user.email,
    })
    cometoCheckout();
  }
  window.localStorage.setItem("InforUser", JSON.stringify(user));

  const cometoCheckout = () => {
    setCheckout(true)
  }
  
  if (checkout) {
    return <Redirect to='/Payment'/>
  }

console.log(user,"adjajdfalfjla");
  return (
    <div>
      {user.address? cometoCheckout(): 
      <div>
         <FormCheckout 
          nameCustomer={nameCustomer} 
          setNameCustomer={setNameCustomer}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          address={address}
          setAddress={setAddress}
          saveInfor={saveInfor}
      />
      </div>
      }
    </div>
  )
}
export default Checkout;
