#!/bin/sh

# first argument is extra data dirs to add
function generate_bindings {
    NEW_XDG_DATA_DIRS="$XDG_DATA_DIRS"
    if [ -n "$1" ]; then
        NEW_XDG_DATA_DIRS="$1:$NEW_XDG_DATA_DIRS"
    fi
    env XDG_DATA_DIRS="$NEW_XDG_DATA_DIRS" \
        npx gi-ts generate \
        --all --importPrefix="@gi-types/" \
        --out=build/@types --outputFormat=folder \
        --versionedImports --versionedOutput \
        --withDocs --emitMetadata
}

# generate bindings

generate_bindings "/usr/lib64/mutter-12/:/usr/lib64/gnome-shell/"
generate_bindings   # needs to generate again, cause some conflict adw1 bindings are not generated with above command

# move bindings to @types
mkdir -p @types/
for pkg in meta12 clutter12 st12 shell12 adw1; do
    if [ -d "build/@types/${pkg}" ]; then
        cp -vr "build/@types/${pkg}" @types/
    fi
done

# cleanup
# rm -r build/@types/
