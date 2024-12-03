

#Collaborative Filtering ou Content-Based Filtering

#1.Regras Baseadas em Heurísticas - Exemplo: Produtos Mais Vendidos e Complementares

'''
Exemplo de Implementação
Produtos Mais Vendidos:
Recomendar os produtos mais vendidos nas últimas semanas.

Produtos Similares Baseados em Categorias:
Se o utilizador visualizou/comprou um produto de uma categoria específica (ex.: "Móveis de Madeira"), recomendar outros produtos da mesma categoria.

Produtos Complementares:
Se o utilizador adicionou algo ao carrinho (ex.: "Mesa de Madeira"), recomendar produtos relacionados (ex.: "Cadeiras de Madeira").
'''

# Dados de exemplo
produtos = [
    {"id": 1, "nome": "Cadeira Madeira", "vendas": 120, "categoria": "móveis"},
    {"id": 2, "nome": "Mesa Madeira", "vendas": 80, "categoria": "móveis"},
    {"id": 3, "nome": "Cama Madeira", "vendas": 50, "categoria": "móveis"},
    {"id": 4, "nome": "Prateleira Madeira", "vendas": 70, "categoria": "móveis"},
]

# Heurística: Recomendamos os 2 produtos mais vendidos
def recomendar_baseado_em_vendas(produtos, n=2):
    produtos_ordenados = sorted(produtos, key=lambda x: x['vendas'], reverse=True)
    return [produto["nome"] for produto in produtos_ordenados[:n]]

recomendacoes = recomendar_baseado_em_vendas(produtos)
print("Recomendações baseadas em vendas:", recomendacoes)

#2. Baseado em Popularidade - Exemplo: Recomendar produtos com base em avaliações médias mais altas

'''
Um dos métodos mais básicos é recomendar os produtos mais populares, calculados com base em métricas como:
Número de Vendas Recentes.
Número de Visualizações.
Avaliações Positivas.

Implementação Simples
Um exemplo seria ordenar os produtos por popularidade e recomendar os primeiros N itens.
'''


# Dados de exemplo
avaliacoes = [
    {"id": 1, "nome": "Cadeira Madeira", "avaliacoes": [5, 4, 5]},
    {"id": 2, "nome": "Mesa Madeira", "avaliacoes": [4, 3, 5, 4]},
    {"id": 3, "nome": "Cama Madeira", "avaliacoes": [3, 2]},
    {"id": 4, "nome": "Prateleira Madeira", "avaliacoes": [4, 5, 4]},
]

# Heurística: Recomendar produtos com maior média de avaliações
def recomendar_baseado_em_avaliacoes(avaliacoes, n=2):
    for produto in avaliacoes:
        produto["media_avaliacoes"] = sum(produto["avaliacoes"]) / len(produto["avaliacoes"])
    produtos_ordenados = sorted(avaliacoes, key=lambda x: x["media_avaliacoes"], reverse=True)
    return [produto["nome"] for produto in produtos_ordenados[:n]]

recomendacoes_popularidade = recomendar_baseado_em_avaliacoes(avaliacoes)
print("Recomendações baseadas em popularidade:", recomendacoes_popularidade)

#3. Baseado em Regras de Associação - Exemplo: Produtos frequentemente comprados juntos
# Dados de transações
transacoes = [
    {"compra": ["Cadeira Madeira", "Mesa Madeira"]},
    {"compra": ["Cama Madeira", "Prateleira Madeira"]},
    {"compra": ["Cadeira Madeira", "Mesa Madeira", "Prateleira Madeira"]},
    {"compra": ["Mesa Madeira", "Prateleira Madeira"]},
]

# Regra de associação simples: se Cadeira Madeira for comprada, recomendar Mesa Madeira
def recomendar_regras_associacao(produto, transacoes):
    produtos_associados = {}
    for transacao in transacoes:
        if produto in transacao["compra"]:
            for item in transacao["compra"]:
                if item != produto:
                    produtos_associados[item] = produtos_associados.get(item, 0) + 1

    produtos_ordenados = sorted(produtos_associados.items(), key=lambda x: x[1], reverse=True)
    return [produto[0] for produto in produtos_ordenados]

recomendacoes_associacao = recomendar_regras_associacao("Cadeira Madeira", transacoes)
print("Recomendações baseadas em regras de associação:", recomendacoes_associacao)

#4. Baseado no Histórico do Utilizador - Exemplo: Produtos semelhantes ao histórico do utilizador
'''
Se o utilizador já comprou ou visualizou produtos no site, é possível recomendar itens com base no seu histórico:
Produtos Recentemente Visualizados:
Recomendar itens similares aos que foram recentemente visualizados.

Compras Anteriores:
Mostrar produtos que complementem ou estejam relacionados às compras feitas pelo utilizador.

'''

# Dados do histórico do utilizador
historico_utilizador = ["Cadeira Madeira", "Mesa Madeira"]

# Dados de categorias
produtos = [
    {"id": 1, "nome": "Cadeira Madeira", "categoria": "móveis"},
    {"id": 2, "nome": "Mesa Madeira", "categoria": "móveis"},
    {"id": 3, "nome": "Cama Madeira", "categoria": "móveis"},
    {"id": 4, "nome": "Prateleira Madeira", "categoria": "móveis"},
    {"id": 5, "nome": "Cadeira Plástica", "categoria": "móveis"},
]

# Recomendar produtos da mesma categoria dos produtos no histórico
def recomendar_historico(historico, produtos):
    categorias_interessadas = {produto["categoria"] for produto in produtos if produto["nome"] in historico}
    recomendacoes = [produto["nome"] for produto in produtos if produto["categoria"] in categorias_interessadas and produto["nome"] not in historico]
    return recomendacoes

recomendacoes_historico = recomendar_historico(historico_utilizador, produtos)
print("Recomendações baseadas no histórico:", recomendacoes_historico)

#5. Clusterização com K-Means - Exemplo: Agrupar utilizadores com base em preferências
'''
Em machine learning, podemos usar clusterização para agrupar produtos com base em características básicas, como:

Preço.
Categoria.
Avaliações.

'''
from sklearn.cluster import KMeans
import numpy as np

# Dados: Preferências dos utilizadores em 3 produtos
preferencias = np.array([
    [5, 1, 2],  # Utilizador 1
    [4, 1, 3],  # Utilizador 2
    [1, 5, 4],  # Utilizador 3
    [1, 6, 4],  # Utilizador 4
    [2, 5, 5],  # Utilizador 5
])

# K-Means para agrupar utilizadores em 2 clusters
kmeans = KMeans(n_clusters=2, random_state=0)
kmeans.fit(preferencias)

# Mostra os grupos e o cluster para cada utilizador
print("Centroides dos clusters:", kmeans.cluster_centers_)
print("Grupos dos utilizadores:", kmeans.labels_)
