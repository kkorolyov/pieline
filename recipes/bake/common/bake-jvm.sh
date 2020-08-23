#!/bin/bash -e

cwd=$(dirname "$0")
swd=${cwd}/../../..

# prep
. ${cwd}/prep.sh
install which java-latest-openjdk

# build
pushd ${swd}/${service}
./gradlew clean installDist
copy build/install/${service} $service
popd

# configure
config --workingdir "${service}/bin" --entrypoint "./${service}"

# publish
publish
