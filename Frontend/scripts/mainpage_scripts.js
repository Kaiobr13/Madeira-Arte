$(document).ready(function () {
    var recomendations = $("#recomendations");
    var productsTable = $("#products");
  
    // Verifica se o utilizador está logado
    if (checkCookieLogin()) {
      // Faz a requisição à API para obter produtos recomendados
      $.ajax({
        url: "http://localhost:3000/products/getrecomendedprods", // Certifique-se de que a URL está correta
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Verifica se a resposta contém produtos
          if (response.data && response.data.length > 0) {
            populateProductsTable(response.data);
          } else {
            productsTable.append("<tr><td colspan='3'>Sem recomendações disponíveis.</td></tr>");
          }
        },
        error: function (error) {
          console.error("Erro ao obter produtos recomendados:", error);
          productsTable.append("<tr><td colspan='3'>Erro ao carregar recomendações.</td></tr>");
        },
      });
    } else {
      // Se não estiver logado, esconder a seção de recomendações
      recomendations.css("display", "none");
    }
  
    // Função para preencher a tabela com os produtos recomendados
    function populateProductsTable(products) {
      products.forEach((product) => {
        const productRow = `
          <tr>
            <td>${product.prod_name}</td>
            <td>${product.prod_price}€</td>
          </tr>
        `;
        productsTable.append(productRow);
      });
    }
  });
  