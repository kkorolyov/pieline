#!/bin/bash -e

releasever=32
container="$1"
shift

if [ $# -gt 0 ]; then
	mnt=$(buildah mount $container)
	dnf install -y --setopt install_weak_deps=false --setopt cachedir=/var/cache/dnf --installroot $mnt --releasever $releasever "$@"
	buildah unmount $container
fi
