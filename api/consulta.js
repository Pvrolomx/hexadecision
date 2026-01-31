import crypto from 'crypto';

const HEXAGRAMAS = [
  {n:1, nombre:"Lo Creativo", clave:"Fuerza, iniciativa"},
  {n:2, nombre:"Lo Receptivo", clave:"Receptividad, aceptación"},
  {n:3, nombre:"La Dificultad Inicial", clave:"Comienzos difíciles"},
  {n:4, nombre:"La Necedad Juvenil", clave:"Aprendizaje, humildad"},
  {n:5, nombre:"La Espera", clave:"Paciencia, espera activa"},
  {n:6, nombre:"El Conflicto", clave:"Disputa, mediación"},
  {n:7, nombre:"El Ejército", clave:"Disciplina, liderazgo"},
  {n:8, nombre:"La Solidaridad", clave:"Unión, cooperación"},
  {n:9, nombre:"La Fuerza Domesticadora Menor", clave:"Restricción suave"},
  {n:10, nombre:"El Porte", clave:"Conducta correcta"},
  {n:11, nombre:"La Paz", clave:"Armonía, prosperidad"},
  {n:12, nombre:"El Estancamiento", clave:"Bloqueo, paciencia"},
  {n:13, nombre:"Comunidad con los Hombres", clave:"Fraternidad"},
  {n:14, nombre:"La Gran Posesión", clave:"Abundancia"},
  {n:15, nombre:"La Modestia", clave:"Humildad, servicio"},
  {n:16, nombre:"El Entusiasmo", clave:"Alegría, motivación"},
  {n:17, nombre:"El Seguimiento", clave:"Adaptación"},
  {n:18, nombre:"El Trabajo en lo Echado a Perder", clave:"Reparación"},
  {n:19, nombre:"El Acercamiento", clave:"Aproximación"},
  {n:20, nombre:"La Contemplación", clave:"Observación"},
  {n:21, nombre:"La Mordedura Tajante", clave:"Decisión, justicia"},
  {n:22, nombre:"La Gracia", clave:"Belleza, forma"},
  {n:23, nombre:"La Desintegración", clave:"Deterioro, soltar"},
  {n:24, nombre:"El Retorno", clave:"Renovación, ciclo"},
  {n:25, nombre:"La Inocencia", clave:"Espontaneidad"},
  {n:26, nombre:"La Fuerza Domesticadora Grande", clave:"Acumulación"},
  {n:27, nombre:"Las Comisuras de la Boca", clave:"Nutrición"},
  {n:28, nombre:"La Preponderancia de lo Grande", clave:"Exceso, presión"},
  {n:29, nombre:"Lo Abismal", clave:"Peligro, profundidad"},
  {n:30, nombre:"Lo Adherente", clave:"Claridad, luz"},
  {n:31, nombre:"El Influjo", clave:"Atracción, conexión"},
  {n:32, nombre:"La Duración", clave:"Constancia, persistir"},
  {n:33, nombre:"La Retirada", clave:"Retroceder"},
  {n:34, nombre:"El Poder de lo Grande", clave:"Fuerza, moderación"},
  {n:35, nombre:"El Progreso", clave:"Avance"},
  {n:36, nombre:"El Oscurecimiento de la Luz", clave:"Ocultarse"},
  {n:37, nombre:"El Clan", clave:"Familia, armonía"},
  {n:38, nombre:"El Antagonismo", clave:"Oposición"},
  {n:39, nombre:"El Obstáculo", clave:"Dificultad, pausa"},
  {n:40, nombre:"La Liberación", clave:"Solución, alivio"},
  {n:41, nombre:"La Merma", clave:"Disminuir, sacrificio"},
  {n:42, nombre:"El Aumento", clave:"Crecimiento"},
  {n:43, nombre:"El Desbordamiento", clave:"Resolución"},
  {n:44, nombre:"Ir al Encuentro", clave:"Tentación, cautela"},
  {n:45, nombre:"La Reunión", clave:"Congregar"},
  {n:46, nombre:"La Subida", clave:"Ascenso gradual"},
  {n:47, nombre:"El Agotamiento", clave:"Opresión, limitación"},
  {n:48, nombre:"El Pozo", clave:"Recursos, comunidad"},
  {n:49, nombre:"La Revolución", clave:"Cambio, transformación"},
  {n:50, nombre:"El Caldero", clave:"Nutrición, cultura"},
  {n:51, nombre:"Lo Suscitativo", clave:"Conmoción, despertar"},
  {n:52, nombre:"El Aquietamiento", clave:"Quietud, meditación"},
  {n:53, nombre:"El Desarrollo", clave:"Progreso gradual"},
  {n:54, nombre:"La Desposada", clave:"Subordinación"},
  {n:55, nombre:"La Plenitud", clave:"Abundancia, cenit"},
  {n:56, nombre:"El Andariego", clave:"Viaje"},
  {n:57, nombre:"Lo Suave", clave:"Penetración"},
  {n:58, nombre:"Lo Sereno", clave:"Alegría"},
  {n:59, nombre:"La Disolución", clave:"Dispersión"},
  {n:60, nombre:"La Restricción", clave:"Límites"},
  {n:61, nombre:"La Verdad Interior", clave:"Sinceridad"},
  {n:62, nombre:"La Preponderancia de lo Pequeño", clave:"Modestia"},
  {n:63, nombre:"Después de la Consumación", clave:"Completitud"},
  {n:64, nombre:"Antes de la Consumación", clave:"Transición"}
];

