const { exec } = require('child_process');
const path = require('path');

const backRivaPath = path.join('backRiva');

// Ejecuta el comando npm run dev en la ruta backRivaPath
const devProcess = exec('npm run dev', { cwd: backRivaPath });

devProcess.stdout.on('data', (data) => {
  // Escucha la salida del proceso
  console.log(`Salida de npm run dev: ${data}`);
  
  // Si el mensaje de "go" se encuentra en la salida, el servidor está listo
  if (data.includes('go')) {
    console.log('El servidor backend se ha levantado correctamente.');
  }
});

devProcess.stderr.on('data', (data) => {
  console.error(`Error en npm run dev: ${data}`);
});

devProcess.on('close', (code) => {
  console.log(`npm run dev se ha cerrado con código: ${code}`);
});
