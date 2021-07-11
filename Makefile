
EXTENSIONDIR=build/src
BUILDIR=build/

pack:
	cp metadata.json $(EXTENSIONDIR)
	gnome-extensions pack --force \
		--out-dir $(BUILDIR) $(EXTENSIONDIR) \
		--extra-source=lib

update: pack
	gnome-extensions install -f build/*.shell-extension.zip