#!/bin/bash -e

releasever=32
container="$1"
shift

if [ $# -gt 0 ]; then
	mnt=$(buildah mount $container)

	if [ -x "$(command -v dnf)" ]; then
		install="dnf install -y --setopt install_weak_deps=false --setopt cachedir=/var/cache/dnf --installroot $mnt --releasever $releasever"
	elif [ -x "$(command -v apt)" ]; then
		install() {
			apt clean
			apt install -dy "$@"
			dpkg -i /var/cache/apt/archives/*.deb --root=$mnt
		}
	elif [ -x "$(command -v yay)" ]; then
		# TODO Explore this more
		install="yay --root $mnt -S"
	fi

	$install "$@"
	buildah unmount $container
fi
