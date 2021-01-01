#!/bin/sh -e

# Buildah package manager install common wrapper
# Can be used in a buildah unshare environment
# Packages are installed using 'dnf'
# Usage: install.sh <container> [package...] 

dnfOpts="-y --setopt cachedir=/var/cache/dnf --setopt reposdir=/etc/yum.repos.d --setopt install_weak_deps=false --setopt tsflags=nodocs --releasever 32"
container="$1"
shift

if [ "$#" -gt 0 ]; then
	mnt=$(buildah mount $container)

	# Try to use the host to install
	if [ -x "$(command -v dnf)" ]; then
		# avoid locale bloat by forcing minimal glibc
		dnf install $dnfOpts --installroot $mnt glibc-minimal-langpack $@
	else
		# If host is not fedora, make your own fedora
		echo "host does not have dnf, making my own dnf..."
		podman run --rm -v $mnt:/mnt registry.fedoraproject.org/fedora bash -c "
	curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo &&
	curl -sL https://rpm.nodesource.com/setup_14.x | bash - &&
	dnf install $dnfOpts --installroot /mnt glibc-minimal-langpack $@
	"
	fi

	buildah unmount $container
fi
