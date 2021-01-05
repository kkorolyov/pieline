#!/bin/sh -e

cwd=$(dirname "$0")
ver="$1"

if [ -z "$ver" ]; then
	echo "requires a gradle version argument"
	exit 1
fi

for dir in */; do
	if [ -x "${dir}/gradlew" ]; then
		${dir}/gradlew -p $dir wrapper --gradle-version "$ver"
	fi
done
