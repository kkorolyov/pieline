#!/bin/bash -e

# Base buildscript
# Higher level scripts should source this and apply their own additional build logic

author="kkorolyov"

me=$(basename "$0")
cwd=$(dirname "$0")

usage() {
	echo "usage: $me -s <service> -p <port> [-e env=val]"
	echo "	-s	service name"
	echo "	-p	service port"
	echo "	-e	additional environment variables (e.g. -e foo=bar -e baz=bat)"
}

publish() {
	buildah commit $container ${service}
	buildah rm $container
}

while getopts ":s:p:e:h" opt; do
	case "$opt" in
	s)
		service=$OPTARG
		;;
	p)
		port=$OPTARG
		;;
	e)
		envs+=($OPTARG)
		;;
	h)
		echo -e "Builds OCI images for PieLine services.\n"
		usage
		exit 0
		;;
	\?)
		echo -e "unknown option: -$OPTARG\n"
		usage
		exit 1
		;;
	esac
done
shift $((OPTIND - 1))

if [[ -z $service || -z $port ]]; then
	echo -e "must specify both service and port\n"
	usage
	exit 1
fi

# common prep
container=$(buildah from scratch)
for env in "${envs[@]}"; do
	buildah config --env "$env" $container
done
