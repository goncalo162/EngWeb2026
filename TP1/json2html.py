import json, os, shutil

def open_json(filename):
    with open(filename, encoding = "utf-8") as f:
        data = json.load(f)
    return data

def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)

def new_file(filename, content):
    with open(filename, "w", encoding = "utf-8") as f:
        f.write(content)


# -------------- Página Inicial --------------  

dados = open_json("dataset_reparacoes.json")

html  = '''
<html>
    <head>
        <title>Reparações</title>
        <meta charset = "utf-8" />
    </head>
    <body>
        <h3>Reparações</h3>
        <hr/>
        <ul>
            <li><a href = "listaReparacoes.html">Listagem das Reparações</a></li>
            <li><a href = "listaTipoIntervencao.html">Listagem de Tipos de Intervenção</a></li>
            <li><a href = "listaViaturas.html">Listagem de Viaturas</a></li>
        </ul>
    </body>
</html> 
'''

mk_dir("output")
new_file("./output/index.html", html)


# -------------- Lista Reparacoes --------------  

reparacoes = dados["reparacoes"]
reparacoesLinks = ""

reparacoesOrdenadas = reparacoes.sort(key = lambda r: r["nome"])

for reparacao in reparacoes:
    viatura = reparacao["viatura"]

    reparacoesLinks += f'''
        <li><a href="{reparacao["nome"]}.html">{reparacao["nome"]}</a></li>
    '''


html  = f'''
<html>
    <head>
        <title>Lista de Reparações</title>
        <meta charset = "utf-8" />
    </head>
    <body>
        <h2>Lista de Reparações</h2>
        <hr/>
        <ul>
            {reparacoesLinks}
        </ul>
        <hr/>
        <address>
            <a href = "index.html">Voltar ao Inicio</a>
        </address>
    </body>
</html> 
'''    
new_file("./output/listaReparacoes.html", html)


# -------------- Lista de Tipos de Intervenções --------------  

tiposIntervencao = {}
tiposIntervencaoLinks = ""

for reparacao in reparacoes:
    for intervencao in reparacao["intervencoes"]:
        codigo = intervencao["codigo"]
        if codigo not in tiposIntervencao:
            tiposIntervencao[codigo] = {"nome": intervencao["nome"], "descricao": intervencao["descricao"], "reparacoes" : []}
        if reparacao["nome"] not in tiposIntervencao[codigo]["reparacoes"]:
            tiposIntervencao[codigo]["reparacoes"].append(reparacao["nome"])

tiposIntervencaoOrdenadas = sorted(tiposIntervencao.keys())

for codigo in tiposIntervencaoOrdenadas:
    tiposIntervencaoLinks += f'''
        <li><a href="{codigo}.html">{codigo}</a></li>
    '''

html  = f'''
<html>
    <head>
        <title>Lista de Tipos de Intervenção</title>
        <meta charset = "utf-8" />
    </head>
    <body>
        <h2>Lista de Tipos de Intervenção</h2>
        <hr/>
        <ul>
            {tiposIntervencaoLinks}
        </ul>
        <hr/>
        <address>
            <a href = "index.html">Voltar ao Inicio</a>
        </address>
    </body>
</html> 
'''    
new_file("./output/listaTipoIntervencao.html", html)


# -------------- Lista de Viaturas --------------  

viaturas = {}
viaturasLinks = ""

for reparacao in reparacoes:
    viatura = reparacao["viatura"]
    identificacao = viatura["marca"] + "-" + viatura["modelo"]
    if identificacao not in viaturas:
        viaturas[identificacao] = {"numero" : 0, "reparacoes" : []}
    viaturas[identificacao]["numero"] += 1
    viaturas[identificacao]["reparacoes"].append(reparacao["nome"])

viaturasOrdenadas = sorted(viaturas.keys())

for viatura in viaturasOrdenadas:
    viaturasLinks += f'''
        <li><a href="{viatura}.html">{viatura}</a></li>
    '''

