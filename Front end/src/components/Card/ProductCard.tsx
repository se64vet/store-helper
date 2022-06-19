import styles from './ProductCard.module.scss'
import imgPlaceHolder100 from '../../assets/png/100.webp'
interface Props {
    product: {
    name: string,
    price?: number,
    sold?: number,
    category?: string,
    img?: {thumbnail: string}[]
}}
const ProductCard = ({product}: Props) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.cardImg}>
            <img src={product.img !== undefined
                        ? product.img[0].thumbnail
                        : imgPlaceHolder100} 
                alt={product.name} />
        </div>

        <div className={styles.cardText}>
            <h3 className={styles.cardText_title}>{product.name}</h3>
            <p className={styles.cardText_detail}>{`Price: ${product.price}`}</p>
            <p className={styles.cardText_detail}>{`Sold: ${product.sold}`}</p>
        </div>

    </div>
  )
}

export default ProductCard