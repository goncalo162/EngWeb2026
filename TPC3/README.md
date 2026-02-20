# Metainformação:
#### Título: TPC1
#### Data: 10/02/2026
#### Autor: Gonçalo Duarte Coutinho Martins
#### UC: Engenharia Web

# Autor:
#### id: A106914
#### Nome: Gonçalo Duarte Coutinho Martins
<figure>
<img src="images/foto.png" style="width:30%" />
</figure>

# Resumo:
<ul>
<li><p>Com base no <i>dataset</i> em formato <i>json</i> e utilizando <i>json-server</i> procedemos à criação de uma <i>api rest</i> e de um <i>servidor aplicacional</i> para gerar um <i>website</i> com base no mesmo.</p></li>
<li><p>A <i>api rest</i> suporta apenas operações <i>'GET'</i> às coleções indicadas no <i>dataset</i> que por sua vez corre <i>json-server</i> e retorna os dados em formato <i>json</i>.</p></li>
<li><p>O <i>servidor aplicacional</i> por sua vez faz pedidos <i>HTTP</i> à <i>api</i> de modo a recolher os dados necessários para apresentação, devolvendo aos seus pedidos páginas <i>HTML</i> utilizando como folha de estilo <i>W3-CSS</i> de modo a permitir <i>preety-printing</i>.</p></li>
</ul>

# Lista de Resultados:
<ul>
<li>myUtils.js - Ficheiro em <i>javascript</i> com funções auxiliares para o <i>servidor aplicacional</i>.</li>
<li>serverApi.js - Ficheiro em <i>javascript</i> que corre um servidor em <i>node-js</i> para representar uma <i>api-rest</i> que apresenta os dados do <i>dataset</i>.</li>
<li>serverApp.js - Ficheiro em <i>javascript</i> que corre um servidor em <i>node-js</i> de modo a apresentar os dados da <i>api</i> em <i>HTML</i> com folha de estilo <i>W3-CSS</i>.</li>
<li>.gitignore - Ficheiro para ignorar o <i>dataset</i> no repositório.</li>