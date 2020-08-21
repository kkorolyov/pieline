#!/bin/bash -e

cwd=$(dirname $0)
me=$(basename $0)
pod="pieline"
mapfile -t services <"${cwd}/services.txt"

usage() {
	echo "usage: $me [-r serv]"
	echo "	-r	services to re-bake and re-serve (e.g. -r serv -r otherServ)"
}

while getopts ":r:h" opt; do
	case $opt in
	r)
		reloads+=($OPTARG)
		;;
	h)
		echo -e "Serves and reloads PieLine services.\n"
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

if [ -n $reloads ]; then
	for service in "${reloads[@]}"; do
		echo "removing existing ${service}..."
		podman rm -if $service

		${cwd}/bake/${service}.sh
		${cwd}/serve/service.sh $pod $service
	done
else
	pod=$(${cwd}/serve/pod.sh $pod)

	${cwd}/serve/jaeger.sh $pod
	${cwd}/serve/service.sh ${services[@]}
fi
