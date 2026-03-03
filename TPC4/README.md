# Metainformação:
#### Título: TPC4
#### Data: 03/03/2026
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
<li><p>Com base no <i>dataset</i> em formato <i>json</i> e utilizando <i>json-server</i> procedemos à criação de um <i>servidor aplicacional</i> para gerar um <i>website</i> com base no mesmo utilizando <i>templates pug</i>, recursos estáticos e <i>w3-css</i> como folha de estilo.</p></li>
<li><p>O servidor aplicacional suporta as quatro operações <i>CRUD</i> no <i>dataset</i> fornecido utilizando para isso os endpoints fornecidos no enunciado, utilizando para este fim pedidos <i>HTTP</i> ao json-server e respondendo com páginas <i>web</i>. Este permite também ordenar os registos quer por nome quer por data, e permite ainda consultar estatísticas do <i>dataset</i> com base em distribuições estatísticas dos dados do mesmo.</p></li>
</ul>

# Lista de Resultados:
<ul>
<li>servidor.js - Ficheiro em <i>javascript</i> que corre um servidor em <i>node-js</i> com a função de <i>servidor aplicacional</i>.</li>
<li>static.js - Ficheiro em <i>javascript</i> com funções referentes a recursos estáticos.</li>
<li>templates.js - Ficheiro em <i>javascript</i> que indica como interagir com os <i>templates pug</i>.</li>
<li>clean_dataset.py - Ficheiro em <i>python</i> com a função de formatar o <i>dataset</i> inicial de modo a permitir o seu uso pelo <i>json-server</i>.</li>
<li>views/ - Diretoria com todos os <i>templates-pug</i> utilizados pelo <i>servidor aplicacional</i>.
<li>.gitignore - Ficheiro para ignorar o <i>dataset e pacotes node.js</i> no repositório.</li>