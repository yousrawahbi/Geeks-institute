const fs = require('fs').promises;

async function readDirectory() {
  try {
    const files = await fs.readdir('.');
    
    console.log('Files in current directory:');
    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    
    return files;
  } catch (error) {
    console.error('Error reading directory:', error.message);
  }
}

readDirectory();