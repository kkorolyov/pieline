#!/bin/bash -e

if [ $# -lt 1 ]; then
	echo "jaeger requires <pod> to attach to"
	exit 1
fi

podman rm -if jaeger
podman run -d --pod "$1" --name jaeger \
	-p 6831:6831/udp \
	-p 6832:6832/udp \
	-p 5778:5778 \
	-p 16686:16686 \
	-p 14268:14268 \
	-p 14250:14250 \
	jaegertracing/all-in-one:1.18
