#!/bin/bash -e

cwd=$(dirname $0)
me=$(basename $0)
pod="pieline"

clean=false
deployJaeger=false

usage() {
	echo "usage: $me [-p] [-C | -c toClean] [-a toAdd] [-d toRemove] [-t toTemp] [-j]"
	echo "	-p	pod name (default '${pod}')"
	echo "	-C	cleans, rebuilds, and deploys entire pod"
	echo "	-c	cleans, rebuilds, and deploys given services"
	echo "	-a	deploys given service to pod"
	echo "	-d	removes given service from pod"
	echo "	-t	deploys a temporary variant of given service with stdout attached"
	echo "	-j	redeploys jaeger"
}

while getopts ":p:Cc:a:d:t:jh" opt; do
	case $opt in
	p)
		pod=$OPTARG
		;;
	C)
		clean=true
		;;
	c)
		cleans+=($OPTARG)
		;;
	a)
		adds+=($OPTARG)
		;;
	d)
		dels+=($OPTARG)
		;;
	t)
		temp=$OPTARG
		;;
	j)
		deployJaeger=true
		;;
	h)
		echo -e "Manages deployment of PieLine services.\n"
		usage
		exit
		;;
	\?)
		echo -e "unknown option: -$OPTARG\n"
		usage
		exit 1
		;;
	esac
done
shift $((OPTIND - 1))

if $clean; then
	echo "recreating pod..."

	${cwd}/serve/pod.sh $pod
	${cwd}/serve/jaeger.sh $pod

	${cwd}/bake.sh
	${cwd}/serve.sh $pod
fi

if [ -n "$cleans" ]; then
	echo "cleaning ${cleans[@]}..."

	podman rm -if "${cleans[@]}"
	${cwd}/bake.sh "${cleans[@]}"
	${cwd}/serve.sh $pod "${cleans[@]}"
fi

if [ -n "$dels" ]; then
	echo "deleting ${dels[@]}..."

	podman rm -if "${dels[@]}"
fi
if [ -n "$adds" ]; then
	echo "adding ${adds[@]}..."
	
	${cwd}/serve.sh $pod "${adds[@]}"
fi

if $deployJaeger; then
	echo "restarting jaeger..."
	${cwd}/serve/jaeger.sh $pod
fi

if [ -n "$temp" ]; then
	echo "starting temp ${temp}..."
	podman run -it --rm --pod $pod --env-file "${cwd}/env/${temp}" $temp
fi
