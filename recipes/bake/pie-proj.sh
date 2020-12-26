#!/bin/bash -e

cwd=$(dirname $0)

${cwd}/common/bake-jvm.sh -s "pie-proj"
