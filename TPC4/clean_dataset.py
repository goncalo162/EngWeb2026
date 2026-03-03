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

ficheiro = open_json("emd.json")

listaAtletas = []

for atleta in ficheiro:
    atleta["id"] = atleta["_id"]
    atleta.pop("_id")
    listaAtletas.append(atleta)

res = {
    'emds': listaAtletas
}

with open("emd_clean.json", "w", encoding="utf-8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)