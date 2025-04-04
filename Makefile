
UUID=gestureImprovements@gestures
EXTENSIONDIR=build/extension
BUILDIR=build
ZIPPATH=${PWD}/${BUILDIR}/${UUID}.shell-extension.zip
DESTDIR=${HOME}/.local/share/gnome-shell/extensions/${UUID}
UPDATE_CMD = gnome-extensions install -f ${ZIPPATH}
ifdef FLATPAK_ID
	UPDATE_CMD = flatpak-spawn --host gnome-extensions install -f ${ZIPPATH}
endif

pack:
	node ${BUILDIR}/scripts/updateMetadata.js \
		--descriptionREADMEFile=extension_page.md \
		--inFile=metadata.json --outFile=${EXTENSIONDIR}/metadata.json
	cp -r extension/assets/ extension/stylesheet.css extension/ui extension/schemas $(EXTENSIONDIR)
	glib-compile-schemas --strict ${EXTENSIONDIR}/schemas
	rm -f ${ZIPPATH}
	cd ${EXTENSIONDIR} && zip -r ${ZIPPATH} .

update:
	${UPDATE_CMD}

test-ui: build-tests
	gjs -m build/tests/prefs.js