#!/bin/bash -e

cwd=$(dirname "$0")
swd=${cwd}/../../..

# prep
. ${cwd}/prep.sh
install yarn

# build
pushd ${swd}/${service}
yarn
yarn clean
yarn build
# may be running on a shared folder - buildah copy chokes on copying hefty directories from a shared folder
cp -r build /tmp
copy /tmp/build $service
popd
run yarn --cwd $service add express

# configure
config --workingdir $service --entrypoint "node server.js"

# publish
publish
