const { exec } = require('child_process');
const path = require('path');

const frontEndPath = path.join('rivadavia2');

// Ejecuta el comando npm run dev en la ruta backRivaPath
const devProcess = exec('npm run dev', { cwd: frontEndPath });

devProcess.stdout.on('data', (data) => {
  // Escucha la salida del proceso
  console.log(`Salida de npm run dev: ${data}`);
  
  // Si el mensaje de "go" se encuentra en la salida, el servidor está listo
  if (data.includes('ready started server on')) {
    console.log('El servidor frontEnd se ha levantado correctamente.');
  }
});

devProcess.stderr.on('data', (data) => {
  console.error(`Error en npm run dev: ${data}`);
});

devProcess.on('close', (code) => {
  console.log(`npm run dev se ha cerrado con código: ${code}`);
});

