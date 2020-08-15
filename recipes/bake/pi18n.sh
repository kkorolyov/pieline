#!/bin/bash -e

cwd=$(dirname $0)

${cwd}/common/bake-node.sh -s "pi18n" -p ${1:-5003}
