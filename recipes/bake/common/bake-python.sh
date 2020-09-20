#!/bin/bash -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
install python pip gcc

swd=${cwd}/../../../${service}

# build
pushd $swd
python -m pip install --user wheel -r requirements.txt
rm -rf dist
./protoc.sh
python setup.py bdist_wheel
copy dist dist
popd
run bash -c "python -m pip install --user dist/*"
run rm -rf dist

# configure
config --entrypoint "python -m ${service//-/}.server"

# publish
publish
