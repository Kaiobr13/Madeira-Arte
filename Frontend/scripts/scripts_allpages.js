$(document).ready(function () {
    var loginOpc = $('#loginbtn');
    var sair =$('#logoutbtn');
    if(checkCookieLogin())
    {
        loginOpc.text("Perfil");
    }
    else
    {
        loginOpc.text("Login");~
        loginOpc.attr("href", "login.html")
        sair.css("display","none");
    }

    $('#logoutbtn').click(function () {
        eraseCookies();
        if(checkCookieLogin())
        {
            alert("Erro ao fazer log out!");
        }
        else
        {
            window.location.replace("paginainicial.html");
        }
    });
  });
  
  
  
