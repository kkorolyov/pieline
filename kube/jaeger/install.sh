#!/bin/sh

cwd=$(dirname $0)

kubectl create ns observability
kubectl create -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/crds/jaegertracing.io_jaegers_crd.yaml
kubectl create -n observability \
	-f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/service_account.yaml \
	-f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/role.yaml \
	-f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/role_binding.yaml \
	-f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/cluster_role.yaml \
	-f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/cluster_role_binding.yaml \
	-f ${cwd}/operator.yaml
