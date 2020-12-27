#!/bin/bash -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
install libstdc++

swd=${cwd}/../../../${service}

# build
pushd ${swd}
yarn
yarn clean
yarn build:bin
copy build/bin $service
popd

# configure
config --workingdir $service --entrypoint "./$service"

# publish
publish
