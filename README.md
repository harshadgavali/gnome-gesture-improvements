# Touchpad Gesture Improvements

This extension modifies and extends existing touchpad gestures on GNOME.

## Installation
### Supported Versions
* GNOME Shell 40
### GNOME Extensions 
From [extension#4245](https://extensions.gnome.org/extension/4245/gesture-improvements/).

### GitHub
1. Install extension
```
git clone https://github.com/harshadgavali/gnome-gesture-improvements.git/
cd gnome-gesture-improvements
npm install
npm run update
```
2. Log out and log in **or** just restart session (X11)
3. Enable extension via extensions app or via command line
```
gnome-extensions enable gestureImprovements@gestures
```

## Gestures (including built-in ones)
| Gesture                                     | Modes    | Fingers | Direction       |
| :------------------------------------------ | :------- | :------ | :-------------- |
| Switch windows                              | Desktop  | 3       | Horizontal      |
| Switch workspaces                           | Overview | 2/3     | Horizontal      |
| Switch app pages                            | AppGrid  | 2/3     | Horizontal      |
| Switch workspaces                           | *        | 4       | Horizontal      |
| Desktop/Overview/AppGrid navigation         | *        | 4       | Vertical        |
| Maximize/unmaximize a window                | Desktop  | 3       | Vertical        |
| Snap/half-tile a window                     | Desktop  | 3       | Explained below |


#### For activating tiling gesture
1. Do a 3-finger vertical downward gesture on a unmaximized window
2. Wait a few milliseconds
3. Do a 3-finger horizontal gesture to tile a window to either side


## Customization
* To switch to windows from *all* workspaces using 3-fingers swipes, run 
```
gsettings set org.gnome.shell.window-switcher current-workspace-only false
```

* Add delay to alt-tab gesture, to ensure second windows gets selected when a fast swipe is done
* Change sensitivity of swipe (touchpad swipe speed)
* Revert to 3-finger swipes to switch workspace on desktop (4-fingers to switch windows)
* Revert to 3-finger swipes for overview navigation (4-fingers to maximize/unmaximize/tile)

# Contributors
[@jacksongoode](https://github.com/jacksongoode)

# Thanks
[@ewlsh](https://gitlab.gnome.org/ewlsh) for [Typescript definitions](https://www.npmjs.com/package/@gi-types/glib) for GLib, GObject, ...