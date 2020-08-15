# Recipes

Scripts for packaging and running PieLine services.

## Building

The `bake/` folder contains `buildah` scripts for building and packaging services as OCI images.  
[`bake.sh`](bake.sh) will build all images.  

## Running

The `serve/` directory contains `podman` scripts for running [built images](#packaging).  
[`serve.sh`](serve.sh) will run all service images + jaeger all-in-one in a pod.
