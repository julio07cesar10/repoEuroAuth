npm install prisma --save-dev

npx prisma init

npx prisma db pull

npx prisma generate

git pull origin main   # Integra los cambios remotos
# Resuelve cualquier conflicto si es necesario
git add .              # Agrega los cambios resueltos
git commit -m "Resueltos conflictos después de pull"  # Commit de los cambios resueltos
git push origin main   # Envía los cambios al repositorio remoto

