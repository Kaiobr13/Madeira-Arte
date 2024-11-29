function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

$(document).ready(function () {
  // Função para validar e esconder mensagens de erro dinamicamente
  function validateField(field, alertId, validationFn) {
    $(field).on("input", function () {
      if (validationFn($(this).val())) {
        $(alertId).hide(); // Esconde o alerta se o campo for válido
      }
    });
  }

  // Adicionar validações para ocultar mensagens automaticamente
  validateField("#inputusername", "#alert", isValidEmail);
  validateField("#inputpassword", "#alert2", value => value.trim() !== "");

  // Ação no botão "Login"
  $("#loginBtn").click(function () {
    var email = document.getElementById("inputusername").value.trim(); // Remover espaços desnecessários
    var pass = document.getElementById("inputpassword").value.trim();
    var alert = document.getElementById("alert");
    var alert2 = document.getElementById("alert2");

    // Resetar os alertas antes de validar
    alert.style.display = "none";
    alert2.style.display = "none";

    // Verificações
    if (!email && !pass) {
      alert.style.display = "block"; // Alerta para email
      alert2.style.display = "block"; // Alerta para senha
      return; // Finalizar execução
    }

    if (!email) {
      alert.style.display = "block"; // Mostrar alerta para email vazio
      return;
    }

    if (!isValidEmail(email)) {
      alert.style.display = "block"; // Mostrar alerta para email inválido
      return;
    }

    if (!pass) {
      alert2.style.display = "block"; // Mostrar alerta para senha vazia
      return;
    }

    // Se todas as validações passarem, enviar a requisição AJAX
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
        window.alert("Ocorreu um erro durante o login. Por favor, tente novamente.");
      },
    });
  });
});

// function showToast(backgroundColor){
//   const toast = document.createElement('div');
//   toast.classList.add('toast');
//   toast.textContent = 'Login efetuado com sucesso!';
//   toast.style.backgroundColor = backgroundColor;
//   document.getElementById('toast_container').appendChild(toast);

//   setTimeout(function() {
//     toast.remove();
//   }, 3000);
// }