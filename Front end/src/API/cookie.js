export function createCookie(name,value,days=10) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
    const expires = "; expires=" + date.toGMTString();
    
    document.cookie = name + "=" + value + expires + "; path=/";
}
export function createCookies(...args){
  for(let arg of args){
    createCookie(arg.name, arg.value, arg.expiresDay)
  }
}

export function cookie2Json(){
    if(!document.cookie){
      return null;
    }
    const cookie = document.cookie.split('; ').reduce((prev, current) => {
      const [name, ...value] = current.split('=');
      prev[name] = value.join('=');
      return prev;
    }, {});
    return cookie;
  }

export function eraseCookie(name) {
    createCookie(name,"",-1);
}

export function eraseCookies(...args){
  for(let arg in args){
    eraseCookie(arg)
  }
}
