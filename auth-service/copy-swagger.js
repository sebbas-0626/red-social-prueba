const fs = require('fs');
const path = require('path');

// Asegurarse de que el directorio dist/config existe
const configDir = path.join(__dirname, 'dist', 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Copiar el archivo swagger.js compilado al directorio dist/config
const srcPath = path.join(__dirname, 'dist', 'config', 'swagger.js');
const destPath = path.join(__dirname, 'dist', 'config', 'swagger.js');

// Verificar si el archivo existe antes de copiarlo
if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, destPath);
} else {
  console.log('El archivo swagger.js no existe en la ruta esperada. Verificando estructura de directorios...');
  
  // Mostrar la estructura de directorios para depuración
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    console.log('Contenido de dist:', fs.readdirSync(distDir));
    
    // Buscar el archivo swagger.js en dist
    const findSwaggerFile = (dir) => {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          findSwaggerFile(fullPath);
        } else if (file.name === 'swagger.js') {
          console.log('Encontrado swagger.js en:', fullPath);
          fs.copyFileSync(fullPath, destPath);
          console.log('Archivo copiado a:', destPath);
          return true;
        }
      }
      return false;
    };
    
    if (!findSwaggerFile(distDir)) {
      console.log('No se encontró el archivo swagger.js en ninguna ubicación.');
    }
  } else {
    console.log('El directorio dist no existe.');
  }
}