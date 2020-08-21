#!/bin/bash -e

pod=$1
shift

for service in "$@"; do
	echo "starting ${service}..."
	podman run -dt --pod $pod --name $service $service
	echo "$service started"
done
