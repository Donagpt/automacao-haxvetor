import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { schedules, clients, employees, serviceTypes } from '../src/data.js';

test('usa somente dados fictícios completos', () => {
  assert.equal(clients.length, 3);
  assert.equal(employees.length, 3);
  assert.equal(serviceTypes.length, 3);
  for (const item of schedules) {
    for (const field of ['cliente','endereco','contato','tipoServico','equipe','veiculo','materiais','observacoes','valor','pagamento','status']) assert.ok(item[field]);
  }
});

test('interface contém navegação, busca e filtros', async () => {
  const html = await readFile('index.html', 'utf8');
  const js = await readFile('src/app.js', 'utf8');
  assert.match(html, /viewport/);
  for (const label of ['Clientes','Funcionários','Tipos de serviços','Programação','Busca','Status','Data']) assert.ok(js.includes(label));
});
