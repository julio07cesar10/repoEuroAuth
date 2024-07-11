//NODE JS.
npm install prisma --save-dev
npx prisma init
npx prisma db pull
npx prisma generate

//GitHub: Commits
git pull origin main   # Integra los cambios remotos
# Resuelve cualquier conflicto si es necesario
git add .              # Agrega los cambios resueltos
git commit -m "Resueltos conflictos después de pull"  # Commit de los cambios resueltos
git push origin main   # Envía los cambios al repositorio remoto

//Subir a AZURE
- git remote add azure https://jrojas0710@dev.azure.com/jrojas0710/repoEuroAuth/_git/EUROAUTH
- git remote
- git push azure main

//RENOMBRAR SITIO remoto
-git remote remove azure
-git remote add azure https://jrojas0710@dev.azure.com/jrojas0710/ApiEuroAuth/_git/Código%20Fuente
