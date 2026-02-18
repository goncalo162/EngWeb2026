const axios = require('axios');
const http = require('http');

http.createServer(function (req, res) 
{

    if(req.url === "/reparacoes") 
    {
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                let data = resp.data;
                let html = `
                    <table border="1">
                        <tr>
                            <th>nome</th>
                            <th>nif</th>
                            <th>data</th>
                            <th>viatura</th>
                            <th>intervencoes</th>
                        </tr>
                `;

                data.sort((a, b) => a.nome.localeCompare(b.nome));
                data.forEach(r => 
                {
                    html += `
                        <tr>
                            <td>${r.nome}</td>
                            <td>${r.nif}</td>
                            <td>${r.data}</td>
                            <td>${r.viatura}</td>
                            <td>${r.intervencoes}</td>
                        </tr>
                    `;
                });

                html += `</table>`;

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("<pre>" + JSON.stringify(error, null, 2) + "</pre>");
            });

    }else if(req.url === "/intervencoes"){
        axios.get('http://localhost:3000/intervencoes')
            .then(resp => {
                let data = resp.data;
                let html = `
                    <table border="1">
                        <tr>
                            <th>codigo</th>
                            <th>nome</th>
                            <th>descricao</th>
                        </tr>
                `;

                data.sort((a, b) => a.codigo.localeCompare(b.codigo));
                data.forEach(r => 
                {
                    html += `
                        <tr>
                            <td>${r.codigo}</td>
                            <td>${r.nome}</td>
                            <td>${r.descricao}</td>
                        </tr>
                    `;
                });

                html += `</table>`;

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("<pre>" + JSON.stringify(error, null, 2) + "</pre>");
            });

    }else if(req.url === "/viaturas"){
        axios.get('http://localhost:3000/viaturas')
            .then(resp => {
                let data = resp.data;
                let html = `
                    <table border="1">
                        <tr>
                            <th>marca</th>
                            <th>modelo</th>
                            <th>matricula</th>
                        </tr>
                `;

                data.sort((a, b) => a.marca.localeCompare(b.marca) || a.modelo.localeCompare(b.modelo));
                data.forEach(r => 
                {
                    html += `
                        <tr>
                            <td>${r.marca}</td>
                            <td>${r.modelo}</td>
                            <td>${r.matricula}</td>
                        </tr>
                    `;
                });

                html += `</table>`;

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("<pre>" + JSON.stringify(error, null, 2) + "</pre>");
            });

    }else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("<p>Pedido não suportado! Tente novamente...</p>");
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");