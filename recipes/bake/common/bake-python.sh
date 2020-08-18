#!/bin/bash -e

cwd=$(dirname "$0")
swd=${cwd}/../../..

# prep
. ${cwd}/prep.sh
install python pip gcc

# build
copy ${swd}/protos /protos
copy ${swd}/${service} /${service}
run /${service}/build.sh

# configure
config --entrypoint "python -m ${service//-/}.server"

# publish
publish
