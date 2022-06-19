import React, { useState, useEffect, Suspense } from 'react';
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../API/api";
import ReactLoading from 'react-loading';
import styles from './AllItems.module.scss';
import { ProductForm } from '../../components/ProductForms/ProductForms';
import { Tips } from '../Dashboard/Dashboard';
const ProductCard = React.lazy(()=>import ('../../components/Card/ProductCard')) ;
const ProductList = React.lazy(() =>import ('../../components/List/ProductList'));

interface Product {
    _id?: any,
    name: string,
    price?: number,
    sold?: number,
    category?: string,
    img?: {thumbnail: string}[]
}
interface inputFields {
    label: string,
    type: string,
    name: string,
    value?: string | number
}
const initialForm : inputFields[] = [
    {
     label: "Product's name:",
     type: 'text',
     name: "name",
     value: ""  
    },
    {
     label: "Category:",
     type: 'text',
     name: "category" ,
     value: ""  
    },
    {
     label: "Price:",
     type: 'number',
     name: "price" ,
     value: ""  
    },
    {
     label: "Img URL:",
     type: 'link',
     name: "img"  ,
     value: ""  
    }

]

const AllItems = () => {
    const [loading, setLoading] = useState<boolean>(true);
    // store fetch data
    const [products, setProducts] = useState<Product[]>([]);
    const [toggleEditForm, setToggleEditForm] = useState<boolean>(false);
    const [toggleAddForm, setToggleAddForm] = useState<boolean>(false);
    // props for product edit form
    const [editProduct, setEditProduct] = useState<inputFields[]>(initialForm);
    // props for display <ProductCard />
    const [productCard, setProductCard] = useState<Product>({name: ""});
    // add or update product
    const [modifiedProduct, setModifiedProduct] = useState<Product>({name: ""}); 

    const queryProducts = async (query:string="", setState: (data:any)=>void)=>{
        const response = await getProducts(query);
        setState(response);
        setLoading(false);
      }

    const handleItemClick = (product:Product) => {
        const editForm = JSON.parse(JSON.stringify(initialForm));
        for(let field of editForm ) {
            switch (field.name) {
                case "name":
                    field.value = product.name
                    break;
                case "category":
                    field.value = product.category
                    break;
                case "price":
                    field.value = product.price
                    break;
                case "img":
                    field.value = product.img ? product.img[0].thumbnail : ""
                    break;
                default:
                    break;
            }
        }
        setEditProduct(editForm);
        setProductCard(product);
        setToggleAddForm(false);
        setToggleEditForm(true);
    }

    const handleOnProductChange = (e:any) => {
        const {name, value} = e.target;
        // update Editform
        const index = editProduct.findIndex((element)=> element.name === name)
        const newEditProduct = [...editProduct];
        newEditProduct[index] = {
            ...newEditProduct[index],
            value
        }
        setEditProduct(newEditProduct);

        // save to modified product, ready to send request update/add to server
        if(name === "img"){
            setModifiedProduct({
                ...modifiedProduct,
                [name]: [{"thumbnail": value}]
            })
        }else{
            setModifiedProduct({
                ...modifiedProduct,
                [name]: value
            })
        }
    }

    const handleAddItem = async() => {
        const response:any = await createProduct(modifiedProduct);
        console.log(response.status, response.statusCode, response.data);
        setToggleAddForm(false);
        fetchData()
    }
    const handleUpdateItem = async() => {
        const response:any = await updateProduct(productCard._id,modifiedProduct);
        console.log(response.status, response.statusCode, response.data);
        setToggleEditForm(false);
        products.unshift(response.data.product);
        fetchData()
    }
    const handleDeleteItem = (productForm:inputFields[]) => {
        const formIndex = productForm.findIndex(element => element.name === "name");
        const productName = productForm[formIndex].value;
        const productIndex = products.findIndex(element => element.name === productName);
        const response = deleteProduct(products[productIndex]._id);

        setToggleEditForm(false);
        fetchData();
        console.log(response);
    }

    // fetch data 
    function fetchData(){
        const newProductsQuery : string = "select=name,img,price,category,sold,createdAt&sort=-createdAt";
        queryProducts(newProductsQuery, setProducts);
    }
    useEffect(()=>{
        try {
                fetchData();
                setLoading(false)
            
        } catch (error) {
            console.log(error);  
        }
        return ()=>{
        }
        
      },[])

    // set initial item to display <ProductCard />
    useEffect (()=>{
        if(products.length > 0){
            setProductCard(products[0])
        }else{
            const temp:Product =  {
                name: "",
                price: 0,
                sold: 0,
                img: [{thumbnail: ""}]
            }
            setProductCard(temp)
        }
    }, [products])
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

        : <main className={styles.expenses} >
        <div className={styles.expensesCard}>
          {/* 1st Section */}
          <section className={styles.expensesOverview} style={{overflow: "hidden"}}>
            {/* Logo */}
            <div className={styles.expensesHeader} style={{marginBottom: "2em"}}>
              <p className={styles.expensesTitle}>All Items</p>
            </div>
            {/* product Card */}
            <div style={{marginBottom: "1em"}}>
                <Suspense fallback={
                <ReactLoading
                type={"spin"}
                color={"salmon"}
                height={100}
                width={100}
                />}>
                    <ProductCard product={productCard}/>
                </Suspense>   
            </div>
            
            {/* product List */}
            <div className={styles.productList}>
            <Suspense fallback={
                <ReactLoading
                type={"spin"}
                color={"salmon"}
                height={100}
                width={100}
                />}>
                {products.length !== 0
                ? <ProductList products={products} onItemClick={handleItemClick} withBadge/>
                : <p style={{overflow: "hidden"}}>You don't have any product, create one!</p>
                }
            </Suspense>
            </div>
            
            {/* Button for add new product */}
            <div style={{marginTop: "2em"}}>
                <button 
                className={styles.primaryBtn}
                onClick={()=> {
                    setEditProduct(initialForm);
                    setToggleAddForm(true);
                    setToggleEditForm(false);
                }}>
                Add new items
                </button>
            </div>
          </section>

          {/* Right section */}
          <section className={styles.moneyOverview}>   
            {/* edit form */}
            {toggleEditForm && 
            <>
            <button className={styles.moneyOverviewTitle}>Edit item</button>
            <div>
                <ProductForm 
                inputFields={editProduct}
                handleOnChange={handleOnProductChange} 
                submitBtn={"Save changes" }
                handleOnSubmit={handleUpdateItem} />
                <button 
                style={{marginTop: ".5em"}}
                className={styles.secondaryBtn} 
                onClick={()=> handleDeleteItem(editProduct)}>
                    Delete Item
                </button>
                <button 
                style={{marginTop: ".5em"}}
                className={styles.secondaryBtn} 
                onClick={()=> setToggleEditForm(false)}>
                    Cancel
                </button>
            </div>
            </>
            }
            {/* add form */}
            {toggleAddForm && 
            <>
            <button className={styles.moneyOverviewTitle}>Create new item</button>
            <div>
                <ProductForm 
                inputFields={editProduct}
                handleOnChange={handleOnProductChange} 
                submitBtn={"Add to store" }
                handleOnSubmit={handleAddItem} />
                <button 
                style={{marginTop: ".5em"}}
                className={styles.secondaryBtn} 
                onClick={()=> {setToggleAddForm(false)}}>
                    Cancel
                </button>
            </div>
            </>
            }

            {/* Tips */}
            {(!toggleEditForm && !toggleAddForm) && <Tips />}
          </section>
        </div>
      </main>}
    </>
  )
}

export default AllItems