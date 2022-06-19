import { Link, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {cookie2Json, eraseCookie} from '../../API/cookie.js'
import styles from "./Sidebar.module.scss";

const sidebarNavLinks = [
  "Dash Board",
  "All Items",
  "Monthly Sale",
  "Profile Setting"
];
type User = {
  name: string,
  email: string,
}

export default function Sidebar() {
  const location = useLocation();
  const history = useHistory()
  const [user, setUser] = useState<User>({name:"", email: ""});
 
  function handleLogOut(){
    eraseCookie("SMS_token");
    eraseCookie("user_name");
    eraseCookie("user_email")
    history.push("/")
  }

  useEffect(()=>{
    const cookie:any = cookie2Json();
    !cookie 
    ? history.push("/unauthorized") 
    : setUser({
      name: cookie.user_name,
      email: cookie.user_email
    })
  }, [history])
  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.profileDetails}>
            <div className={styles.profileImageDiv}>
              {user && <div className={styles.profileImg}> 
                {user.name.slice(0,1).toUpperCase()}
                </div>}
            </div>
            <p className={styles.userName}>{
            `Hello ${user.name.charAt(0).toLocaleUpperCase()}${user.name.slice(1)},` }</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>

          <nav className={styles.sidebarNav}>
            <ul>
              {sidebarNavLinks.map((sidebarNavLink) => (
                <li className={styles.sidebarNavItem} key={sidebarNavLink}>
                  <Link
                    className={
                      location.pathname === `/${sidebarNavLink}`
                        ? styles.sidebarNavLinkActive
                        : styles.sidebarNavLink
                    } 
                    to={`/${sidebarNavLink}`}
                    >
                    {sidebarNavLink.charAt(0).toUpperCase() +
                      sidebarNavLink.slice(1)}
                  </Link>
                </li>
              ))}
                <li 
                className={`${styles.sidebarNavLink}  ${styles.sidebarNavLink}`} 
                style={{cursor: "pointer", color: "salmon"}}
                onClick={()=> handleLogOut()}>
                Log Out
                </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
