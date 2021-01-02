#!/bin/sh -e

me=$(basename $0)
cwd=$(dirname $0)

clean=false
registry="dreg.local"

usage() {
	echo "usage: $me [-c] [-r registry] [service]..."
	echo "	-c	clear existing service images"
	echo "	-r	registry hostname to publish built images to - defaults to '$registry'"
}

while getopts ":cr:h" opt; do
	case $opt in
	c)
		clean=true
		;;
	r)
		registry=$opt
		;;
	h)
		echo -e "Builds and publishes OCI images for PieLine services.\n"
		usage
		exit
		;;
	\?)
		echo -e "unknown option: -$OPTARG\n"
		usage
		exit 1
		;;
	:)
		echo -e "-$OPTARG requires an argument\n"
		usage
		exit 1
		;;
	esac
done
shift $((OPTIND - 1))

if [ $# -gt 0 ]; then
	services=("$@")
else
	mapfile -t services <"${cwd}/services"
fi

echo "building [${services[@]}] images for ${registry}..."

for service in "${services[@]}"; do
	tag="${registry}/${service}"

	if $clean; then
		echo "removing existing ${tag}..."
		buildah rmi -f $tag
	fi

	echo "building ${tag}..."

	${cwd}/service/${service}.sh -t $tag
	buildah push --tls-verify=false "$tag"

	echo "$service image done"
done
