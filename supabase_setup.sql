
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

INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'argo_drive_70_30',
  'ARGO',
  'Drive 1.3',
  'PLAN 70/30',
  'EN CUOTA 2, 4, 6 Y 12',
  29930000,
  600000,
  399341,
  301744,
  249417,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2, 4, 6 y 12 con el 30%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/argo.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'cronos_drive_70_30',
  'CRONOS',
  'Drive 1.3 Mts - Pack Plus',
  'PLAN 70/30',
  'EN CUOTA 2, 4, 9 Y 12',
  37210000,
  696000,
  465208,
  375139,
  310083,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2 con el 20% - 10% restante se prorratea en 24 cuotas, 4, 9 y 12 con el 30%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/cronos.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'cronos_drive_80_20',
  'CRONOS',
  'Drive 1.3 Mts - Pack Plus',
  'PLAN 80/20',
  'EN CUOTA 2, 6, 9 Y 12',
  37210000,
  796000,
  528597,
  424796,
  354381,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2, 6, 9 y 12 con el 20%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/cronos.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'cronos_drive_90_10',
  'CRONOS',
  'Drive 1.3 Mts - Pack Plus',
  'PLAN 90/10',
  'EN CUOTA 2 Y 10',
  37210000,
  940000,
  595790,
  474454,
  398679,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2 y 10 con el 20%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/cronos.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'fastback_turbo_70_30',
  'FASTBACK',
  'Turbo 270 At6',
  'PLAN 70/30',
  'EN CUOTA 2, 4, 6 Y 12',
  45540000,
  770000,
  544376,
  480390,
  379500,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2, 4, 6 y 12 con el 30%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/fastback.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'fiorino_endurance_70_30',
  'FIORINO',
  'Endurance 1.3 Mt My24',
  'PLAN 70/30',
  'EN CUOTA 2, 4, 6 Y 12',
  29460000,
  580000,
  393070,
  297006,
  245500,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2, 4, 6 y 12 con el 30%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/fiorino.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'mobi_trekking_80_20',
  'MOBI',
  'Trekking',
  'PLAN 80/20',
  'EN CUOTA 6 Y 12',
  27210000,
  480000,
  327313,
  310635,
  259143,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN DIRECTA en cuota 6 y 12 (30%).
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/mobi.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'pulse_drive_70_30',
  'PULSE',
  'Drive 1.3 Mt',
  'PLAN 70/30',
  'EN CUOTA 2, 4, 6 Y 12',
  36860000,
  696000,
  491805,
  371610,
  307167,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2, 4, 6 y 12 con el 30%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/pulse.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'strada_freedom_70_30',
  'STRADA',
  'Freedom CD 1.3 Mt',
  'PLAN 70/30',
  'EN CUOTA 2, 6 Y 12',
  37710000,
  740000,
  503146,
  380180,
  314250,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2 con el 35%, 6 y 12 con el 35%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/strada.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'titano_freedom_60_40',
  'TITANO',
  'Freedom Mt',
  'PLAN 60/40',
  'EN CUOTA 2, 4, 6 Y 12',
  58540000,
  900000,
  606883,
  512058,
  418143,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2 con el 20% - 20% restante se prorratea hasta 24 cuotas. 4, 6 y 12 con el 40%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/titano.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
INSERT INTO modelos (id, titulo, subtitulo, plan, adjudicacion, valor_unidad, cuota_c1, cuota_c2_12, cuota_c13_84, alicuota, texto_promo, imagen, texto_legal) VALUES (
  'toro_freedom_70_30',
  'TORO',
  'Freedom 1.3 At6',
  'PLAN 70/30',
  'EN CUOTA 2, 4, 6 Y 12',
  47490000,
  840000,
  598493,
  500960,
  395750,
  'Aprovechá esta promoción que FIAT tiene para vos:
Financiado en 84 CUOTAS, 0% interés, precio directo de fábrica sólo con tu DNI.
ADJUDICACIÓN ESPECIAL en cuota 2 con el 30%, 4, 6 y 12 con el 30%.
Gastos de entrega: 10% del valor de la unidad (aproximadamente). Puede ser FINANCIADO CON TARJETA DE CRÉDITO.',
  'assets/autos/toro.png',
  '*El presente presupuesto tiene una validez de 5 (cinco) días y es estimativo y aproximado. El mismo no resulta vinculante pues se encuentra sujeto a las variaciones del valor móvil, tal cual lo expresado en párrafos anteriores. *El precio corresponde al equipamiento de serie del modelo presupuestado, no incluye opcionales no detallados específicamente. *Las promociones y/o bonificaciones pueden ser modificadas y/o suprimidas sin previo aviso. *El precio cotizado no incluye gastos de flete, patentamiento e inscripción de prenda. *Los plazos de entrega están sujetos a envíos del importador y/o fabricante. *Los precios corresponden a valores de listas a tiempo de la confección del presupuesto; sujeto a las modificaciones que surjan al tiempo de entrega. *Los importes de las cuotas están referidos en valores aproximados expresados en relación al valor móvil de la unidad a la fecha del presupuesto, incluidas las bonificaciones existentes en ese momento. *No incluye seguros. *Las imágenes son a modo ilustrativo. *Para acceder a la ADJUDICACIÓN PACTADA, deberá tener pagadas las cuotas en tiempo y forma. Tener fondos suficientes en la Tarjeta de Crédito o Cuenta Bancaria al momento del débito es de su responsabilidad. *Las 84 cuotas financian el 70% del valor de la unidad.'
);
