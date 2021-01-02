#!/bin/sh -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
install yarn

swd=${cwd}/../../${service}

# build
pushd ${swd}
yarn
yarn clean
yarn build
copy build /$service
popd
run yarn --cwd /$service add express

config --workingdir /$service --entrypoint "node server.js"

commit
