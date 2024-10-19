npm run build
pm2 delete dictionary-ui
pm2 start npx --name dictionary-ui -- serve -s build -p 5000