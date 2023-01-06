node -v
git pull origin main
yarn install --frozen-lockfile
yarn build
yarn deploy
