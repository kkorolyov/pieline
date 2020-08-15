#!/bin/bash -e

cwd=$(dirname "$0")
swd=${cwd}/../../..

# prep
. ${cwd}/prep.sh
buildah unshare ${cwd}/mount.sh $container nodejs

# build
pushd ${swd}/${service}
rm -rf build
yarn
yarn build
buildah copy $container build $service
# may be running on a shared folder - buildah copy chokes on copying hefty directories from a shared folder
cp -r node_modules /tmp
buildah copy $container /tmp/node_modules node_modules
popd

# configure
buildah config --author "kkorolyov" --env PORT=$port --port $port --workingdir $service --entrypoint "node server.js" $container

# publish
publish
