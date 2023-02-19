import styles from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import optionIcon from "../../assets/png/menuIcon.png";
import boxes from "../../assets/png/boxes.png";
import plant from "../../assets/png/plant.png";
import { getProducts } from "../../API/api";
import Chart from "../../components/Chart/Chart";
import ProductList from "../../components/List/ProductList";
import { Link } from "react-router-dom";

interface Product {
  name: string,
  price?: number,
  sold?: number,
  createdAt?: string,
  img?: {thumbnail: string}[]
}

export default function Dashboard() {
  const [loading, setLoading] = useState<Boolean>(true)
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);

  const data = [
  {
    month: "Jan",
    totalSale: 3000,
  },
  {
    month: "Feb",
    totalSale: 7000,
  },
  {
    month: "Mar",
    totalSale: 3000,
  },
  {
    month: "Apr",
    totalSale: 4000,
  },
  {
    month: "May",
    totalSale: 5500,
  },
  {
    month: "Jun",
    totalSale: 3000,
  },
  {
    month: "Jul",
    totalSale: 7000,
  },
  {
    month: "Aug",
    totalSale: 8000,
  },
  {
    month: "Sep",
    totalSale: 12000,
  },
  {
    month: "Oct",
    totalSale: 10000,
  },
  {
    month: "Nov",
    totalSale: 6000,
  },
  {
    month: "Dec",
    totalSale: 7800,
  },
  ];

  const queryProducts = async (query:string="", setState: (data:any)=>void)=>{
    const response = await getProducts(query);
    setState(response);
  }

  useEffect(()=>{  
    let isSubcription:boolean = true;
    try {
      if(isSubcription){
        setLoading(true)
        const newProductsQuery : string = "select=name,img,price,createdAt&limit=3";
        queryProducts(newProductsQuery, setNewProducts);
        const bestSellingProductsQuery : string = "sort=-sold&select=name,sold&limit=5";
        queryProducts(bestSellingProductsQuery, setBestSellingProducts);
        setLoading(false);
      }
      
    } catch (error) {
        if(!isSubcription){
          console.log('something wrong happened!');
          
        }
    }

    return ()=>{isSubcription = false}
    
  },[])

  
  return (
    <>
      {loading 
        ? 
        <main className={styles.expenses}> 
        <ReactLoading
          type={"bars"}
          color={"salmon"}
          height={100}
          width={100}
        />
        </main>
        : <main className={styles.expenses}>
        <div className={styles.expensesCard}>
          {/* left column */}
          <section className={styles.expensesOverview}>

            {/* Logo */}
            <div className={styles.expensesHeader}>
              <p className={styles.expensesTitle}>Store Wise</p>
              <p>Store management system</p>
            </div>

            {/* Revenue Chart */}
            <Chart title={"Revenue Last 12 Months"} data={data}/>

            {/* New product List */}
            <div className={styles.expensesOverviewHeader}>
              <p className={styles.expensesOverviewTitle}>Recently Added Items</p>
              <Link to={"/All Items"}><button style={{cursor:"pointer"}}>See All</button></Link>
            </div>
            {newProducts.length === 0 
             ? <p className={styles.dateRange}>You don't have any product. Create one!</p>
             :  <ProductList products={newProducts} />
            }

            {/* Sale last 3 months */}
            <div className={styles.expensesOverviewHeader}>
              <p className={styles.expensesOverviewTitle}>
                Sale Last Months
              </p>
              <button>
                <img className={styles.expenseOption} src={optionIcon} alt="options"/>
              </button>
            </div>

            <ul>
              {data.map((month, idx) => (
                idx > (data.length - 4) && 
                <li className={styles.expenseItem} key={idx}>
                <div className={styles.expenseItemLeft}>
                  <div
                    style={{ border:  `2px solid #${Math.floor(Math.random()*4409).toString(16)}`}}
                    className={styles.expenseItemDiv}
                  >
                    {"2022"}
                  </div>
                  <div className={styles.expenseItemDetails}>
                    <p className={styles.expenseItemTitle}>
                      {month.month}
                    </p>
                  </div>
                </div>
                <p className={styles.expenseItemPrice}>
                  {"$" + month.totalSale}
                </p>
              </li>
              ))}
            </ul>
          </section>

        {/* right column */}
          {/* Best selling */}
          <section className={styles.moneyOverview}>
            <p className={styles.moneyOverviewTitle}>Best Sell Items</p>
            {bestSellingProducts.length !== 0
              ? <BestSelling products={bestSellingProducts}/>
              : <p>You haven't any products</p>
            }

            {/* tips */}
            <Tips/>
          </section>
        </div>
      </main>}
    </>
  );
}
export function Tips(){
  return(
    <div className={styles.saveMoneyDiv}>
      <img className={styles.boxes} src={boxes} alt="boxes" />
      <img className={styles.plant} src={plant} alt="plant" />
      <p className={styles.saveMoneyTitle}>Your Store looks great!</p>
      <p className={styles.saveMoneyInfo}>
        Continue to track your bussiness. Don’t lose sight of the bigger picture.
      </p>
      <button className={styles.button} type="button">
        VIEW TIPS
      </button>
    </div>
  )
}
interface BestSellingProps {
  products: Product[],
}
function BestSelling({products}: BestSellingProps) {
  return (
    <>
    <ul>
      {products.map((product:any) => (
        <li key={product._id}>
          <div className={styles.spendCategory}>
            <p className={styles.spendCategoryName}>
              {product.name}
            </p>
            <p className={styles.spendCategoryPrice}>
              {product.sold}
            </p>
          </div>
          <div className={styles.spendCategoryBar}>
            <div
              style={{
                width: `${
                  (product.sold / products.reduce(
                      (acc:any, current:any) => acc + current.sold, 0
                  )) * 100
                }%`,
              }}
              className={styles.spendCategoryColoredBar}
            ></div>
          </div>
        </li>
      ))}
    </ul>
    </>
  )
}