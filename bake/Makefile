# user vars
TAG=latest
ARCH:=aarch64 amd64
REGISTRY:=dreg.local
VERIFY=true
SIGN=
CREDS=

# internal vars
services:=pie-gate pie-auth pie-users pie-proj pi18n pie-web
# service types
pi18n:=node
pie-auth:=jvm
pie-gate:=jvm
pie-proj:=jvm
pie-users:=python
pie-web:=js

# funcs
bake=$(foreach arch,$(ARCH),./bake-$(1).sh -s $(2) -a $(arch) -n $(2):$(TAG);)
push=@buildah manifest push --all --tls-verify=$(VERIFY)$(if $(CREDS), --creds=$(CREDS))$(if $(SIGN), --sign-by=$(SIGN)) $(1):$(TAG) docker://$(REGISTRY)/$(1)
rmi=buildah rmi -f $(foreach service,$(1),$(service))

# rules
.PHONY: help all $(services)

define help
Build and publish OCI image for PieLine services

Targets:
make help - view this help
make all - build and publish all services
make <service> - build and publish <service>

Variables [currentValue]:
TAG - tag to apply to built service image - [$(TAG)]
ARCH - space-delimited list of architectures to build for - [$(ARCH)]
REGISTRY - container registry URL to publish to - [$(REGISTRY)]
VERIFY - set to "false" to push to registry without TLS verification - [$(VERIFY)]
SIGN - GPG key to sign pushed images - [$(SIGN)]
CREDS - <username>:<password> combination to authenticate to registry - [$(CREDS)]
endef
export help
help:
	@echo "$$help"

all: $(services)

$(services):
	$(call bake,$($@),$@)
	$(call push,$@)