html  = f'''
<html>
    <head>
        <title>Lista de Viaturas</title>
        <meta charset = "utf-8" />
    </head>
    <body>
        <h2>Lista de Viaturas</h2>
        <hr/>
        <ul>
            {viaturasLinks}
        </ul>
        <hr/>
        <address>
            <a href = "index.html">Voltar ao Inicio</a>
        </address>
    </body>
</html> 
'''    
new_file("./output/listaViaturas.html", html)


# -------------- Página Viatura ------------------

for identificacaoViatura, viatura in viaturas.items():
    viatura["reparacoes"].sort()

for identificacaoViatura, viatura in viaturas.items():
    listaReparacoes = ""
    for reparacao in viatura["reparacoes"]:
        listaReparacoes += f'''
        <li><a href = "{reparacao}.html">{reparacao}</a></li>
        '''

    html = f'''
    <html>
        <head>
            <title>{identificacaoViatura}</title>
            <meta charset = "utf-8" />
        </head>
        <body>
            <h2>{identificacaoViatura}</h2>
            <hr/>
            <h3>Número: {viatura["numero"]}</h3>
            <hr/>
            <h3>Reparações a viaturas deste tipo</h3>
                {listaReparacoes}
            <address>
                <a href = "listaViaturas.html">Voltar à Lista de Viaturas</a>
            </address>
        </body>
    </html> 
    '''

    new_file(f"./output/{identificacaoViatura}.html", html)    


# -------------- Página Intervenção --------------  

for codigo, tipoIntervencao in tiposIntervencao.items():
    tipoIntervencao["reparacoes"].sort()

for codigo, tipoIntervencao in tiposIntervencao.items():
    listaReparacoes = ""
    for reparacao in tipoIntervencao["reparacoes"]:
        listaReparacoes += f'''
        <li><a href = "{reparacao}.html">{reparacao}</a></li>
        '''

    html = f'''
    <html>
        <head>
            <title>{codigo}</title>
            <meta charset = "utf-8" />
        </head>
        <body>
            <h2>{codigo}</h2>
            <hr/>
            <h3>Nome: {tipoIntervencao["nome"]}</h3>
            <p>Descrição: {tipoIntervencao["descricao"]}</p>
            <hr/>
            <h3>Reparações onde foi realizada</h3>
                {listaReparacoes}
            <address>
                <a href = "listaTipoIntervencao.html">Voltar à Lista de Tipos de Intervenção</a>
            </address>
        </body>
    </html> 
    '''

    new_file(f"./output/{codigo}.html", html)


# -------------- Página Reparacoes --------------  

linhasIntervencoes = ""

for reparacao in reparacoes:
    viatura = reparacao["viatura"]
    intervencoes = reparacao["intervencoes"]

    linhasIntervencoes = ""
    for intervencao in intervencoes:
        linhasIntervencoes += f"""
        <tr>
            <td><a href = "{intervencao["codigo"]}.html">{intervencao["codigo"]}</a></td>
            <td>{intervencao["nome"]}</td>
            <td>{intervencao["descricao"]}</td>
        </tr>
        """

    html  = f'''
    <html>
        <head>
            <title>{reparacao["nome"]}</title>
            <meta charset = "utf-8" />
        </head>
        <body>
            <h2>{reparacao["nome"]}</h2>
            <table border = "1">
                <tr><td>Data</td>
                    <td>{reparacao["data"]}</td>
                <tr><td>Nif</td>
                    <td>{reparacao["nif"]}</td>
                <tr><td>Nome</td>
                    <td>{reparacao["nome"]}</td>
                <tr><td>Marca e Modelo</td>
                    <td><a href = "{viatura["marca"] + "-" + viatura["modelo"]}.html">{viatura["marca"] + "-" + viatura["modelo"]}</a></td>
                <tr><td>Matricula</td>
                    <td>{viatura["matricula"]}</td>
                <tr><td>Número de Intervenções</td>
                    <td>{reparacao["nr_intervencoes"]}</td>
            </table>
            <hr/>
            <h3>Intervenções</h3>
            <table border = "1">
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                </tr>
                {linhasIntervencoes}
            </table>
            <address>
                <a href = "listaReparacoes.html">Voltar à Lista de Reparações</a>
            </address>
        </body>
    </html> 
    '''    

    new_file(f"./output/{reparacao["nome"]}.html", html)