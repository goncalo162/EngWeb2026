# Metainformação:
#### Título: TPC2
#### Data: 17/02/2026
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
<li><p>Com base no <i>dataset</i> em formato <i>json</i> apresentado procedemos à criação de um <i>script</i> em <i>python</i> para alterar o mesmo de modo a facilitar um servidor em <i>json-server</i> e um servidor <i>http</i> com <i>node-js</i>.</p></li>
<li><p>O script em python inicialmente gera um novo ficheiro json separando as intervenções e viaturas em novas coleções, cujo <i>json-server</i> utiliza como base de dados.</p></li>
<li><p>O servidor em <i>node-js</i> utiliza <i>axios</i> para recolher os dados da base de dados do <i>json-server</i> organiza-os e disponibiliza os <i>endpoints</i> pretendidos em <i>html</i> de modo a permitir <i>preety-printing</i>.</p></li>
</ul>

# Lista de Resultados:
<ul>
<li>cleanDataset.py - Script em <i>python</i> para criar um <i>dataset</i> novo limpando o <i>dataset</i> original e criando as coleções novas</li>
<li>server.js - Servidor em <i>node-js</i> que disponibiliza os <i>endpoints</i> com <i>preety-printing</i></li>
<li>.gitignore - Ficheiro para ignorar o <i>output</i> do <i>script</i> e o <i>dataset</i> no repositório</li>
</ul>