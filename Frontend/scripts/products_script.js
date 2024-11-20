$(document).ready(function () {
    var listaDeProdutos = $("#listaDeProdutos");
  
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
              <img src="${product.image || 'default.jpg'}" class="card-img-top" alt="${product.prod_name}" style="height: 18rem; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.prod_name}</h5>
                <p class="card-text">${product.prod_price}</p>
                <div class="mt-auto">
                  <a href="#" class="btn btn-primary w-100">Adicionar ao Carrinho</a>
                </div>
              </div>
            </div>
          </div>`;
        
        listaDeProdutos.append(productCard);
      });
    }
  });
  