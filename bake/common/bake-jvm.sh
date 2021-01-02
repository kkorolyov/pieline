#!/bin/sh -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
install which java-latest-openjdk

swd=${cwd}/../../${service}

# build
pushd ${swd}
./gradlew clean installDist
copy build/install/${service} /$service
popd

config --workingdir "/${service}/bin" --entrypoint "./${service}"

commit
