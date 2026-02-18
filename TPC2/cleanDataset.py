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

ficheiro = open_json("dataset_reparacoes.json")["reparacoes"]

listaReparacoes = []
listaViaturas = []
listaIntervencoes = []

for reparacao in ficheiro:
    intervencoes = reparacao['intervencoes']
    viatura = reparacao['viatura']

    for intervencao in intervencoes:
        if intervencao not in listaIntervencoes:
            listaIntervencoes.append(intervencao)

    textoIntervencoes = ", ".join(intervencao["codigo"] for intervencao in intervencoes)
    reparacao['intervencoes'] = textoIntervencoes

    textoViatura = viatura['marca'] + "-'" + viatura['modelo'] + "' " + viatura['matricula']
    listaViaturas.append({
        "marca": viatura['marca'],
        "modelo": viatura['modelo'],
        "matricula": viatura['matricula']
    })
    reparacao['viatura'] = textoViatura

    listaReparacoes.append(reparacao)  # ← was missing

res = {
    'reparacoes': listaReparacoes,
    'viaturas': listaViaturas,
    'intervencoes': listaIntervencoes
}

with open("dataset_reparacoes_clean.json", "w", encoding="utf-8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)