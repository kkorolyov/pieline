#!/bin/bash -e

me=$(basename "$0")
cwd=$(dirname $0)

clean=false

usage() {
	echo "usage: $me [-c]"
	echo "	-c	clear existing deployment first"
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

if $clean; then
	echo "removing existing deployment..."
	podman pod rm -f pieline
fi

echo "deploying PieLine configuration..."
podman play kube "${cwd}/pieline.yaml"
