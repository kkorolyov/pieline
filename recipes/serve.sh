#!/bin/bash -e

me=$(basename "$0")
cwd=$(dirname $0)

clean=false

usage() {
	echo "usage: $me [-c] [service]..."
	echo "	-c	clear existing deployments first"
}

while getopts ":ch" opt; do
	case $opt in
	c)
		clean=true
		;;
	h)
		echo -e "Deploys local PieLine distribution.\n"
		usage
		exit
		;;
	\?)
		echo -e "unknown option: -$OPTARG\n"
		usage
		exit 1
		;;
	esac
done
shift $((OPTIND - 1))

if [ $# -gt 0 ]; then
	services=("$@")
else
	mapfile -t services <"${cwd}/env/services"
fi
services+=("jaeger")

podman network create pieline || true

for service in "${services[@]}"; do
	if $clean; then
		echo "removing existing $service deployment..."
		podman pod rm -f "${service}-pod-0"
	fi

	echo "deploying $service"
	podman play kube ${cwd}/serve/${service}.yaml --network pieline
	echo "$service deployed"
done
