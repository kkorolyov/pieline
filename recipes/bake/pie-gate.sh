#!/bin/bash -e

cwd=$(dirname $0)

# Assume all running in a common pod
${cwd}/common/bake-jvm.sh -s "pie-gate" -p ${1:-5000} -e ADDR_AUTH="localhost:5001" -e ADDR_USERS="localhost:5002" -e ADDR_I18N="localhost:5003"
