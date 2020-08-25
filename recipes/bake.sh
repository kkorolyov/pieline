#!/bin/bash -e

me=$(basename $0)
cwd=$(dirname $0)

clean=false

usage() {
	echo "usage: $me [-c] [service]..."
	echo "	-c	clear existing service images"
}

while getopts ":ch" opt; do
	case $opt in
	c)
		clean=true
		;;
	h)
		echo -e "Builds OCI images for PieLine services.\n"
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

for service in "${services[@]}"; do
	if $clean; then
		echo "removing existing $service image..."
		buildah rmi -f $service
	fi

	echo "building $service image..."
	${cwd}/bake/${service}.sh
	echo "$service image done"
done
