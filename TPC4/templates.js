const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.emdListPage = (tlist, d) => renderPug('index', { list: tlist, date: d });
exports.emdAthletePage = (athlete) => renderPug('emd', { athlete:  athlete});
exports.editEmdPage = (athlete) => renderPug('editEmd', { athlete: athlete });
exports.createEmdPage = () => renderPug('addEmd', {});
exports.emdStatsPage = (list) => renderPug('stats', { list: list });