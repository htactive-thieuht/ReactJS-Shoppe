import React, {component, useState, useEffect} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import { auth } from './firebase/Index'
import Homepage from './components/webPage/Homepage'
import Register from './components/Register'
import SignIn from './components/SignIn'
import ProductsList from './components/admin/ProductsList'
import Addproducts from './components/admin/AddProducts'
import Payment from './components/webPage/Payment'
import FormCheckout from './components/webPage/FormCheckout'
import Checkout from './components/webPage/Checkout'
import DetailProduct from './components/webPage/DetailProduct';
import Categories from './components/admin/Categories'
import AddCate from './components/admin/AddCate'
import SearchContent from './components/webPage/SearchContent';
import PurchaseOrder from './components/webPage/PurchaseOrder'
            


function App() {
  return (
    <div>
       {/* <BrowserRouter>
        <div className="contents">
          <div className="header">
            <Header />
          </div>
          <div className="slider">
            <SliderMain />
          </div>
          <div className="slider">
            <Menus />
          </div>
          <div className="content">
      
          <Route path='/' exact component={Content} />
          <Route path='/search/:keySearch' exact component={SearchContent} />
          <Route path='/Register' exact component={Register} />
          <Route path='/SignIn' exact component={SignIn} />
          <Route path='/ProductsList' exact component={ProductsList} />
          <Route path='/Addproducts' exact component={Addproducts} />
          <Route path='/Payment' exact component={Payment} />
          <Route path='/Checkout' exact component={Checkout} />
          <Route path='/DetailProduct' exact component={DetailProduct} />
          <Route path='/FormCheckout' exact component={FormCheckout} />
          <Route path='/Categories' exact component={Categories} />
          <Route path='/AddCate' exact component={AddCate} /> 
        
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter> */}
      <BrowserRouter>
        <Route  path= '/' exact component = {Homepage}/>
        <Route  path= '/Register' exact component = {Register}/> 
        <Route  path= '/SignIn' exact component = {SignIn}/> 
        <Route  path= '/ProductsList' exact component = {ProductsList}/>        
        <Route  path= '/Addproducts' exact component = {Addproducts}/> 
        <Route  path= '/Payment' exact component = {Payment}/> 
        <Route  path= '/Checkout' exact component = {Checkout}/> 
        <Route  path= '/DetailProduct' exact component = {DetailProduct}/> 
        <Route  path= '/FormCheckout' exact component = {FormCheckout}/> 
        <Route  path= '/Categories' exact component = {Categories}/>        
        <Route  path= '/AddCate' exact component = {AddCate}/>
        <Route path='/search/:keySearch' exact component={SearchContent} />
        <Route  path= '/PurchaseOrder' exact component = {PurchaseOrder}/> 
      </BrowserRouter>
    </div>
  );
}

export default App;
