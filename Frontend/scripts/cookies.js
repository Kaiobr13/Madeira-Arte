

  
function setCookie(cname, cvalue) {
  const d = new Date();
  // Adiciona duas horas ao tempo atual
  d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookieLogin() {
    let user = getCookie("login");
    if (user != "") {
      return true;
    } else {
      return false;
    }
  }

  function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";

  }

  function eraseCookies() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name] = cookie.split("=");
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}



