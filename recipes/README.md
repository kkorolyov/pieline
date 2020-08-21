# Recipes

Scripts for packaging and running PieLine services.

## Building

The `bake/` folder contains `buildah` scripts for building and packaging services as OCI images.  
[`bake.sh`](bake.sh) will build images for given services (or all known services if none provided).

## Running

The `serve/` directory contains `podman` scripts for running [built images](#packaging).  
[`serve.sh`](serve.sh) will run given services (or all known services if none provided) in a given pod.  
[`deploy.sh`](deploy.sh) creates and manages pod services.
