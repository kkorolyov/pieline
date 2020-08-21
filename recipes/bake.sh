#!/bin/bash -e

cwd=$(dirname $0)

if [ $# -gt 0 ]; then
	services=$@
else
	mapfile -t services <"${cwd}/services.txt"
fi

for service in "${services[@]}"; do
	echo "building $service image..."
	${cwd}/bake/${service}.sh
	echo "$service image done"
done
