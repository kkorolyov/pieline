#!/bin/bash -e

cwd=$(dirname $0)
pod="pieline"

run() {
	service="$1"
	shift

	echo "starting $service..."
	podman run -dt --pod $pod --name $service $service
	echo "$service started"
}

podman pod exists $pod && podman pod rm -f $pod
podman pod create --name $pod -p 5000:5000 -p 16686:16686

run pie-gate
run pie-auth
run pie-users
run pi18n

echo $pod
