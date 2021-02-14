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
	echo "usage: $me -s <service> -a <architecture> -n <name>"
	echo "	-s	service name"
	echo "	-a	architecture to build for"
	echo "	-n	full image name"
}

install() {
	buildah unshare ${cwd}/install.sh $container "$arch" "$@"
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
	buildah commit --manifest "$name" $container
	buildah rm $container
}

while getopts ":s:a:n:h" opt; do
	case "$opt" in
	s)
		service=$OPTARG
		;;
	a)
		arch=$OPTARG
		;;
	n)
		name=$OPTARG
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
		;;
	esac
done
shift $((OPTIND - 1))

if [ -z $service ]; then
	echo -e "must specify service\n"
	usage
	exit 1
fi
if [ -z $arch ]; then
	echo -e "must specify architecture\n"
	usage
	exit 1
fi
if [ -z $name ]; then
	echo -e "must specify name\n"
	usage
	exit 1
fi

# common prep
container=$(buildah from scratch)
config --arch "$arch"
