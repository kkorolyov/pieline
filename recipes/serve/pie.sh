#!/bin/bash -e

pod="pieline"

run() {
	service="$1"
	shift

	echo "starting $service..."
	podman run -dt --pod $pod --name $service $service
	echo "$service started"
}

podman pod create --name $pod -p 5000:5000

run pie-auth
run pie-users
run pie-gate