function isGibberish(text) {
  if (!text || typeof text !== 'string') return true;
  const cleaned = text.trim().toLowerCase();
  if (cleaned.length < 3) return true;
  if (!/[a-záéíóúñ]/i.test(cleaned)) return true;
  if (/(.)\\1{3,}/.test(cleaned)) return true;
  const vowels = (cleaned.match(/[aeiouáéíóú]/gi) || []).length;
  const consonants = (cleaned.match(/[bcdfghjklmnñpqrstvwxyz]/gi) || []).length;
  if (consonants > 0 && vowels === 0) return true;
  if (/qwert|asdf|zxcv|wasd/i.test(cleaned)) return true;
  return false;
}

function generarHexagrama(pregunta, seed = 0) {
  const texto = `${pregunta}${seed}`;
  const hash = crypto.createHash('sha256').update(texto).digest('hex');
  const numero = (parseInt(hash.slice(0, 8), 16) % 64) + 1;
  return { numero, hash: hash.slice(0, 16) };
}

function calcularLectura(pregunta) {
  const { numero: primario, hash: hashPrimario } = generarHexagrama(pregunta, 0);
  const { numero: secundario, hash: hashSecundario } = generarHexagrama(pregunta, 1);
  
  const binarioPrimario = (primario - 1).toString(2).padStart(6, '0');
  const binarioSecundario = (secundario - 1).toString(2).padStart(6, '0');
  
  const cambio = (primario - 1) ^ (secundario - 1);
  const lineasMoviles = [];
  for (let i = 0; i < 6; i++) {
    if ((cambio >> (5 - i)) & 1) lineasMoviles.push(i + 1);
  }
  const intensidadCambio = Math.round((lineasMoviles.length / 6) * 100);

  return {
    hexagramaPrimario: primario,
    hexagramaSecundario: secundario,
    binarioPrimario,
    binarioSecundario,
    lineasMoviles,
    intensidadCambio,
    verificacion: { hashPrimario, hashSecundario, decimalPrimario: parseInt(hashPrimario.slice(0, 8), 16) }
  };
}

async function obtenerInterpretacion(pregunta, lectura) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return "Interpretación no disponible.";
  }

  const h1 = HEXAGRAMAS[lectura.hexagramaPrimario - 1];
  const h2 = HEXAGRAMAS[lectura.hexagramaSecundario - 1];

  const prompt = `Pregunta del usuario: "${pregunta}"

Hexagrama: #${lectura.hexagramaPrimario} ${h1.nombre} → #${lectura.hexagramaSecundario} ${h2.nombre}
Intensidad de cambio: ${lectura.intensidadCambio}%

RESPONDE EN EXACTAMENTE 3 ORACIONES:
1. Respuesta directa a su pregunta (sí/no/depende + por qué)
2. Qué debe hacer concretamente
3. Qué evitar

No uses lenguaje místico. Sé directo como un consejero pragmático.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    return data.content?.[0]?.text || "Medita sobre tu pregunta.";
  } catch (error) {
    return `${h1.nombre} transformándose en ${h2.nombre}.`;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pregunta } = req.body;
    if (isGibberish(pregunta)) {
      return res.status(400).json({ error: 'Escribe una pregunta válida.' });
    }

    const lectura = calcularLectura(pregunta);
    const interpretacion = await obtenerInterpretacion(pregunta, lectura);

    return res.status(200).json({ ...lectura, interpretacion });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno.' });
  }
}
