//  libaries
import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import SimpleAreaChart from '../../components/Chart/SimpleAreaChart';
//  styles 
import styles from "./Sale.module.scss";
//  components
import PopupForm, { orderProduct } from '../../components/Forms/PopupForm';
//  apis
import {createNewInvoice, getInvoices, removeInvoice, updateInvoice} from "../../API/saleApi"

interface Invoice {
  amount: number,
  status: string,
  items: {item: string, qty: number}[]
}

const Sale = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [invoices, setInvoices] = useState<any[]>([])
    const [today, setToday] = useState<Date>();
    const [newInvoicePopup, setNewInvoicePopup] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const fetchInvoices = async()=>{
      await getInvoices()
      .then((response)=>{
        setInvoices(response);
      })
    }
    const closePopupOnESC = (event:React.KeyboardEvent<HTMLDivElement>)=>{
      if (event.key === "Escape") {
        setNewInvoicePopup(false);
      }
    }
    const createInvoice = async(products:orderProduct[], total:number)=>{
      let newInvoice:Invoice = {
        amount: total,
        status: "pending",
        items: []
      }
      products.forEach((product)=>{
        let temp:any = {item: product._id, qty: product.qty};
        newInvoice.items.push(temp);
      })
      await createNewInvoice(newInvoice)
      setNewInvoicePopup(false);
      fetchInvoices()
    }
    const updateInvoiceStatus = async(e:React.ChangeEvent<HTMLSelectElement>, invoice:any)=>{
      const newStatus = e.target.value;
      await updateInvoice({status: newStatus},invoice._id);
      fetchInvoices()
    }
    const deleteInvoice = async(invoice:any)=>{
      console.log(invoice._id)
      await removeInvoice(invoice._id);
      fetchInvoices();
    }
    useEffect(()=>{
      const date:Date = new Date(Date.now());
      setToday(date);
      setLoading(true)
      fetchInvoices();
      setLoading(false)
    }, [])
  return (
    <>
    {loading 
        ? 
        <main className={styles.sale}> 
        <ReactLoading
          type={"bars"}
          color={"salmon"}
          height={100}
          width={100}
        />
        </main>

        : <main className={styles.sale}>
        <div className={styles.expensesCard} onKeyDown={(e)=>closePopupOnESC(e)}>
          {/* 1st Section */}
          <section className={styles.leftSection} style={{overflow: "hidden"}}>
            {/* Logo */}
            <div className={styles.header} style={{marginBottom: "2em"}}>
              <p className={styles.header_titel}>{today?.toDateString()}</p>
            </div>
           
            <div className={styles.recentOrdersWrapper}>
                <p>Recent orders</p>

                <table className={styles.generatedTable}>
                <thead>
                    <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                {invoices.length > 0  && invoices.map((invoice, idx)=> (
                  <tbody key={idx}>
                    
                    <tr>
                    <td style={{position: "relative"}}>
                      {isDelete && 
                        <span 
                          style={{position: "absolute", left: "0", cursor: "pointer"}} 
                          onClick={()=>{deleteInvoice(invoice)}}>
                          ❌
                        </span>}
                      <span> {invoice._id.slice(-4)}</span>
                    </td>
                    <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select name="status" 
                        value={invoice.status} 
                        className={styles.selectBox} 
                        onChange={(e)=>updateInvoiceStatus(e, invoice)}>
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td>${invoice.amount}</td>
                    </tr>
                </tbody>
                ))}
                </table>

            </div>
            <div className={styles.buttonsWrapper}>
                <button className={styles.primaryBtn} onClick={()=>setNewInvoicePopup(true)}>Add New Order</button>
                <br />
                <button className={styles.secondaryBtn} onClick={()=>setIsDelete(!isDelete)}>Delete</button>
            </div>
            
            {newInvoicePopup &&
            <div className={styles.popup} >
              <div className={styles.popupBlocker} onClick={()=>setNewInvoicePopup(false)}></div>
              <PopupForm disable={setNewInvoicePopup} addOrder={createInvoice}/>
            </div>
            }
            

          </section>

          {/* Right section */}
          <section className={styles.rightSection}>   
            selling chart
            <SimpleAreaChart />
          </section>
        </div>
      </main>}
    </>
  )
}

export default Sale






