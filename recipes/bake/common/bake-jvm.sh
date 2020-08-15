#!/bin/bash -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
buildah unshare ${cwd}/mount.sh $container coreutils which java-latest-openjdk

# build
pushd /pie/${service}
./gradlew installDist
buildah copy $container build/install/${service} /${service}
popd

# configure
buildah config --author $author --env PORT=$port --port $port --entrypoint "${service}/bin/${service}" $container

# publish
publish
