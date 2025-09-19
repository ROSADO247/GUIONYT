<!--
Guion Rápido YT - Versión Web sin frameworks
Archivo: index.html (todo en un solo archivo para simplicidad)
-->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guion Rápido YT</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f4f4f4; }
    h1 { text-align: center; }
    .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    textarea { width: 100%; height: 200px; margin: 10px 0; padding: 10px; border-radius: 5px; border: 1px solid #ccc; resize: vertical; }
    button { margin: 5px; padding: 10px 15px; border: none; border-radius: 5px; background: #007BFF; color: white; cursor: pointer; }
    button:hover { background: #0056b3; }
    .output { background: #eef; padding: 10px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Guion Rápido YT</h1>
    <label>Pega enlace de YouTube:</label>
    <input type="text" id="videoUrl" placeholder="https://youtu.be/..." style="width:100%;padding:8px;border-radius:5px;border:1px solid #ccc;">
    <button onclick="getTranscription()">Obtener Guion</button>

    <textarea id="scriptArea" placeholder="Aquí aparecerá tu guion..."></textarea>

    <div>
      <button onclick="applySummary()">Resumir</button>
      <button onclick="applyStyle('dramatic')">Dramático</button>
      <button onclick="applyStyle('comedic')">Cómico</button>
      <button onclick="applyCorrection()">Corrección Ortográfica</button>
      <button onclick="addCTA()">Añadir CTA</button>
      <button onclick="addCliffhanger()">Insertar Cliffhanger</button>
      <button onclick="addAlternateEndings()">Finales Alternativos</button>
      <button onclick="copyScript()">Copiar</button>
      <button onclick="downloadScript()">Descargar</button>
    </div>

    <div class="output" id="output"></div>
  </div>

<script>
// ---------------- Helpers ----------------
function extraerVideoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
  } catch (e) {}
  return null;
}

// ---------------- Transcripción (simulada) ----------------
function getTranscription() {
  const url = document.getElementById('videoUrl').value;
  const vid = extraerVideoId(url);
  if (!vid) return alert('URL no válida');
  const text = `Transcripción simulada para video ${vid}.\n(Reemplazar esta función con API real)`;
  document.getElementById('scriptArea').value = text;
}

// ---------------- Asistencia escritura ----------------
function applySummary() {
  let text = document.getElementById('scriptArea').value;
  const parts = text.split(/[.?!]\s+/);
  document.getElementById('scriptArea').value = parts.slice(0,2).join('. ') + '...';
}

function applyStyle(style) {
  let text = document.getElementById('scriptArea').value;
  if (style === 'dramatic') text = `🎭 ${text} — con tono dramático.`;
  if (style === 'comedic') text = `😂 ${text} — con tono cómico.`;
  document.getElementById('scriptArea').value = text;
}

// ---------------- Corrección básica ----------------
function applyCorrection() {
  let text = document.getElementById('scriptArea').value;
  text = text.replace(/\s{2,}/g, ' ');
  text = text.replace(/\s+([,.!?;:])/g, '$1');
  text = text.replace(/(^|[.!?]\s+)([a-z])/g, (m,p1,p2)=> p1+p2.toUpperCase());
  document.getElementById('scriptArea').value = text;
}

// ---------------- CTA ----------------
const CTAs = [
  'Si te gustó este video, dale like y suscríbete.',
  '¿Quieres la segunda parte? Comenta y comparte.',
  'Activa la campana para no perderte nada.',
  'Descarga el guion en la descripción.',
  'Apoya el canal con un like y comparte.'
];

function addCTA() {
  let text = document.getElementById('scriptArea').value;
  const cta = CTAs[Math.floor(Math.random()*CTAs.length)];
  document.getElementById('scriptArea').value = text + '\n\n' + cta;
}

// ---------------- Cliffhangers ----------------
const Cliffs = [
  'Pero entonces, algo cambió…',
  'Lo que ocurrió después nadie lo esperaba.',
  'Cuando todo parecía resuelto, surgió una sombra.',
  'En ese instante, un sonido lo cambió todo.'
];

function addCliffhanger() {
  let text = document.getElementById('scriptArea').value;
  const cliff = Cliffs[Math.floor(Math.random()*Cliffs.length)];
  document.getElementById('scriptArea').value = text + '\n\n' + cliff;
}

// ---------------- Finales alternativos ----------------
function addAlternateEndings() {
  let text = document.getElementById('scriptArea').value;
  const endings = [
    `Final feliz: ${text.slice(0,100)}...`,
    `Final triste: ${text.slice(0,100)}...`,
    `Final sorpresa: ${text.slice(0,100)}...`
  ];
  document.getElementById('output').innerText = 'Finales alternativos:\n- ' + endings.join('\n- ');
}

// ---------------- Copiar y descargar ----------------
function copyScript() {
  const text = document.getElementById('scriptArea').value;
  navigator.clipboard.writeText(text).then(()=>alert('Copiado al portapapeles'));
}

function downloadScript() {
  const text = document.getElementById('scriptArea').value;
  const blob = new Blob([text], {type:'text/plain'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'guion.txt';
  link.click();
}
</script>
</body>
</html>
