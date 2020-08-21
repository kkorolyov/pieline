#!/bin/bash -e

cwd=$(dirname $0)
pod=$1

podman pod exists $pod && podman pod rm -f $pod
podman pod create --name $pod -p 5000:5000 -p 16686:16686

echo $pod
