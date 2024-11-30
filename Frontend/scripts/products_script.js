$(document).ready(function () {
  var listaDeProdutos = $("#listaDeProdutos");

  // Array para armazenar os itens do carrinho
  var cart = [];

  // Carregar produtos do servidor
  $.ajax({
    url: "http://localhost:3000/products/getprods", // Certifique-se de que a URL está correta
    type: "GET",
    dataType: "json",
    success: function (response) {
      // Verifica se a resposta contém produtos
      if (response.data && response.data.length > 0) {
        populateProductsCards(response.data);
      } else {
        listaDeProdutos.html("<div class='col-12'><p>Sem produtos disponíveis.</p></div>");
      }
    },
    error: function (error) {
      console.error("Erro ao obter produtos:", error);
      listaDeProdutos.html("<div class='col-12'><p>Erro ao carregar produtos.</p></div>");
    },
  });

  // Função para preencher os produtos dinamicamente
  function populateProductsCards(products) {
    listaDeProdutos.empty(); // Limpa os produtos anteriores, se existirem

    products.forEach((product) => {
      // Cria um card para cada produto
      const productCard = `
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
          <div class="card h-100">
            <img src="${product.img_path || 'default.jpg'}" class="card-img-top" alt="${product.prod_name}" style="height: 18rem; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.prod_name}</h5>
              <p class="card-text">Preço: R$${product.prod_price}</p>
              <div class="mt-auto">
                <button class="btn btn-primary w-100 add-to-cart" 
                        data-id="${product.prod_id}" 
                        data-name="${product.prod_name}" 
                        data-price="${product.prod_price}">Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        </div>`;
      
      listaDeProdutos.append(productCard);
    });

    // Adiciona eventos aos botões de "Adicionar ao Carrinho" após renderização
    $(".add-to-cart").on("click", function () {
      const productId = $(this).data("id");
      const productName = $(this).data("name");
      const productPrice = $(this).data("price");

      // Adicionar produto ao carrinho
      addToCart(productId, productName, productPrice);
    });
  }

  // Função para adicionar produtos ao carrinho
  function addToCart(id, name, price) {
    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      alert("Este produto já está no carrinho!");
    } else {
      cart.push({ id, name, price });
      updateCartUI();
      alert(`${name} foi adicionado ao carrinho.`);
    }
  }

  // Função para atualizar a interface do carrinho
  function updateCartUI() {
    const cartButton = $("#cartButton");
    const cartDropdown = $("#cartDropdown");
    const cartItems = $("#cartItems");
    const cartCount = $("#cartCount");
  
    // Atualiza o contador de itens no carrinho
    cartCount.text(cart.length);
  
    // Limpa a lista de itens do carrinho
    cartItems.empty();
  
    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
      cartItems.html("<li>Carrinho vazio.</li>");
      return;
    }
  
    // Adiciona os itens do carrinho à lista
    cart.forEach((item, index) => {
      const listItem = `
        <li class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <strong>${item.name}</strong><br>
            <span>R$${item.price}</span>
          </div>
          <button class="btn btn-sm btn-danger remove-item" data-index="${index}">&times;</button>
        </li>`;
      cartItems.append(listItem);
    });
  
    // Adicionar eventos de remoção
    $(".remove-item").on("click", function () {
      const itemIndex = $(this).data("index");
      cart.splice(itemIndex, 1); // Remove o item do carrinho
      updateCartUI(); // Atualiza o carrinho após a remoção
    });
  }
  

  // Mostrar/Esconder dropdown do carrinho
  $("#cartButton").hover(
    function () {
      $("#cartDropdown").show();
    },
    function () {
      $("#cartDropdown").hide();
    }
  );

  // Redirecionar para a página de carrinho
  $("#finalizeOrder").on("click", function () {
    localStorage.setItem("cart", JSON.stringify(cart)); // Salva no Local Storage
    window.location.href = "carrinho.html";
  });
});
