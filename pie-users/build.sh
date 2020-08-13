#!/bin/bash

pip="pip install --user"
devmode=false

while getopts "d" opt; do
	case $opt in
	d)
		devmode=true
		pip="pip install"
		;;
	esac
done

here=$(dirname $0)
protoSource="$here/../protos"
protoTarget="$here/lib/proto"

$pip grpcio-tools
rm -rf $protoTarget
mkdir -p $protoTarget
python -m grpc.tools.protoc -I $protoSource --python_out=$protoTarget --grpc_python_out=$protoTarget $protoSource/*.proto
sed -i -r 's/import (.+_pb2.*)/from . import \1/g' $protoTarget/*_pb2*.py

if [ $devmode = true ]; then
	$pip -e .
else
	$pip .
fi
