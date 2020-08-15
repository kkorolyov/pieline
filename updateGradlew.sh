#!/bin/bash

set -e

projects=("pie-auth" "pie-gate")

for project in "${projects[@]}"; do
	cp gradle-version ${project}/
	
	pushd ${project}
	./gradlew wrapper
	popd

	echo "updated $project"
done
