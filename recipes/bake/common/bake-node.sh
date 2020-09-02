#!/bin/bash -e

cwd=$(dirname "$0")
swd=${cwd}/../../..

# prep
. ${cwd}/prep.sh
install nodejs

# build
pushd ${swd}/${service}
yarn
yarn clean
yarn build
copy build $service
# may be running on a shared folder - buildah copy chokes on copying hefty directories from a shared folder
cp -r node_modules /tmp
copy /tmp/node_modules node_modules
popd

# configure
config --workingdir $service --entrypoint "node server.js"

# publish
publish
