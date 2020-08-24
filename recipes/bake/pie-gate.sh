#!/bin/bash -e

cwd=$(dirname $0)

# Assume all running in a common pod
${cwd}/common/bake-jvm.sh -s "pie-gate" -p ${1:-5000}
