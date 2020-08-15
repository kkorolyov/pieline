#!/bin/bash -e

cwd=$(dirname "$0")
swd=${cwd}/../../..

# prep
. ${cwd}/prep.sh
buildah unshare ${cwd}/mount.sh $container coreutils which java-latest-openjdk

# build
pushd ${swd}/${service}
./gradlew installDist
buildah copy $container build/install/${service} $service
popd

# configure
buildah config --author $author --env PORT=$port --port $port --workingdir "${service}/bin" --entrypoint "${service}" $container

# publish
publish
