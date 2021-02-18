#!/bin/sh -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
install which java-latest-openjdk

swd=${cwd}/../${service}

# build
${swd}/gradlew -p $swd clean installDist
copy ${swd}/build/install/${service} /$service

config --workingdir /${service}/bin --entrypoint "./${service}"

commit
