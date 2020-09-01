# Recipes

Scripts for packaging and running PieLine services.

## Building

The `bake/` folder contains `buildah` scripts for building and packaging services as OCI images.  
[`bake.sh`](bake.sh) will build images for given services (or all known services if none provided).

## Running

[`serve.sh`](serve.sh) will create a `pieline` deployment on `podman`.  
