$(document).ready(function () {
  
    $("#loginBtn").click(function () {
    var email = document.getElementById("inputusername").value;

    var pass = document.getElementById("inputpassword").value;

    $.ajax({
      url: "http://localhost:3000/clients/login",
      type: "POST",
      async: false,
      cache: false,
      timeout: 30000,
      contentType: "application/json",
      data: JSON.stringify({
        password: pass,
        email: email,
      }),
      success: function (response) {
        console.log(response.message);
        if (response.success) {
          setCookie("login", true);
         

          setTimeout(function () {
            window.location.href = "paginainicial.html"; // Caminho correto
          }, 500);

          window.alert("Login efectuado com sucesso!");
          
        } else {
          window.alert("Falha no Login: " + response.message);
        }
      },
      error: function (error) {
        //console.error("Falha no registo", error);
        window.alert(
          "An error occurred during login. Please try again."
        );
      },
    });
  });
});
