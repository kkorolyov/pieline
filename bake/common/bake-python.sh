#!/bin/sh -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
install python-pip gcc

swd=${cwd}/../../${service}

# build
python -m pip install --user wheel -r requirements.txt
rm -rf ${swd}/dist
${swd}/protoc.sh
python ${swd}/setup.py bdist_wheel
copy ${swd}/dist dist
run bash -c "python3 -m pip install --user dist/*"
run rm -rf dist

config --entrypoint "python3 -m ${service//-/}.server"

commit
