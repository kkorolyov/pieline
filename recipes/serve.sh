#!/bin/bash -e

if [ $# -lt 1 ]; then
	echo "requires pod name"
	exit 1
fi

cwd=$(dirname $0)
pod=$1
shift

if [ $# -gt 0 ]; then
	services=$@
else
	mapfile -t services <"${cwd}/services.txt"
fi

for service in "${services[@]}"; do
	echo "starting ${service} in ${pod}..."
	podman run -dt --pod $pod --name $service $service
	echo "$service started"
done
