#!/bin/bash -e

cwd=$(dirname $0)

${cwd}/common/bake-python.sh -s "pie-users"
