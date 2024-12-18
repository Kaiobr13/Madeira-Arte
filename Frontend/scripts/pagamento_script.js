$(document).ready(function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalPrice = 0; // Inicializa o preço total
  
  products.forEach((product) => {
    // Busca a quantidade do produto no carrinho
    const cartItem = cart.find((item) => item.id === product.prod_id);
    const quantity = cartItem ? cartItem.quantity : 1;

    // Atualiza o preço total
    totalPrice += product.prod_price * quantity;
  });

    // Função para validar campos individuais e ocultar mensagens de erro
    function validateFieldOnPattern(field, alertId, validationFn) {
      $(field).on("input", function () {
        if (validationFn($(this).val())) {
          $(alertId).hide(); // Esconde o alerta se o valor corresponder ao padrão
        }
      });
    }
  
    // Formatação dinâmica para número do cartão (#### #### #### ####)
    $("#cardnumberinput").on("input", function () {
      let input = $(this).val().replace(/\D/g, ""); // Remove tudo que não for número
      if (input.length > 16) {
        input = input.substring(0, 16); // Limita a 16 caracteres (números)
      }
      let formatted = input.match(/.{1,4}/g)?.join(" ") || input; // Agrupa em blocos de 4
      $(this).val(formatted);
    });
  
    // Formatação dinâmica para PIN (###)
    $("#cardpininput").on("input", function () {
      let input = $(this).val().replace(/\D/g, ""); // Remove tudo que não for número
      $(this).val(input.substring(0, 3)); // Limita a 3 caracteres
    });
  
    // Formatação dinâmica para Código Postal (####-###)
    $("#codigopostalinput").on("input", function () {
      let input = $(this).val().replace(/\D/g, ""); // Remove tudo que não for número
      if (input.length > 4) {
        $(this).val(input.substring(0, 4) + "-" + input.substring(4, 7)); // Formata como ####-###
      } else {
        $(this).val(input);
      }
    });
  
    // Validações para ocultar erros automaticamente ao digitar e cumprir o padrão
    validateFieldOnPattern("#nameinput", "#alert", value => value.trim() !== ""); // Primeiro Nome
    validateFieldOnPattern("#lastnameinput", "#alert2", value => value.trim() !== ""); // Último Nome
    validateFieldOnPattern("#cardnumberinput", "#alert3", value => /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(value)); // Número do Cartão
    validateFieldOnPattern("#cardpininput", "#alert4", value => /^\d{3}$/.test(value)); // PIN do Cartão
    validateFieldOnPattern("#cidadeinput", "#alert5", value => value.trim() !== ""); // Cidade
    validateFieldOnPattern("#distritoinput", "#alert6", value => value !== ""); // Distrito
    validateFieldOnPattern("#codigopostalinput", "#alert7", value => /^\d{4}-\d{3}$/.test(value)); // Código Postal
    validateFieldOnPattern("#invalidCheck", "#alert8", value => $("#invalidCheck").is(":checked")); // Aceitar termos
  
    // Validação no botão "Pagar"
    $("#pagarBtn").click(function () {
      let isValid = true;
  
      const primeiroNome = $("#nameinput").val().trim();
      const ultimoNome = $("#lastnameinput").val().trim();
      const numeroCartao = $("#cardnumberinput").val().trim();
      const pinCartao = $("#cardpininput").val().trim();
      const cidade = $("#cidadeinput").val().trim();
      const distrito = $("#distritoinput").val();
      const codigoPostal = $("#codigopostalinput").val().trim();
      const termosAceitos = $("#invalidCheck").is(":checked");
  
      // Resetar mensagens de erro
      $(".alerta").hide();
  
      // Validações dos campos
      if (!primeiroNome) {
        $("#alert").show();
        isValid = false;
      }
  
      if (!ultimoNome) {
        $("#alert2").show();
        isValid = false;
      }
  
      if (!numeroCartao.match(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)) {
        $("#alert3").show();
        isValid = false;
      }
  
      if (!pinCartao.match(/^\d{3}$/)) {
        $("#alert4").show();
        isValid = false;
      }
  
      if (!cidade) {
        $("#alert5").show();
        isValid = false;
      }
  
      if (!distrito) {
        $("#alert6").show();
        isValid = false;
      }
  
      if (!codigoPostal.match(/^\d{4}-\d{3}$/)) {
        $("#alert7").show();
        isValid = false;
      }
  
      if (!termosAceitos) {
        $("#alert8").show();
        isValid = false;
      }
  
      // Se todas as validações passarem, prosseguir com o pagamento
      if (isValid) {
       
        $.ajax({
          url: "http://localhost:3000/orders/addorder",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            user_id: getCookie("id"),
            total: totalPrice,
            products: cart.map((item) => ({
              id: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
          success: function (response) {
            if (response.message === "Encomenda efectuado com sucesso!") {

              alert("Pagamento realizado com sucesso!\n A sua encomenda foi criada");
              localStorage.removeItem("cart"); // Limpa o carrinho do localStorage
              window.location.href = "paginainicial.html";
              
            } else {
              alert("Falha na compra: " + response.message);
            }
          },
          error: function () {
            alert("Erro durante o registo. Tente novamente mais tarde.");
          },
        });
        // Aqui pode adicionar código para processamento do pagamento
      }
    });
  });
  