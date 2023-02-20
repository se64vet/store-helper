import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { client } from "../../API/api";
import { LoginForm, RegisterForm } from "../../components/Forms/AuthForm"
import {cookie2Json, createCookies, eraseCookies} from "../../API/cookie"
import style from './Auth.module.scss';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginInfos, setLoginInfos] = useState({});
  const [registerInfos, setRegisterInfos] = useState({});
  const [noti, setNoti] = useState("");

  const history = useHistory();
    
  const handleAuthSwitch = (event:any) => {
      event.preventDefault();
      setIsLogin(!isLogin);
  }

  async function authProcess(endpoint: string, body:Object){
    try {
      //send request to login route
      const response = await client.post(`/auth/${endpoint}`, body);
      const {token, user} = response.data;
      //save JWT token to cookie

      eraseCookies("SMS_token", "user_name", "user_email");
      const newCookies = [
        {
          name: "SMS_token",
          value: token,
        },
        {
          name: "user_name",
          value: user.name,
        },
        {
          name: "user_email",
          value: user.email,
        },
      ];
      createCookies(...newCookies);
      //redirect to shop
      history.push("/Dash Board");
    } 
    catch (error:any) {
        const {data} = error.response;
        setNoti(data.msg)
    }
  }

  const handleGuestLogin = async (event: any)=>{
    event.preventDefault()
    authProcess("login", {
      email: "guest@mail.com", 
      password: "guestuser"
    })
  }

  function handleOnChangeLogin (e:any) {
      const {name, value} = e.target;
      setLoginInfos((prev) => ({...prev, [name]: value}))
  }

  async function handleOnLogin(event:any) {
      event.preventDefault();
      authProcess("login", loginInfos);
  }

  function handleOnchangeRegister (e:any) {
    const {name, value} = e.target;
    setRegisterInfos((prev) => ({...prev, [name]: value}))
  }
  async function handleOnRegister(event:any) {
    event.preventDefault();
    authProcess("register", registerInfos);
  }
  useEffect(()=>{
    const cookie:any = cookie2Json();
    if(cookie && cookie.SMS_token){
      history.push("/Dash Board")
    }
  }, [history])
  return (
    <div className={style.container}>
            <h2 className={style.pageTitle}>
                {isLogin ? "Login" : "Register"} to Store Wise
            </h2>

            <form className={style.formContainer}>
                {noti === "" ? "" : <p className={style.noti}>{noti}</p>}
                {isLogin 
                    ? <LoginForm handleOnChange={handleOnChangeLogin} handleOnSubmit={handleOnLogin}/> 
                    : <RegisterForm handleOnChange={handleOnchangeRegister} handleOnSubmit={handleOnRegister}/>}
                
                <button className={style.secondaryBtn} onClick={(event) => handleGuestLogin(event)}>{"Login as Guest"}</button>

                <p>
                    {isLogin ? "Or Register " : "Or Login "} 
                    <button className={style.clickableBtn}  onClick={(event)=>handleAuthSwitch(event)}> 
                    {"here"} 
                    </button>
                </p>
            </form>
            
            <div style={{position: "absolute", bottom: "2em"}}>
              <p>This app is hosted in free, slow speed server.</p>
              <p>Thank you for your patient.</p>
            </div>
        </div>
  )
}



export default Auth