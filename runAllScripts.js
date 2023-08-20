const { spawn } = require('child_process');
const opn = require('opn'); // Importa la biblioteca 'open'


const scriptsToRun = [
  'node getIpAddress.js',     // Cambia estos nombres a los de tus archivos
  'node upBackEnd.js',       // Cambia estos nombres a los de tus archivos
  'node upFrontEnd.js'     // Cambia estos nombres a los de tus archivos
];

function runScript(script) {
  return new Promise((resolve, reject) => {
    const parts = script.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    const child = spawn(cmd, args, { stdio: 'inherit' });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Script ${script} exited with code ${code}`));
        return;
      }
      resolve();
    });
  });
}

(async () => {
  for (const script of scriptsToRun) {
    try {
      setTimeout(async () => {
        await runScript(script);
      }, 5000)
    } catch (error) {
      console.error(error);
    }
  }

  setTimeout( () => {
    opn('http://localhost:3000');
  }, 10000);
})();
