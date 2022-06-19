import styles from "./ProductForms.module.scss"

interface formProps {
    handleOnChange: (...args:any) => void,
    handleOnSubmit: (...args:any) => void,
    inputFields : {
        label: string,
        type: string,
        name: string,
        value?: string | number
    }[],
    submitBtn: string
}
export const ProductForm = ({handleOnChange, handleOnSubmit, inputFields, submitBtn}:formProps)=>{
    return (
        <>
        {inputFields.map((field, idx) => (
            <div className={styles.formChild} key={idx}>
                <label className={styles.formLabel}>{field.label}</label><br/>
                <input 
                className={styles.formInput} 
                type={field.type} 
                name={field.name}
                value={field.value}
                onChange={(e)=> handleOnChange(e)}
                />
            </div>
        ))}
    
        <button className={styles.primaryBtn} onClick={(e)=> handleOnSubmit(e)}>{ submitBtn }</button>
        
        </>
        
    )
}