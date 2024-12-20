import pymysql
from flask import Flask, request, jsonify

# Conexão com a base de dados
def conectar_bd():
    return pymysql.connect(
        host="localhost",
        user="root",  # Use variáveis de ambiente para maior segurança
        password="Passw0rd",
        database="new_schema",
        cursorclass=pymysql.cursors.DictCursor
    )

# Buscar histórico do usuário
def obter_historico_usuario(user_id):
    query = """
        SELECT DISTINCT p.prod_id, p.prod_name
        FROM orders o
        INNER JOIN order_details od ON o.ord_id = od.det_ord_id
        INNER JOIN product p ON od.det_prod_id = p.prod_id
        WHERE o.ord_cli_id = %s;
    """
    with conectar_bd() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(query, (user_id,))
            resultado = cursor.fetchall()
    return [{"id": item["prod_id"], "nome": item["prod_name"]} for item in resultado]

# Buscar produtos da base de dados
def obter_produtos():
    query = """
        SELECT p.prod_id, p.prod_name, c.cat_name AS categoria
        FROM product p
        INNER JOIN category c ON p.prod_cat_id = c.cat_id;
    """
    with conectar_bd() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(query)
            resultado = cursor.fetchall()
    return [{"id": item["prod_id"], "nome": item["prod_name"], "categoria": item["categoria"]} for item in resultado]

# Função para recomendar produtos com base no histórico
def recomendar_historico(historico, produtos):
    historico_ids = {item["id"] for item in historico}  # IDs dos produtos no histórico
    categorias_interessadas = {
        produto["categoria"] for produto in produtos if produto["id"] in historico_ids
    }
    recomendacoes = [
        produto["id"]
        for produto in produtos
        if produto["categoria"] in categorias_interessadas and produto["id"] not in historico_ids
    ]
    return recomendacoes


# Inicialização do Flask
app = Flask(__name__)

@app.route('/recomendacoes', methods=['GET'])
def recomendacoes():
    user_id = request.args.get('user_id')
    try:
        # Obter histórico do usuário
        historico = obter_historico_usuario(int(user_id))
        # Obter produtos disponíveis
        produtos = obter_produtos()
        # Gerar recomendações
        recomendacoes = recomendar_historico(historico, produtos)
        return jsonify(recomendacoes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Executar a aplicação Flask
if __name__ == "__main__":
    app.run(port=5001)
