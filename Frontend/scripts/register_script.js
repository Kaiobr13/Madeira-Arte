$(document).ready(function () {
  
  
  
    $("#registerBtn").click(function () {
    var name = document.getElementById("inputprimeironome").value;
    var surname = document.getElementById("inputultimonome").value;

    var pass = document.getElementById("inputpassword").value;
    var confirmpass = document.getElementById("inputrepassword").value;

    var email = document.getElementById("inputemail").value;
    var morada = document.getElementById("inputmorada").value;
    var cidade = document.getElementById("inputcidade").value;

    //if ((name != "" && pass != "" && email !="" && terms && morada != "" && cidade != "" && surname != "") && (pass == confirmpass)) {
        $.ajax({
            url: 'http://localhost:3000/clients/addclient',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
              name: name+ " " + surname,
              password: pass,
              email: email,
              place: morada + ", " + cidade
            }),
            success: function(response) {
              if (response.message) {
                alert(response.message);
                if (response.message === 'Registo efectuado com sucesso!') {
                 // setCookie("login", true);
                  window.location.replace("paginainicial.html");
                }
              } else {
                alert("Falha no registo: " + response.message);
              }
            },
            error: function(error) {
              console.error("Falha no registo", error);
              alert("An error occurred during registration. Please try again.");
            }
          });
        //}

  });
});
