#!/bin/sh -e

cwd=$(dirname "$0")

# prep
. ${cwd}/prep.sh
compact=$(sed )
install python-pip gcc

swd=${cwd}/../../${service}

# build
cd $swd
python -m pip install --user wheel -r requirements.txt
rm -rf dist
./protoc.sh
python setup.py bdist_wheel
copy dist dist
cd -
run bash -c "python3 -m pip install --user dist/*"
run rm -rf dist

config --entrypoint "python3 -m $(echo $service | sed s/-//).server"

commit
