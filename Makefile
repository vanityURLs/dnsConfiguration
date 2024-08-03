###############################################################################

programName       := dnsConfiguration
programVersion    := 1.0
programSource     := https://github.com/bhdicaire/dnsConfiguration
modifiedBy        := BH Dicaire

SHELL             := /bin/bash
RM                := /bin/rm -f
makeLocation      := `which make`
makeVersion       := `make -v|grep GNU`
goLocation        := `which go`
goVersion         := `go version`
dnsControl        := /opt/homebrew/bin/dnscontrol
dnsControlVersion := `/opt/homebrew/bin/dnscontrol version`
dateStamp         := $(shell date "+%Y%m%d")

normalText        := "\033[0m"
boldText          := "\033[1m"
italicText        := "\033[3m"
tab               := "\t"
2tab              := "\t\t"
tabNormal         := $(tab)$(normalText)
tabBold           := $(tab)$(boldText)

###############################################################################

.PHONY: debug gitArchive

help: ## Show this help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

test: banner ## Preview the modification
	@echo -e  $(boldText)"\n\n##########" $(tab)DNS Control: preview$(tabNormal)"\n"
	@$(dnsControl) preview
	@printf "\n\n"

build: banner ## Push the update to the nameservers
	@echo -e  $(boldText)"\n\n##########" $(tab)DNS Control: push$(tabNormal)"\n"
	@$(dnsControl) push
	@printf "\n\n"

secret:  ## Inject secret via 1Password
	op inject -i creds.json.tpl -o creds.json

commit:
	$(MAKE) triage
	@echo -e  $(boldText)"\n\n##########" $(tab)Git add ${configFile}$(tabNormal)"\n"
	git add ${configFile}
	@echo -e  $(boldText)"\n\n##########" $(tab)Git commit: $(gitMsg)$(tabNormal)"\n"
	git commit -m$(gitMsg)
	@echo -e  $(boldText)"\n\n##########" $(tab)Git push$(tabNormal)"\n"
	git push
	@printf "\n\n"

archive:
	$(MAKE) banner
	$(MAKE) pull
	@echo -e  $(boldText)"\n\n##########" $(tab)Archive ${configFile}$(tabNormal)"\n"
	@mkdir -p archive
	@cp $(configFile) archive/$(dateStamp)" "$(configFile)
	@echo -e  $(boldText)"\n\n##########" $(tab)Git add archive$(tabNormal)"\n"
	@git add archive
	@git commit -m"Update DNS configuration and archive — $(dateStamp)"
	@echo -e  $(boldText)"\n\n##########" $(tab)Git push$(tabNormal)"\n
	@git push
	@printf "\n\n"
	$(MAKE) updateDNS

triage:
	$(MAKE) ticket
	@echo -e  $(boldText)"\n\n##########" $(tab)Git add ${configFile}$(tabNormal)"\n"
	git add ${configFile}
	@echo -e  $(boldText)"\n\n##########" $(tab)Git commit: $(gitMsg)$(tabNormal)"\n"
	git commit -m$(gitMsg)
	@echo -e  $(boldText)"\n\n##########" $(tab)Git push$(tabNormal)"\n"
	git push
	@printf "\n\n"

clean: banner
	@echo -e  $(boldText)"\n##########" $(tab)Remove dnsConfig.json and archive subFolder"\n"$(normalText)
	@$(RM) dnsConfig.json spfcache.json
	@$(RM) -r archive
	@printf "\n\n"

banner:
	@printf "\n\n"
	@echo -e $(normalText)
	@printf "###################################################################################################\n\n"
	@echo -e "\t$(programName) — v$(programVersion)" $(italicText)"with" $(normalText)"$(makeVersion) [$(makeLocation)]\n"
	@echo -e "\tsource:\t\t$(programSource)"
	@printf "\tmodified by:\t$(modifiedBy)\n\n"
	@printf "###################################################################################################\n\n"


ticket:
ifdef ticket
gitMsg = "Update DNS configurations with ticket \#"$(ticket)
else ifdef msg
gitMsg = "Update "${dateStamp} ${configFile}" — "$(msg)
else
gitMsg = "Update DNS configuration — "$(dateStamp)
endif

pull:
	@printf "\n\n"
	@echo -e  $(boldText)"\n##########" $(tab)Git pull$(tabNormal)"\n"
	@git pull
	@echo -e  $(boldText)"\n##########" $(tab)Git status$(tabNormal)"\n"
	@git status
