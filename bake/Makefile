# user vars
REGISTRY:=dreg.local

# internal vars
services:=pie-gate pie-auth pie-users pie-proj pi18n pie-web
clean_services:=$(addprefix clean-,$(services))

# funcs
bake_pi18n=bake-node.sh -s pi18n -t $(1)
bake_pie-auth=bake-jvm.sh -s pie-auth -t $(1)
bake_pie-gate=bake-jvm.sh -s pie-gate -t $(1)
bake_pie-proj=bake-jvm.sh -s pie-proj -t $(1)
bake_pie-users=bake-python.sh -s pie-users -t $(1)
bake_pie-web=bake-js.sh -s pie-web -t $(1)
push=buildah push --tls-verify=false $(1)
rmi=buildah rmi -f $(foreach service,$(1),$(REGISTRY)/$(service))

# rules
.PHONY: help all clean $(services)

define help
Build and publish OCI image for PieLine services

Targets:
make help - view this help
make all - build and publish all services
make clean - remove all service images
make <service> - build and publish <service>
make clean-<service> - remove current <service> image

Variables:
REGISTRY - container registry URL to publish to
endef
export help
help:
	@echo "$$help"

all: $(services)

clean:
	$(call rmi,$(services))

$(services):
	$(eval tag="$(REGISTRY)/$@")
	$(call bake_$@,$(tag))
	$(call push,$(tag))

$(clean_services):
	$(call rmi,$(subst clean-,,$@))
