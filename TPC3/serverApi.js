/* ------------------------------------------------------------------

   Rotas implementadas na API:
        GET /alunos
        GET /cursos
        GET /instrumentos

 -------------------------------------------------------------------- */

const axios = require('axios')
const http = require('http')


http.createServer(async function (req, res) 
{
    const data = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + data)

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const pathname = urlObj.pathname
    const query = urlObj.searchParams

    if(req.method !== "GET")
    {
        res.writeHead(405, {'Content-Type':'application/json'})
        return res.end(JSON.stringify({erro:"Método não permitido"}))
    }

    try
    {
        if(pathname === "/alunos" && query.toString() === "")
        {
            const resp = await axios.get(`http://localhost:3000/alunos`)

            const resultado = resp.data.map(a => 
            ({
                id: a.id,
                nome: a.nome,
                dataNasc: a.dataNasc,
                curso: a.curso,
                anoCurso: a.anoCurso,
                instrumento: a.instrumento
            }))

            res.writeHead(200, {'Content-Type':'application/json'})
            return res.end(JSON.stringify(resultado))
        }

        if(pathname === "/cursos" && query.toString() === "")
        {
            const resp = await axios.get(`http://localhost:3000/cursos`)

            const resultado = resp.data.map(c => 
            ({
                id: c.id,
                designacao: c.designacao,
                duracao: c.duracao,
                instrumento: c.instrumento
            }))

            res.writeHead(200, {'Content-Type':'application/json'})
            return res.end(JSON.stringify(resultado))
        }

        if(pathname === "/instrumentos" && query.toString() === "")
        {
            const resp = await axios.get(`http://localhost:3000/instrumentos`)

            const resultado = resp.data.map(i => 
            ({
                id: i.id,
                "#text": i["#text"]
            }))

            res.writeHead(200, {'Content-Type':'application/json'})
            return res.end(JSON.stringify(resultado))
        }

        res.writeHead(404, {'Content-Type':'application/json'})
        res.end(JSON.stringify({erro:"Rota não suportada"}))

    }catch(error){
        res.writeHead(502, {'Content-Type':'application/json'})
        res.end(JSON.stringify
        ({
            erro: "Erro ao contactar o servidor de dados",
            detalhe: error.message
        }))
    }

}).listen(7777)

console.log("Servidor à escuta na porta 7777...")