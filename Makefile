
UUID=gestureImprovements@gestures
EXTENSIONDIR=build/extension
BUILDIR=build
ZIPPATH="${PWD}/${BUILDIR}/${UUID}.shell-extension.zip"
UPDATE_CMD = gnome-extensions install -f ${ZIPPATH}
ifdef FLATPAK_ID
	UPDATE_CMD = flatpak-spawn --host gnome-extensions install -f ${ZIPPATH}
endif

pack:
	cp metadata.json $(EXTENSIONDIR)
	cp -r extension/ui extension/schemas $(EXTENSIONDIR)
	glib-compile-schemas ${EXTENSIONDIR}/schemas
	rm -f ${ZIPPATH}
	cd ${EXTENSIONDIR} && zip -r ${ZIPPATH} .

update:
	${UPDATE_CMD}
