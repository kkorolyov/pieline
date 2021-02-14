#!/bin/sh -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
install yarn

swd=${cwd}/../${service}

# build
yarn="yarn --cwd $swd"
$yarn
$yarn clean
$yarn build
copy ${swd}/build /$service
run yarn --cwd /$service add express

config --workingdir /$service --entrypoint "node server.js"

commit
