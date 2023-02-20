import React, { useState } from 'react'
import styles from './dropdown.module.scss'
import { Product } from '../../pages/AllItems/AllItems'

interface dropdownProps {
    handleOnChoose: (...args:any) => void,
    itemList?: Product[]
}
const Dropdown = ({handleOnChoose, itemList}:dropdownProps)=>{
    const [toggleMenu, setToggleMenu] = useState<Boolean>(false)
    return(
        <div className={styles.dropdownContainer}>
          <div className={styles.searchBar} onClick={()=> setToggleMenu(!toggleMenu)}>
            <div className={styles.searchText}>Select an item ...</div>
            <div className={styles.expandIcon}><Icon/></div>
          </div>
          {toggleMenu && 
            <div className={styles.menu}>
            {itemList && itemList.map((item, idx)=>(
            <div key={idx} className={styles.menuItem} onClick={(e) => {handleOnChoose(e, item); setToggleMenu(!toggleMenu)}}>
                <div className={styles.itemName}>
                    <img src={item.img ? item.img[0].thumbnail : "https://via.placeholder.com/40 "} alt="item" />
                    <span>{item.name}</span>
                </div>
                <span className={styles.itemInfo}>${item.price}</span>
            </div>
            ))}
        </div>
          }

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

export default Dropdown