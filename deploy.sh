node -v
git pull origin main
yarn install
yarn build
pm2 delete 0
pm2 --name next-me start yarn -- start
