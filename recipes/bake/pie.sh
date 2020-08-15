#!/bin/bash -e

cwd=$(dirname $0)
services=(
	"pie-auth"
	"pie-users"
	"pie-gate"
)

for service in "${services[@]}"; do
	echo "building $service image..."
	${cwd}/${service}.sh
	echo "$service image done"
done
