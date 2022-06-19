import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import SimpleAreaChart from '../../components/Chart/SimpleAreaChart';
import styles from "./Sale.module.scss";
const Sale = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [today, setToday] = useState<Date>();

    useEffect(()=>{
       const date:Date = new Date(Date.now());
        setToday(date);
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

        : <main className={styles.sale} >
        <div className={styles.expensesCard}>
          {/* 1st Section */}
          <section className={styles.leftSection} style={{overflow: "hidden"}}>
            {/* Logo */}
            <div className={styles.header} style={{marginBottom: "2em"}}>
              <p className={styles.header_titel}>{today?.toDateString()}</p>
            </div>
           
            <div>
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
                <tbody>
                    <tr>
                    <td>test1</td>
                    <td>Jun 02</td>
                    <td>Pending</td>
                    <td>$189</td>
                    </tr>
                </tbody>
                </table>

            </div>
            <div>
                <button className={styles.primaryBtn}>Add New Order</button>
                <br />
                <button className={styles.secondaryBtn}>Edit | Delete</button>
            </div>
           
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






