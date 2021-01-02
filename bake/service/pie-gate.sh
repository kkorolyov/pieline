#!/bin/sh -e

cwd=$(dirname $0)

# Assume all running in a common pod
${cwd}/../common/bake-jvm.sh -s "pie-gate" "$@"
