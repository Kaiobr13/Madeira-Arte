$(document).ready(function () {
  const recomendationsSection = $("#recomendations");
  const productsTable = $("#products");

  // Verifica se o utilizador está logado
  if (checkCookieLogin()) {
    const userId = getCookie("user_id"); // Assumindo que o ID do usuário está armazenado em um cookie

    // Primeira requisição: buscar IDs recomendados
    $.ajax({
      url: `http://localhost:3000/recommendations?user_id=${userId}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response && response.length > 0) {
          // Segunda requisição: buscar detalhes dos produtos
          fetchProductDetails(response);
        } else {
          productsTable.append("<tr><td colspan='3'>Sem recomendações disponíveis.</td></tr>");
        }
      },
      error: function (error) {
        console.log("Erro ao obter recomendações:", error);
        productsTable.append("<tr><td colspan='3'>Erro ao carregar recomendações.</td></tr>");
      },
    });
  } else {
    // Se não estiver logado, esconder a seção de recomendações
    recomendationsSection.css("display", "none");
  }

  // Função para buscar detalhes dos produtos recomendados
  function fetchProductDetails(productIds) {
    $.ajax({
      url: `http://localhost:3000/products/getprodbyid/${productIds}`,
      type: "POST",
      contentType: "application/json", // Enviar os IDs como um array
      dataType: "json",
      success: function (response) {
        if (response && response.data && response.data.length > 0) {
          populateProductsCards(response.data); // Renderizar os produtos
        } else {
          productsTable.append("<tr><td colspan='3'>Sem detalhes dos produtos disponíveis.</td></tr>");
        }
      },
      error: function (error) {
        console.error("Erro ao obter detalhes dos produtos:", error);
        productsTable.append("<tr><td colspan='3'>Erro ao carregar produtos recomendados.</td></tr>");
      },
    });
  }

  // Função para renderizar os cards de produtos recomendados
  function populateProductsCards(products) {
    productsTable.empty(); // Limpa qualquer conteúdo anterior

    products.forEach((product) => {
      const productCard = `
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
          <div class="card h-100">
            <img src="${product.img_path || 'default.jpg'}" class="card-img-top" alt="${product.prod_name}" style="height: 18rem; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.prod_name}</h5>
              <p class="card-text">Preço: ${product.prod_price}€</p>
              <div class="mt-auto">
                <button class="btn btn-primary w-100 add-to-cart" 
                        data-id="${product.prod_id}" 
                        data-name="${product.prod_name}" 
                        data-price="${product.prod_price}">Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        </div>`;
      productsTable.append(productCard);
    });

    // Adiciona eventos aos botões de "Adicionar ao Carrinho"
    $(".add-to-cart").on("click", function () {
      const productId = $(this).data("id");
      const productName = $(this).data("name");
      const productPrice = $(this).data("price");

      // Chama a função para adicionar ao carrinho
      addToCart(productId, productName, productPrice);
    });
  }

  // Função para adicionar produtos ao carrinho
  function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      alert(`Mais uma unidade de ${name} foi adicionada ao carrinho.`);
    } else {
      cart.push({ id, name, price, quantity: 1 });
      alert(`${name} foi adicionado ao carrinho.`);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI(); // Atualiza o carrinho na interface, se necessário
  }
});
