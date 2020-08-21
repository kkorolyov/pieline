#!/bin/bash -e

cwd=$(dirname $0)
mapfile -t services <"${cwd}/services.txt"

for service in "${services[@]}"; do
	echo "building $service image..."
	${cwd}/bake/${service}.sh
	echo "$service image done"
done
