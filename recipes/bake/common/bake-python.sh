#!/bin/bash -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
buildah unshare ${cwd}/mount.sh $container coreutils python pip gcc

# build
buildah copy $container /pie/protos /protos
buildah copy $container /pie/${service} /${service}
buildah run $container /${service}/build.sh

# configure
buildah config --author "kkorolyov" --env PORT=$port --port $port --entrypoint '["python", "-m", "pieusers.server"]' $container

# publish
publish
