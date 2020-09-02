#!/bin/bash -e

cwd=$(dirname "$0")
swd=${cwd}/../../..

# prep
. ${cwd}/prep.sh
install yarn

# build
pushd ${swd}/${service}
yarn
yarn clean
yarn build
copy build $service
popd
run yarn global add serve

# configure
# TODO Define runtime vars at a higher level
config --workingdir $service --entrypoint 'echo "window.ADDR_GATE=\"$ADDR_GATE\";" >> env.js && serve -l $PORT'

# publish
publish
