import json, os, shutil

def open_json(filename):
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data

def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)

def new_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

ficheiro = open_json("cinema.json")["filmes"]

listaFilmes = []
listaAtores = []
listaGeneros = []

id_filmes = 0
id_atores = 0
id_generos = 0

for filme in ficheiro:
    filme["id"] = id_filmes
    atores = filme["cast"]
    generos = filme["genres"]

    for ator in atores:
        if ator not in [atorAtual["nome"] for atorAtual in listaAtores]:
            novo_ator = {}
            novo_ator["id"] = id_atores
            id_atores += 1
            novo_ator["nome"] = ator
            novo_ator["filmes"] = [id_filmes]
            listaAtores.append(novo_ator)

        else:
            atorExistente = next(atorAtual for atorAtual in listaAtores if atorAtual["nome"] == ator)
            atorExistente["filmes"].append(id_filmes)

    for genero in generos:
        if genero not in [generoAtual["nome"] for generoAtual in listaGeneros]:
            novo_genero = {}
            novo_genero["id"] = id_generos
            id_generos += 1
            novo_genero["nome"] = genero
            novo_genero["filmes"] = [id_filmes]
            listaGeneros.append(novo_genero)

        else:
            generoExistente = next(generoAtual for generoAtual in listaGeneros if generoAtual["nome"] == genero)
            generoExistente["filmes"].append(id_filmes)

    filme.pop("cast")
    filme.pop("genres")
    listaFilmes.append(filme)
    id_filmes += 1


res = {
    'filmes': listaFilmes,
    'atores': listaAtores,
    'generos': listaGeneros
}

with open("cinema_clean.json", "w", encoding="utf-8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)