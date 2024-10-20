npm run build
rm -rf /var/www/html/ai-dictionary.org
cp -r build /var/www/html/ai-dictionary.org
pm2 delete dictionary-ui
pm2 start npx --name dictionary-ui -- serve -s build -p 5000
sudo systemctl reload nginx