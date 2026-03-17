# Metainformação:
#### Título: TPC5
#### Data: 10/03/2026
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
<li><p>Com base no <i>dataset</i> em formato <i>json</i> e utilizando <i>json-server</i> procedemos à criação de um <i>servidor aplicacional</i> para gerar um <i>website</i> com base no mesmo utilizando <i>templates pug</i>, recursos estáticos e <i>w3-css</i> como folha de estilo com o auxilio de <i>express</i>.</p></li>
<li><p>O servidor aplicacional utiliza <i>express</i> de modo a suportar as operações de consulta no <i>dataset</i> utilizando três coleções neste.</p></li>
</ul>

# Lista de Resultados:
<ul>
<li>app.js - Ficheiro em <i>javascript</i> que auxilia a correr um servidor em <i>express</i>.</li>
<li>www - Ficheiro em <i>javascript</i> que realmente corre o servidor aplicacional</li>
<li>index.js - <i>Router</i> com as rotas possiveis a que o servidor aplicacional porde responder.</li>
<li>clean_dataset.py - Ficheiro em <i>python</i> com a função de formatar o <i>dataset</i> inicial de modo a permitir o seu uso pelo <i>json-server</i> criando para isso 3 coleções.</li>
<li>views/ - Diretoria com todos os <i>templates-pug</i> utilizados pelo <i>servidor aplicacional</i>.
<li>.gitignore - Ficheiro para ignorar o <i>dataset e pacotes node.js</i> no repositório.</li>