npm run build
rm -rf /var/www/html/ai-dictionary.org
cp -r build /var/www/html/ai-dictionary.org
pm2 reload dictionary-ui
sudo systemctl reload nginx