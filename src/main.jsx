import React from "react";
import ReactDOM from "react-dom";
import { compose } from "redux";
import GUI, { AppStateHOC, setAppElement } from "scratch-gui";
import TWStateManagerHOC from "scratch-gui/src/lib/tw-state-manager-hoc.jsx";
import runAddons from "scratch-gui/src/addons/entry.js";

// Tauri webview may not fully support AudioContext; suppress spurious
// "Failed to start the audio device" errors from startaudiocontext.
if (typeof AudioContext !== 'undefined') {
    const _resume = AudioContext.prototype.resume;
    AudioContext.prototype.resume = function () {
        return _resume.call(this).catch(err => {
            console.warn('AudioContext resume failed:', err.message);
        });
    };
}

const MobileGUI = compose(
    AppStateHOC,
    TWStateManagerHOC
)(GUI);

const appTarget = document.getElementById("root");
while (appTarget.firstChild) {
    appTarget.removeChild(appTarget.firstChild);
}

setAppElement(appTarget);

const render = () => ReactDOM.render(
    <MobileGUI
        canEditTitle
        isScratchDesktop
        backpackVisible
        backpackHost="_local_"
        canManageFiles
        canSave
        canCreateNew
        canChangeLanguage
        canChangeTheme
        cloudHost="wss://fake-clouddata-server.turbowarp.org"
        canUseCloud
        canModifyCloudData
    />,
    appTarget
);
render();
runAddons();
export default render
