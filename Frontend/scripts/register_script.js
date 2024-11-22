function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

$(document).ready(function () {
  // Função para validar campos individuais e ocultar mensagens de erro
  function validateField(field, alertId, validationFn) {
    $(field).on("input", function () {
      if (validationFn($(this).val())) {
        $(alertId).hide(); // Esconde o alerta se o campo for válido
      }
    });
  }

  // Adicionar validações de cada campo para ocultar erros automaticamente
  validateField("#inputprimeironome", "#alert", value => value.trim() !== "");
  validateField("#inputultimonome", "#alert2", value => value.trim() !== "");
  validateField("#inputemail", "#alert3", isValidEmail);
  validateField("#inputpassword", "#alert4", value => value.trim() !== "");
  validateField("#inputrepassword", "#alert5", value => value === $("#inputpassword").val());
  validateField("#inputmorada", "#alert6", value => value.trim() !== "");
  validateField("#inputcidade", "#alert7", value => value.trim() !== "");

  // Validação no botão "Registar"
  $("#registerBtn").click(function () {
    let isValid = true;

    const name = $("#inputprimeironome").val().trim();
    const surname = $("#inputultimonome").val().trim();
    const email = $("#inputemail").val().trim();
    const pass = $("#inputpassword").val().trim();
    const confirmpass = $("#inputrepassword").val().trim();
    const morada = $("#inputmorada").val().trim();
    const cidade = $("#inputcidade").val().trim();

    // Resetar mensagens de erro
    $(".alert").hide();

    // Validações dos campos
    if (!name) {
      $("#alert").show();
      isValid = false;
    }

    if (!surname) {
      $("#alert2").show();
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      $("#alert3").show();
      isValid = false;
    }

    if (!pass) {
      $("#alert4").show();
      isValid = false;
    }

    if (pass !== confirmpass) {
      $("#alert5").show();
      isValid = false;
    }

    if (!morada) {
      $("#alert6").show();
      isValid = false;
    }

    if (!cidade) {
      $("#alert7").show();
      isValid = false;
    }

    // Se todas as validações passarem, enviar a requisição AJAX
    if (isValid) {
      $.ajax({
        url: "http://localhost:3000/clients/addclient",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          name: name + " " + surname,
          password: pass,
          email: email,
          place: morada + ", " + cidade,
        }),
        success: function (response) {
          if (response.message === "Registo efectuado com sucesso!") {
            alert("Registo efectuado com sucesso!");
            window.location.href = "paginainicial.html";
          } else {
            alert("Falha no registo: " + response.message);
          }
        },
        error: function () {
          alert("Erro durante o registo. Tente novamente mais tarde.");
        },
      });
    }
  });

  // Validação adicional para "Confirme Password" durante a digitação
  $("#inputrepassword").on("input", function () {
    if ($(this).val() === $("#inputpassword").val()) {
      $("#alert5").hide(); // Esconde o alerta se as senhas coincidirem
    }
  });
});
