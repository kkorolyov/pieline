#!/bin/sh -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
install libstdc++

swd=${cwd}/../../${service}

# build
yarn=yarn --cwd $swd
$yarn
$yarn clean
$yarn build:bin
copy ${swd}/build/bin /$service

config --workingdir /$service --entrypoint "./$service"

commit
