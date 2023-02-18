import style from "../../pages/Auth/Auth.module.scss";

interface formProps {
    handleOnChange: (e:any) => void, 
    handleOnSubmit: (e:any) => void
}
export const LoginForm = ({handleOnChange, handleOnSubmit}:formProps)=>{
    return (
        <>
        <div>
            <label className={style.formLabel}>Email</label><br/>
            <input className={style.formInput} type="email" name="email"  onChange={(e)=> handleOnChange(e)}/>
        </div>

        <div>
            <label className={style.formLabel}>Password</label><br/>
            <input className={style.formInput} type="password" name="password"  onChange={(e)=> handleOnChange(e)}/>
        </div>

        <button className={style.primaryBtn} onClick={(e)=> handleOnSubmit(e)}>{ "Login" }</button>
        
        </>
        
    )
}

export const RegisterForm = ({handleOnChange, handleOnSubmit}: formProps)=>{
    return (
        <>
        <div>
            <label className={style.formLabel}>Name</label><br/>
            <input className={style.formInput} type="text" name="name"  onChange={(e)=> handleOnChange(e)}/>
        </div>

        <div>
            <label className={style.formLabel}>Email</label><br/>
            <input className={style.formInput} type="email" name="email"  onChange={(e)=> handleOnChange(e)}/>
        </div>

        <div>
            <label className={style.formLabel}>Password</label><br/>
            <input className={style.formInput} type="password" name="password"  onChange={(e)=> handleOnChange(e)}/>
        </div>

        <button className={style.primaryBtn} onClick={(e)=> handleOnSubmit(e)}>{ "Register" }</button>
        
        </>
        
    )
}