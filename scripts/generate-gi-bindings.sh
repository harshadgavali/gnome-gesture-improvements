#!/bin/sh

# generate bindings
npx gi-ts generate \
    --all --importPrefix="@gi-types/" \
    --out=build/@types --outputFormat=folder \
    --versionedImports --versionedOutput \
    --withDocs --emitMetadata

# move adw bindings to @types
cp -r build/@types/adw1 @types/

# cleanup
rm -r build/@types/
