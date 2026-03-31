const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'src/data/modelos.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

let sql = `
CREATE TABLE IF NOT EXISTS vendedores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  provincia text,
  nombre text,
  mail text,
  cel text,
  foto text,
  activo boolean DEFAULT true,
  presupuestos text[]
);

CREATE TABLE IF NOT EXISTS modelos (
  id text PRIMARY KEY,
  titulo text,
  subtitulo text,
  plan text,
  adjudicacion text,
  valor_unidad numeric,
  cuota_c1 numeric,
  cuota_c2_12 numeric,
  cuota_c13_84 numeric,
  alicuota numeric,
  texto_promo text,
  imagen text,
  texto_legal text
);

TRUNCATE TABLE modelos;

`;

const escape = (str) => {
  if (!str) return '';
  return str.replace(/'/g, "''");
};

const textoLegalEscaped = escape(data.textoLegal);

data.modelos.forEach(m => {
  sql += `INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  '${m.id}',
  '${escape(m.titulo)}',
  '${escape(m.subtitulo)}',
  '${escape(m.plan)}',
  '${escape(m.adjudicacion)}',
  ${m.valorUnidad},
  ${m.cuotas?.c1 || 0},
  ${m.cuotas?.c2_12 || 0},
  ${m.cuotas?.c13_84 || 0},
  ${m.cuotas?.alicuota || 0},
  '${escape(m.textoPromo)}',
  '${escape(m.imagen)}',
  '${textoLegalEscaped}'
);\n`;
});

fs.writeFileSync(path.join(__dirname, 'supabase_setup.sql'), sql);
console.log('SQL file created at supabase_setup.sql');
