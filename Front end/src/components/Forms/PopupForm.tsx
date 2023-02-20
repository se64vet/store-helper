// libaries
import React, { useEffect, useState } from 'react'
// styles & interfaces
import styles from './PopupForm.module.scss'
import {Product} from '../../pages/AllItems/AllItems'
// components
import Dropdown from './Dropdown'
//  apis
import {getProducts} from '../../API/api'

export interface orderProduct extends Product {
  qty: number,
  finalPrice: number,
}
interface popupFormProps {
  disable: (...args:any) => void,
  addOrder: (...args:any) => void,
}
const PopupForm = ({disable, addOrder}:popupFormProps) => {
  const [items, setItems] = useState<Product[]>()
  const [order, setOrder] = useState<orderProduct[]>([])
  let total = 0;
  order.forEach((item:orderProduct)=> total+= item.finalPrice)
  const fetchItems = async()=>{
    try {
      const query = "select=name,img,price&sort=-createdAt"
      await getProducts(query).then((res) => setItems(res))
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnChoose = (e:Event, item:Product)=>{
      if(order.length <=0 ){
        let tempOrder:orderProduct[] = Array.from(order!);
        let fPrice = item.price;
        const newItem = {...item, qty:1, finalPrice: fPrice!}
        tempOrder.push(newItem)
        setOrder(tempOrder);
      }
      else{
        let tempOrder:orderProduct[] = Array.from(order!);
        const idx = tempOrder.findIndex((product)=> product._id == item._id);
        if(idx != -1){
          tempOrder[idx].qty++
          tempOrder[idx].finalPrice = tempOrder[idx].price! * tempOrder[idx].qty
        }
        else{
          const newItem = {...item, qty:1, finalPrice: item.price!}
          tempOrder.push(newItem)
        }
        setOrder(tempOrder);
      }

  }
  const handleRemoveItem = (item:Product)=>{
      const idx = order.findIndex((product)=> product._id == item._id);
      let tempOrder:orderProduct[] = Array.from(order!);
      tempOrder.splice(idx,1);
      setOrder(tempOrder)
  }

  const updateOrderItem = (e:React.ChangeEvent<HTMLInputElement>, item:orderProduct) => {
      let newQty:number = Number(e.target.value);
      if(newQty == 0){
        return
      }
      const idx = order.findIndex((product)=> product._id == item._id);
      let tempOrder:orderProduct[] = Array.from(order!);
      tempOrder[idx].qty = newQty;
      tempOrder[idx].finalPrice = tempOrder[idx].price! * tempOrder[idx].qty
      console.log(tempOrder)
      setOrder(tempOrder);
  }
  const closePopupOnESC = (event:React.KeyboardEvent<HTMLDivElement>)=>{
    if (event.key === "Escape") {
      disable(false);
    }
  }
  useEffect(()=>{
    fetchItems();
  },[])
  return (
    <div className={styles.popupForm}>
        <Dropdown itemList={items} handleOnChoose={handleOnChoose}/>
        <div className={styles.cartWrapper}>
         <div className={styles.cartItems}>
            <div className={styles.cartHeading}>
              <div className={styles.headName}><span>Item</span> <span>Qty</span></div> 
              <span>Price</span>
            </div>
            <hr />
            {order.length <=0 ? <h4>No item</h4> : order.map((item, idx)=>(
              
              <div key={idx} className={styles.cartItem}>
                  <div className={styles.itemName} onClick={()=>handleRemoveItem(item)}>
                    <img src={item.img ? item.img[0].thumbnail : "https://via.placeholder.com/40 "} alt="item image" />
                    <span>{item.name}</span>
                  </div>
                  <div className={styles.itemQty}>
                    <input type="number" value={item.qty} size={1} maxLength={3} onChange={(e)=>updateOrderItem(e, item)}/>
                  </div>
                  <span className={styles.itemInfo}>{item.finalPrice.toFixed(2)}</span>
              </div>
              
            ))}
         </div>
         {order.length > 0 && <div style={{textAlign:"center"}}>Click on item to remove it.</div>}
         <div className={styles.cartTotal}>
          <div>Total</div>
          <div>${total.toFixed(2)}</div>
         </div>
        </div>
        <div style={{margin: "1em 0 0 0"}}>
          <button className={styles.primaryBtn} onClick={()=>addOrder(order, total)}>Add New Order</button>
          <br />
          <button className={styles.secondaryBtn} onClick={()=>disable(false)}>Cancel</button>
        </div>
    </div>
  )
}

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

export default PopupForm
