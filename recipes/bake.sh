#!/bin/bash -e

cwd=$(dirname $0)
services=(
	"pie-gate"
	"pie-auth"
	"pie-users"
	"pi18n"
)

for service in "${services[@]}"; do
	echo "building $service image..."
	${cwd}/bake/${service}.sh
	echo "$service image done"
done
