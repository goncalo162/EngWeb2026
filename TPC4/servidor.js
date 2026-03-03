// treinos_server.js
// EW2025 : 2025-02-24
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')           // Necessario criar e colocar na mesma pasta
var static = require('./static.js')                 // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

//Gera um id com base no timestamp do relógio do servidor
function generateId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0')
  const random = [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
  return timestamp + random
}

// Server creation

var treinosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url == '/' || req.url == '/emd')
                {
                    axios.get("http://localhost:3000/emds?_sort=dataEMD")
                    .then(resp => {
                        var treinos = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdListPage(treinos, d))
                    })

                }else if (req.url == '/emd/byname') {
                    axios.get("http://localhost:3000/emds")
                    .then(resp => {
                        var treinos = resp.data.sort((a, b) => {
                            const primeiroNomeCompare = a.nome["primeiro"].localeCompare(b.nome["primeiro"]);
                            if(primeiroNomeCompare !== 0) 
                                return primeiroNomeCompare;
                            return a.nome["último"].localeCompare(b.nome["último"]);
                        });
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.end(templates.emdListPage(treinos, d));
                    })

                }else if (req.url == '/emd/desDate') {
                    axios.get("http://localhost:3000/emds?_sort=dataEMD&_order=desc")
                    .then(resp => {
                        var treinos = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdListPage(treinos, d))
                    })

                }else if(req.url == '/emd/registo'){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.createEmdPage())   
                
                }else if(req.url == '/emd/stats'){
                    axios.get("http://localhost:3000/emds")
                    .then(resp => {
                        var emds = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdStatsPage(emds))
                    })
                    .catch(erro => {
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Erro ao obter estatísticas...</p>')
                        res.end('<address><a href="/">Voltar</a></address>')
                    })

                }else if(/\/emd\/editar\/[0-9a-z]+$/.test(req.url)){
                    var idEmd = req.url.split('/')[3]
                    axios.get('http://localhost:3000/emds/' + idEmd)
                    .then(resp => {
                        var emd = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.editEmdPage(emd))
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possível obter o registo...</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end('<address><a href="/">Voltar</a></address>')
                    })

                }else if(/\/emd\/apagar\/[0-9a-z]+$/.test(req.url)){
                    var idEmd = req.url.split('/')[3]
                    return axios.delete('http://localhost:3000/emds/' + idEmd)
                    .then(() => {
                    axios.get("http://localhost:3000/emds?_sort=dataEMD")
                    .then(resp => {
                        var treinos = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdListPage(treinos, d))
                        })
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possível apagar o registo...</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end('<address><a href="/">Voltar</a></address>')
                    })
            
                }else if(/\/emd\/[0-9a-z]+$/.test(req.url)){
                    var idEmd = req.url.split('/')[2]
                    axios.get('http://localhost:3000/emds/' + idEmd)
                    .then(resp => {
                        var emd = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdAthletePage(emd))
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possível obter o registo...</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end('<address><a href="/">Voltar</a></address>')
                    })
                }
                break

            case "POST":
                if(req.url == '/emd'){
                  collectRequestBodyData(req, (formData) => 
                    {
                        axios.get("http://localhost:3000/emds")
                        .then(resp => {
                          const emds = resp.data
                          const maxIndex = Math.max(...emds.map(e => e.index))

                          const dia = String(formData.dia).padStart(2,'0')
                          const mes = String(formData.mes).padStart(2,'0')
                          const ano = formData.ano

                          const novoEmd = 
                          {
                            id: generateId(),
                            index: maxIndex + 1,
                            nome: {
                              primeiro: formData.prim_nome,
                              último: formData.ult_nome
                            },
                            dataEMD: `${ano}-${mes}-${dia}`,
                            idade: parseInt(formData.idade),
                            género: formData.genero,
                            morada: formData.morada,
                            modalidade: formData.modalidade,
                            clube: formData.clube,
                            email: formData.email,
                            federado: formData.federado === 'true',
                            resultado: formData.resultado === 'true'
                          }
                    
                        return axios.post('http://localhost:3000/emds', novoEmd)
                        })
                        .then(() => {
                            axios.get("http://localhost:3000/emds?_sort=dataEMD")
                            .then(resp => {
                                var treinos = resp.data 
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.emdListPage(treinos, d))
                            })
                        })
                        .catch(erro => {
                          res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                          res.write('<p>Erro ao criar registo...</p>')
                          res.write('<p>' + erro + '</p>')
                          res.end('<address><a href="/">Voltar</a></address>')
                        })
                    })
                    
                }else if(/\/emd\/[0-9a-z]+$/.test(req.url)){
                    var idEmd = req.url.split('/')[2]
                    collectRequestBodyData(req, (formData) => 
                    {
                        const dia = String(formData.dia).padStart(2,'0')
                        const mes = String(formData.mes).padStart(2,'0')
                        const ano = formData.ano
                    
                        const emdEditado = {
                            nome: {
                                primeiro: formData.prim_nome,
                                último: formData.ult_nome
                            },
                            dataEMD: `${ano}-${mes}-${dia}`,
                            idade: parseInt(formData.idade),
                            género: formData.genero,
                            morada: formData.morada,
                            modalidade: formData.modalidade,
                            clube: formData.clube,
                            email: formData.email,
                            federado: formData.federado === 'true',
                            resultado: formData.resultado === 'true'
                        }
                    
                        axios.patch('http://localhost:3000/emds/' + idEmd, emdEditado)
                        .then(() => {
                            axios.get("http://localhost:3000/emds?_sort=dataEMD")
                            .then(resp => {
                                var treinos = resp.data 
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.emdListPage(treinos, d))
                            })
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Erro ao editar registo...</p>')
                            res.write('<p>' + erro + '</p>')
                            res.end('<address><a href="/">Voltar</a></address>')
                        })
                    })
                }
                break
            
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

treinosServer.listen(7777, ()=>{
    console.log("Servidor à  escuta na porta 7777...")
})