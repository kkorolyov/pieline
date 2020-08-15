#!/bin/bash -e

cwd=$(dirname "$0")
swd=${cwd}/../../..

# prep
. ${cwd}/prep.sh
buildah unshare ${cwd}/mount.sh $container coreutils python pip gcc

# build
buildah copy $container ${swd}/protos /protos
buildah copy $container ${swd}/${service} /${service}
buildah run $container /${service}/build.sh

# configure
buildah config --author "kkorolyov" --env PORT=$port --port $port --entrypoint "python -m ${service//-/}.server" $container

# publish
publish
