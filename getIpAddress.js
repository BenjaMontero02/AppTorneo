    const fs = require('fs');
    const os = require('os');
    const path = require('path');
    const { exec } = require('child_process');

    // Obtener la dirección IP IPv4 de la primera interfaz disponible
    function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();

    for (const interfaceName in interfaces) {
        const iface = interfaces[interfaceName];
        for (const alias of iface) {
        if (alias.family === 'IPv4' && !alias.internal) {
            return alias.address;
        }
        }
    }

    return null;
    }

    // Obtener la dirección IP
    const ipAddress = getLocalIPAddress();

    if (ipAddress) {
    // Ruta al archivo next.config.js
    const filePath = path.join('rivadavia2', 'next.config.mjs');
    // Leer el contenido del archivo next.config.js
    const configFileContent = fs.readFileSync(filePath, 'utf-8');

    // Reemplazar la IP actual con la nueva IP
    const newConfigFileContent = configFileContent.replace(/ip:\s*['"][\d.]+['"]/i, `ip: '${ipAddress}'`);

    // Escribir el contenido actualizado en el archivo
    fs.writeFileSync(filePath, newConfigFileContent, 'utf-8');

    console.log(`Dirección IP actualizada en next.config.js: ${ipAddress}`);
    } else {
    console.log('No se pudo encontrar una dirección IP válida.');
    }
