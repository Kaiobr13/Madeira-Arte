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
            async: false,
            cache: false,
            timeout: 30000,
            contentType: 'application/json',
            data: JSON.stringify({
              name: name+ " " + surname,
              password: pass,
              email: email,
              place: morada + ", " + cidade
            }),
            success: function(response) {
              console.log(response.message);
              if (response.message) {
                if (response.message === 'Registo efectuado com sucesso!') {
                  setCookie("login", true);
                  setTimeout(function () {
                    window.location.href = "paginainicial.html"; // Caminho correto
                  }, 500);
                  window.alert('Registo efectuado com sucesso!');

                }
              } else {
                window.alert("Falha no registo: " + response.message);
              }
            },
            error: function(error) {
              //console.error("Falha no registo", error);
              window.alert("An error occurred during registration. Please try again.");
            }
          });
        //}

  });
});
