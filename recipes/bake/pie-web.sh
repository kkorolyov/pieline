#!/bin/sh -e

cwd=$(dirname $0)

${cwd}/common/bake-js.sh -s "pie-web"
