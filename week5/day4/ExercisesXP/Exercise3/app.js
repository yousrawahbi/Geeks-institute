const { readFile, writeFile } = require('./fileManager.js');

async function main() {
  try {
    // Read from Hello World.txt
    const content = await readFile('Hello World.txt');
    console.log('File content:', content);
    
    // Write to Bye World.txt
    await writeFile('Bye World.txt', 'Writing to the file');
    console.log('File operations completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();