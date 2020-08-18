#!/bin/bash -e

cwd=$(dirname $0)

pod=$(${cwd}/serve/pie.sh)
${cwd}/serve/jaeger.sh $pod
