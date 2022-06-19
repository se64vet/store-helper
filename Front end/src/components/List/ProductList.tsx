import { Suspense }  from 'react';
import styles from "../../pages/Dashboard/Dashboard.module.scss";
import imgPlaceHolder100 from '../../assets/png/100.webp'
interface Product {
  name: string,
  price?: number,
  sold?: number,
  createdAt?: string,
  img?: {thumbnail: string}[]
}

interface ListProps{
  products: Product[],
  onItemClick?: (...args:any) => void, 
  withBadge?: boolean
}
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
function dateDiffInDays(date:Date | any) {
  // Discard the time and time-zone information.
  const today = new Date();
  date = new Date(date);
  const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}
const ProductList = ({products, onItemClick, withBadge=false} : ListProps) => {
  return (
    <>
    <ul>
        {products.map((product:Product, idx :number) => (
            <Suspense key={idx+"3tyf5ve"} fallback={()=>(<p>loading...</p>)}>
              <SingleProduct onItemClick={onItemClick} withBadge={withBadge} product={product}/>
            </Suspense>
        ))}
    </ul>
    </>
  )
}

export default ProductList

interface ProductProps{
  product: Product,
  onItemClick?: (...args:any) => void, 
  withBadge?: boolean
}

const SingleProduct = ({onItemClick, withBadge, product}: ProductProps)=>{
  return(
    <li className={onItemClick? styles.hoverItem : styles.expenseItem}  
                onClick={()=> onItemClick? onItemClick(product) : ""}
                >
                <div className={styles.expenseItemLeft}>
                   <div className={styles.expenseItemDiv}>
                     <img 
                     className={styles.itemThumbnail} 
                     src={product.img 
                        ? product.img[0].thumbnail 
                        : imgPlaceHolder100} 
                     alt={product.name} 
                     loading='lazy'
                     />
                   </div>
                   <div className={styles.expenseItemDetails}>
                     <p className={styles.expenseItemTitle}> {product.name} </p>
                     {withBadge 
                      ? (dateDiffInDays(product.createdAt) < 2 
                        && <p className={styles.expenseItemTime} style={{color: "green"}}>
                          {"New"}
                          </p>)

                      : <p className={styles.expenseItemTime}>
                        { product.createdAt && new Date(product.createdAt).toDateString()}
                        </p>
                      }   
                   </div>
                 </div>
                 <p className={styles.expenseItemPrice}>
                   {`$${product.price ? product.price.toFixed(2) : "--"}`}
                 </p>
            </li>
  )
}