#!/bin/bash -e

cwd=$(dirname $0)

${cwd}/common/bake-jvm.sh -s "pie-auth" -p ${1:-5001} -e ADDR_USERS="localhost:5002"