# Base buildscript
# Higher level scripts may source this to apply common configuration
# Exports members usable in sourcing scripts:
#  $container - id of the current buildah container
#  install - function invoked with packages to install on the current container
#  copy - function invoked with <fromDir> <toDir> to copy files to the current container
#  run - function invoked with command to execute in the current container
#  config - function invoked with additional config arguments for the current container
#  publish - function to commit the current container and deletes it

me=$(basename "$0")
cwd=$(dirname "$0")

usage() {
	echo "usage: $me -s <service> -t <tag>"
	echo "	-s	service name"
	echo "	-t	built image's tag"
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
commit() {
	buildah commit $container "$tag"
	buildah rm $container
}

while getopts ":s:t:h" opt; do
	case "$opt" in
	s)
		service=$OPTARG
		;;
	t)
		tag=$OPTARG
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
	:)
		echo -e "-$OPTARG requires an argument\n"
		usage
		exit 1
	esac
done
shift $((OPTIND - 1))

if [ -z $service ]; then
	echo -e "must specify service\n"
	usage
	exit 1
fi
if [ -z $tag ]; then
	echo -e "must specify tag\n"
	usage
	exit 1
fi

# common prep
container=$(buildah from scratch)
