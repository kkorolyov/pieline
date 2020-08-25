#!/bin/bash -e

# Base buildscript
# Higher level scripts may source this to apply common configuration
# Exports members usable in sourcing scripts:
#  $container - id of the current buildah container
#  install - function invoked with packages to install on the current container
#  copy - function invoked with <fromDir> <toDir> to copy files to the current container
#  run - function invoked with command to execute in the current container
#  config - function invoked with additional config arguments for the current container
#  publish - function to commit the current container and deletes it

author="kkorolyov"

me=$(basename "$0")
cwd=$(dirname "$0")

usage() {
	echo "usage: $me -s <service> -p <port> [-e env=val]"
	echo "	-s	service name"
	echo "	-p	service port"
}

install() {
	buildah unshare ${cwd}/install.sh $container "$@"
}
copy() {
	buildah copy $container "$@"
}
run() {
	buildah run $container "$@"
}
config() {
	buildah config "$@" $container
}
publish() {
	buildah commit $container ${service}
	buildah rm $container
}

while getopts ":s:p:h" opt; do
	case "$opt" in
	s)
		service=$OPTARG
		;;
	p)
		port=$OPTARG
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

if [[ -z $service || -z $port ]]; then
	echo -e "must specify both service and port\n"
	usage
	exit 1
fi

# common prep
container=$(buildah from scratch)
config --author $author --port $port --env PORT=$port
