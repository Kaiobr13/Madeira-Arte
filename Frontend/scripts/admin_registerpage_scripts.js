function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  $(document).ready(function () {

    if(!checkCookieLogin())
      {
        alert("Precisa de fazer login para ter acesso a esta página!");
        window.location.replace("login.html");
      }
      if (!checkifitsadmin){
        alert("Não tem acesso a esta página!");
        window.location.replace("paginainicial.html");
      }
      
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
  
    // Preencher o select de roles do servidor
    function populateUserTypes() {
      $.ajax({
        url: "http://localhost:3000/clients/getusertypes", // Endpoint do servidor
        type: "GET",
        success: function (response) {
          const userTypes = response.data; // Supondo que o servidor retorna os dados dentro de "data"
          const select = $("#inputclass");
          select.empty(); // Remove as opções existentes
          select.append('<option selected disabled>Role do User</option>'); // Placeholder
  
          // Iterar sobre os resultados e adicionar as opções ao select
          userTypes.forEach(userType => {
            select.append(
              `<option value="${userType.cla_id}">${userType.cla_name}</option>`
            );
          });
        },
        error: function () {
          alert("Erro ao carregar os tipos de usuários. Tente novamente mais tarde.");
        },
      });
    }
  
    // Chamar a função para carregar os tipos de usuário
    populateUserTypes();
  
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
      const selectedRole = $("#inputclass").val();
  
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
  
      if (!selectedRole || selectedRole === "Role do User") {
        $("#alert8").show();
        isValid = false;
      }
  
      // Se todas as validações passarem, enviar a requisição AJAX
      if (isValid) {
        $.ajax({
          url: "http://localhost:3000/clients//adduser",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            name: name + " " + surname,
            password: pass,
            email: email,
            place: morada + ", " + cidade,
            role: selectedRole, // Adiciona o ID do role selecionado
          }),
          success: function (response) {
            if (response.message === "Registo efectuado com sucesso!") {
              setCookie("login", true);
              alert("Registo efectuado com sucesso!");
              window.location.href = "admin.html";
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
  