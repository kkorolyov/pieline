# user vars
TAG=latest
ARCH:=aarch64 amd64
REGISTRY:=dreg.local
VERIFY=true
SIGN=
CREDS=

# internal vars
services:=pie-gate pie-auth pie-users pie-proj pi18n pie-web
clean_services:=$(addprefix clean-,$(services))

# funcs
bake=$(foreach arch,$(ARCH),./bake-$(1).sh -s $(2) -a $(arch) -t $(TAG);)
bake_pi18n=$(call bake,node,pi18n)
bake_pie-auth=./bake-jvm.sh -s pie-auth -t $(1)
bake_pie-gate=./bake-jvm.sh -s pie-gate -t $(1)
bake_pie-proj=./bake-jvm.sh -s pie-proj -t $(1)
bake_pie-users=./bake-python.sh -s pie-users -t $(1)
bake_pie-web=./bake-js.sh -s pie-web -t $(1)
push=@buildah manifest push --all --tls-verify=$(VERIFY)$(if $(CREDS), --creds=$(CREDS))$(if $(SIGN), --sign-by=$(SIGN)) $(1) docker://$(REGISTRY)/$(1)
rmi=buildah rmi -f $(foreach service,$(1),$(service))

# rules
.PHONY: help all clean prune $(services) $(clean_services)

define help
Build and publish OCI image for PieLine services

Targets:
make help - view this help
make all - build and publish all services
make clean - remove all service images
make prune - remove dangling images
make <service> - build and publish <service>
make clean-<service> - remove current <service> image

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

clean: prune
	$(call rmi,$(services))

prune:
	buildah rmi -p

$(services):
	$(call bake_$@)
	$(call push,$@)

$(clean_services):
	$(call rmi,$(subst clean-,,$@))
