$(document).ready(function () {
  const recomendationsSection = $("#recomendations");
  const productsTable = $("#products");

  if (checkCookieLogin()) {
    const userId = getCookie("id");

    // Obter IDs recomendados
    // Função para buscar IDs recomendados
$.ajax({
  url: `http://localhost:3000/recommendations?user_id=${userId}`,
  type: "GET",
  dataType: "json",
  success: function (response) {
    if (response && response.length > 0) {
      // Converte os IDs para uma string no formato correto
      const productIds = response.join(',');
      fetchProductDetails(productIds); // Chama a próxima função
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
    recomendationsSection.css("display", "none");
  }

  // Função para buscar detalhes dos produtos
  function fetchProductDetails(productIds) {
    // Garantir que `productIds` seja um array simples de números ou strings
    const ids = Array.isArray(productIds) ? productIds : [];
  
    $.ajax({
      url: `http://localhost:3000/recommendations/getprodbyid/${productIds}`, // Corrige os IDs no URL
      type: "POST",
      contentType: "application/json",
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
  
  // Função para renderizar os cards dos produtos
  function populateProductsCards(products) {
    productsTable.empty();

    products.forEach((product) => {
      const productCard = `
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
          <div class="card h-100">
            <img src="${product.img_path || 'default.jpg'}" class="card-img-top" alt="${product.prod_name}" style="height: 18rem; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.prod_name}</h5>
              <p class="card-text">Preço: ${product.prod_price}€</p>
              <div class="mt-auto">
                
            </div>
          </div>
        </div>`
      productsTable.append(productCard);
    });

    $(".add-to-cart").on("click", function () {
      const productId = $(this).data("id");
      const productName = $(this).data("name");
      const productPrice = $(this).data("price");

      addToCart(productId, productName, productPrice);
    });
  }

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
  }
});
