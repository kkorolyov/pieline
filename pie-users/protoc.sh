#!/bin/bash -e

cwd=$(dirname $0)
protoSource="$cwd/../protos"
protoTarget="$cwd/src/lib/proto"

rm -rf $protoTarget
mkdir -p $protoTarget
python -m grpc.tools.protoc -I $protoSource --python_out=$protoTarget --grpc_python_out=$protoTarget $protoSource/*.proto
sed -i -r 's/import (.+_pb2.*)/from . import \1/g' $protoTarget/*_pb2*.py
