#!/bin/bash

set -e

me=$(basename "$0")

usage() {
	echo "$me [-e]"
	echo "options:"
	echo "-e	install with 'pip -e'"
}

devmode=false
[ -n "$VIRTUAL_ENV" ] && pip="pip install" || pip="pip install --user"

while getopts ":eh" opt; do
	case $opt in
	e)
		devmode=true
		;;
	h)
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

cwd=$(dirname $0)
protoSource="$cwd/../protos"
protoTarget="$cwd/lib/proto"

$pip grpcio-tools
rm -rf $protoTarget
mkdir -p $protoTarget
python -m grpc.tools.protoc -I $protoSource --python_out=$protoTarget --grpc_python_out=$protoTarget $protoSource/*.proto
sed -i -r 's/import (.+_pb2.*)/from . import \1/g' $protoTarget/*_pb2*.py

if [ $devmode = true ]; then
	$pip -e $cwd
else
	$pip $cwd
	rm -rf $protoTarget
fi
