import { pagina, link, card, lista, botaoVoltar, getAlunos, getCursos, getInstrumentos} from "./myUtils.js"
import axios from 'axios'
import http from 'http'

var frontEndServer = http.createServer(async function (req, res) 
{
    const data = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + data)

    switch(req.method)
    {
        case "GET":
            if(req.url == '/')
            {
                try
                {
                    var corpo = `
                    <ul>
                        <li>${link("/alunos", "Alunos")}</li>
                        <li>${link("/cursos", "Cursos")}</li>
                        <li>${link("/instrumentos", "Instrumentos")}</li>
                    </ul>
                    `

                    res.writeHead(200, {'Content-Type':'text/html; charset = utf-8'})
                    return res.end(pagina("Escola de Música", corpo))

                }catch (error){
                    res.writeHead(500, {'Content-Type':'text/html; charset = utf-8'})
                    return res.end(`<p>Erro no servidor de dados.</p>
                                    <p>${error}</p>`)
                }

            }else if(req.url.startsWith('/alunos')){
                try
                {
                    var alunos = await getAlunos()
                    alunos.sort((a, b) => a.nome.localeCompare(b.nome))
                    var linhas = alunos.map(a => `
                        <tr>
                            <td>${a.nome}</td>
                            <td>${a.id}</td>
                            <td>${a.dataNasc}</td>
                            <td>${a.curso}</td>
                            <td>${a.anoCurso}</td>
                            <td>${a.instrumento}</td>
                        </tr>
                        `).join("")

                    var corpo = card
                        ("Lista de Alunos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>Nome</th>
                                <th>Id</th>
                                <th>Data de Nascimento</th>
                                <th>${link("/cursos", "Cursos")}</th>
                                <th>Ano do Curso</th>
                                <th>${link("/instrumentos", "Instrumento")}</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${botaoVoltar()}
                        `)
                        
                    res.writeHead(200, {'Content-Type':'text/html; charset = utf-8'})
                    return res.end(pagina("Alunos", corpo))

                }catch (error){
                    res.writeHead(500, {'Content-Type':'text/html; charset = utf-8'})
                    return res.end(`<p>Erro no servidor de dados.</p>
                                    <p>${error}</p>`)
                }

            }else if(req.url.startsWith('/cursos')){
                try
                {
                    var cursos = await getCursos()
                    cursos.sort((a, b) => a.id.localeCompare(b.id, undefined, {numeric: true}))
                    var linhas = cursos.map(c => `
                        <tr>
                            <td>${c.id}</td>
                            <td>${c.designacao}</td>
                            <td>${c.duracao} anos</td>
                            <td>${c.instrumento["#text"]}</td>
                        </tr>
                        `).join("")

                    var corpo = card
                        ("Lista de Cursos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>Id</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>${link("/instrumentos", "Instrumento")}</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${botaoVoltar()}
                        `)
                        
                    res.writeHead(200, {'Content-Type':'text/html; charset = utf-8'})
                    return res.end(pagina("Cursos", corpo))

                }catch (error){
                    res.writeHead(500, {'Content-Type':'text/html; charset = utf-8'})
                    return res.end(`<p>Erro no servidor de dados.</p>
                                    <p>${error}</p>`)
                }

            }else if(req.url.startsWith('/instrumentos')){
                try
                {
                    var instrumentos = await getInstrumentos()
                    instrumentos.sort((a, b) => a.id.localeCompare(b.id, undefined, {numeric: true}))
                    var linhas = instrumentos.map(i => `
                        <tr>
                            <td>${i.id}</td>
                            <td>${i["#text"]}</td>
                        </tr>
                        `).join("")

                    var corpo = card
                        ("Lista de Instrumentos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>Id</th>
                                <th>Nome</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${botaoVoltar()}
                        `)
                        
                    res.writeHead(200, {'Content-Type':'text/html; charset = utf-8'})
                    return res.end(pagina("Instrumentos", corpo))

                }catch (error){
                    res.writeHead(500, {'Content-Type':'text/html; charset = utf-8'})
                    return res.end(`<p>Erro no servidor de dados.</p>
                                    <p>${error}</p>`)
                }
            }
            break

        default:
            res.writeHead(405, {'Content-Type':'text/html; charset = utf-8'})
            return res.end(`<p>Método não suportado: ${req.method}</p>`)
    }
})

frontEndServer.listen(7778)
console.log("Servidor à escuta na porta 7778...")