$(document).ready(function () {
    const cartContainer = $(".row.justify-content-center"); // Container onde os cards serão adicionados
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Recupera o carrinho do localStorage
  
    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
      cartContainer.html("<p class='text-center'>O carrinho está vazio.</p>");
      updateTotalPrice(0); // Atualiza o preço total para 0
      return;
    }
  
    // Extrai os IDs dos produtos no carrinho
    const productIds = cart.map((item) => item.id).join(",");
  
    // Faz a chamada à API para obter os detalhes dos produtos no carrinho
    $.ajax({
      url: `http://localhost:3000/products/getprodbyid/${productIds}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.data && response.data.length > 0) {
          populateCart(response.data);
        } else {
          cartContainer.html("<p class='text-center'>Erro ao carregar os produtos.</p>");
        }
      },
      error: function (error) {
        console.error("Erro ao carregar produtos do carrinho:", error);
        cartContainer.html("<p class='text-center'>Erro ao carregar os produtos.</p>");
      },
    });
  
    // Função para preencher os produtos do carrinho na página
    function populateCart(products) {
      cartContainer.empty(); // Limpa os elementos anteriores, se existirem
      let totalPrice = 0; // Inicializa o preço total
  
      products.forEach((product) => {
        // Busca a quantidade do produto no carrinho
        const cartItem = cart.find((item) => item.id === product.prod_id);
        const quantity = cartItem ? cartItem.quantity : 1;
  
        // Atualiza o preço total
        totalPrice += product.prod_price * quantity;
  
        // Cria o card do produto
        const productCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${product.img_path || 'default.jpg'}" class="card-img-top" alt="${product.prod_name}" style="height: 18rem; object-fit: cover;">
              <div class="card-body">
                <center><h5 class="card-title">${product.prod_name}</h5></center>
                <p class="card-text">Preço Unitário: ${product.prod_price}€</p>
                <p class="card-text">Quantidade: ${quantity}</p>
                <center>
                  <button class="btn btn-secondary increase-quantity" data-id="${product.prod_id}">+</button>
                  <button class="btn btn-secondary decrease-quantity" data-id="${product.prod_id}">-</button>
                  <button class="btn btn-danger remove-item" data-id="${product.prod_id}">Remover</button>
                </center>
              </div>
            </div>
          </div>`;
        
        cartContainer.append(productCard);
      });
  
      // Atualiza o preço total exibido
      updateTotalPrice(totalPrice);
  
      // Adiciona os eventos para os botões de aumentar, diminuir ou remover itens
      $(".increase-quantity").on("click", function () {
        const productId = parseInt($(this).data("id"));
        updateQuantity(productId, 1);
      });
  
      $(".decrease-quantity").on("click", function () {
        const productId = parseInt($(this).data("id"));
        updateQuantity(productId, -1);
      });
  
      $(".remove-item").on("click", function () {
        const productId = parseInt($(this).data("id"));
        removeFromCart(productId);
      });
    }
  
    // Função para atualizar o preço total no rodapé
    function updateTotalPrice(totalPrice) {
      const totalPriceElement = $("#totalPrice");
      if (totalPriceElement.length === 0) {
        // Cria o elemento se ainda não existir
      
      }
  
      // Atualiza o conteúdo do preço total
      $("#totalPrice").text(`Preço Total: ${totalPrice.toFixed(2)}€`);
    }
  
    // Função para atualizar a quantidade de um produto no carrinho
    function updateQuantity(productId, change) {
      const cartItem = cart.find((item) => item.id === productId);
  
      if (cartItem) {
        cartItem.quantity += change;
  
        // Remove o item se a quantidade for menor ou igual a 0
        if (cartItem.quantity <= 0) {
          removeFromCart(productId);
          return;
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload(); // Recarrega a página para atualizar os dados
      }
    }
  
    // Função para remover um produto do carrinho
    function removeFromCart(productId) {
      const index = cart.findIndex((item) => item.id === productId);
      if (index !== -1) {
        cart.splice(index, 1); // Remove o item do array
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload(); // Recarrega a página para atualizar os dados
      }
    }
  });
  