
EXTENSIONDIR=build/extension
BUILDIR=build/

pack:
	cp metadata.json $(EXTENSIONDIR)
	cp -r extension/ui extension/schemas $(EXTENSIONDIR)
	gnome-extensions pack --force \
		--out-dir $(BUILDIR) $(EXTENSIONDIR) \
		--extra-source=constants.js \
		--extra-source=src --extra-source=ui --extra-source=schemas

update:
	gnome-extensions install -f build/*.shell-extension.zip