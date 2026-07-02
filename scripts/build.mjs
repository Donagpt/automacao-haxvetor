import { access, mkdir, copyFile, rm } from 'node:fs/promises';
for (const file of ['index.html','src/app.js','src/data.js','src/styles.css']) await access(file);
await rm('dist',{recursive:true,force:true}); await mkdir('dist/src',{recursive:true});
await copyFile('index.html','dist/index.html'); await copyFile('src/app.js','dist/src/app.js'); await copyFile('src/data.js','dist/src/data.js'); await copyFile('src/styles.css','dist/src/styles.css');
console.log('Build concluído em dist/');
