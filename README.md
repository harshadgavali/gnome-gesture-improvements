# Generate GNOME extension from typescript.
## Things to note.
1. Top level directory of extension (containing extension.ts) should be src/ .
2. javascript files will be generated into build/src/ folder.
3. All folder names should be valid identifier
4. Don't declare 'Me' or 'registerClass' variable.
## How to use.
* Run `npm install` to download dependencies.
* Write your extension's javascript code into src/ folder.
    * Write global types you use into gnome-shell/global.d.ts
    * Modify gnome-shell/index.d.ts to suite your extension (each extension might use different method available from gnome-shell codebase).
* Run `npm run pack` to generate extension zip file under build/
    * You might want to modify Makefile to fit your needs.
    * If you don't use Makefiles    
        * You might want to run `npm run build` and then your custom install script. 