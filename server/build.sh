npm install
pushd ../web-app/
ng build --prod
popd
docker build -t chartman .