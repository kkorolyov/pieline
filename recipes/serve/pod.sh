#!/bin/bash -e

if [ $# -lt 1 ]; then
	echo "requires pod name"
	exit 1
fi

cwd=$(dirname $0)
pod=$1

podman pod rm -if $pod
podman pod create --name $pod -p 5000:5000 -p 16686:16686

echo $pod
