// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gmPuC":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"h7u1C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _boomsheetsAnimations = require("./boomsheets-animations");
var _fileLoading = require("./file-loading");
var _frameOrganizerWorkspace = require("./frame-organizer-workspace");
var _frameOrganizerWorkspaceDefault = parcelHelpers.interopDefault(_frameOrganizerWorkspace);
var _inputSheets = require("./input-sheets");
const canvas = document.querySelector("#input canvas");
const workspace = new (0, _frameOrganizerWorkspaceDefault.default)(canvas);
const pendingSheet = {};
function logError(error) {
    console.error(error);
    alert(error);
}
document.getElementById("bake-button").onclick = function() {
    const canvas = document.querySelector("#output canvas");
    const textarea = document.querySelector("#output textarea");
    try {
        workspace.renderOutput(canvas);
        textarea.value = workspace.serializeSheet();
    } catch (error) {
        logError(error);
    }
};
document.body.addEventListener("dragover", (event)=>event.preventDefault());
document.body.addEventListener("drop", (event)=>{
    const items = event.dataTransfer?.items;
    if (!items) return;
    event.preventDefault();
    const files = [];
    for (const item of items){
        const file = item.getAsFile();
        if (file) files.push(file);
    }
    loadFiles(files).catch(logError).finally(()=>{
        const errorMessage = (0, _inputSheets.resolveSingleErrorMessage)(pendingSheet);
        const errorElement = document.querySelector("#input .error-text");
        errorElement.innerText = errorMessage || "";
        if (!errorMessage) workspace.loadSheet(pendingSheet);
    });
});
async function loadFiles(files) {
    for (const file of files){
        if (file.name.endsWith(".png")) try {
            pendingSheet.image = await (0, _fileLoading.loadImageFile)(file);
            pendingSheet.imageError = undefined;
        } catch (error) {
            console.error(error);
            pendingSheet.imageError = error.toString();
        }
        else if (file.name.endsWith(".animation")) try {
            const text = await (0, _fileLoading.loadTextFile)(file);
            pendingSheet.animations = (0, _boomsheetsAnimations.parseAnimationsText)(text);
            pendingSheet.animationError = undefined;
        } catch (error) {
            console.error(error);
            pendingSheet.animationError = error.toString();
        }
    }
}

},{"./boomsheets-animations":"83wx1","./file-loading":"3i1Z4","./input-sheets":"1NqgS","./frame-organizer-workspace":"irsZW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"83wx1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseAnimationsText", ()=>parseAnimationsText);
parcelHelpers.export(exports, "serializeAnimations", ()=>serializeAnimations);
var _quoteUnquote = require("quote-unquote");
const nonSpaceRegex = /\S/g;
const keyEndRegex = /[\s=]/g;
function matchGRegexFrom(text, regex, index) {
    regex.lastIndex = index;
    return regex.exec(text);
}
function stringCharIsEscaped(text, index) {
    let escaped = false;
    while(index > 0){
        index -= 1;
        if (text[index] != "\\") break;
        escaped = !escaped;
    }
    return escaped;
}
function findClosingQuote(text, index) {
    // search for non escaped quote
    while(true){
        if ((index = text.indexOf('"', index)) < 0) return -1;
        if (!stringCharIsEscaped(text, index)) break;
        index += 1;
    }
    return index;
}
function parseAttributes(line, lineNumber) {
    const attributes = {};
    let index = line.indexOf(" ");
    if (index < 0) // no attributes
    return attributes;
    let match;
    while(match = matchGRegexFrom(line, nonSpaceRegex, index)){
        index = match.index;
        // find key end
        match = matchGRegexFrom(line, keyEndRegex, index);
        if (!match) throw new Error(`Unexpected "${line.slice(index)}" on line ${lineNumber}`);
        const key = line.slice(index, match.index);
        // find "="
        const eqIndex = line.indexOf("=", match.index);
        if (eqIndex < 0) throw new Error(`Attribute is missing "=" on line ${lineNumber}`);
        // find value start
        match = matchGRegexFrom(line, nonSpaceRegex, eqIndex + 1);
        if (!match) throw new Error(`Attribute is missing value on line ${lineNumber}`);
        // find value end
        let valueStart = match.index;
        let value = "";
        if (line[valueStart] == '"') {
            // quoted value
            let valueEnd = findClosingQuote(line, valueStart + 1);
            if (valueEnd < 0) throw new Error(`String missing closing quote on line ${lineNumber}`);
            valueEnd += 1;
            value = (0, _quoteUnquote.unquote)(line.slice(valueStart, valueEnd));
            index = valueEnd;
        } else {
            // no quotes
            let valueEnd = line.indexOf(" ", valueStart);
            if (valueEnd < 0) valueEnd = line.length;
            value = line.slice(valueStart, valueEnd);
            index = valueEnd;
        }
        attributes[key] = value;
    }
    return attributes;
}
function parseAnimationsText(text) {
    const animations = [];
    let lineNumber = 0;
    let currentAnimation;
    let currentFrame;
    for (let line of text.split("\n")){
        line = line.trim();
        lineNumber += 1;
        if (line == "" || line.startsWith("#") || line.startsWith("imagePath") || line.startsWith("version")) continue;
        if (line.startsWith("animation ")) {
            const attributes = parseAttributes(line, lineNumber);
            const animation = {
                state: attributes.state,
                frames: []
            };
            if (!attributes.state) throw new Error(`Animation is missing state name on line ${lineNumber}`);
            animations.push(animation);
            currentAnimation = animation;
        } else if (line.startsWith("frame ") || line.startsWith("blank ")) {
            if (!currentAnimation) throw new Error(`No animation state to associate frame with on line ${lineNumber}`);
            const attributes = parseAttributes(line, lineNumber);
            const frame = {
                x: parseFloat(attributes.x) || 0,
                y: parseFloat(attributes.y) || 0,
                w: parseFloat(attributes.w) || 0,
                h: parseFloat(attributes.h) || 0,
                originx: parseFloat(attributes.originx) || 0,
                originy: parseFloat(attributes.originy) || 0,
                flipx: parseInt(attributes.flipy) || 0,
                flipy: parseInt(attributes.flipy) || 0,
                duration: attributes.duration || "",
                points: []
            };
            currentAnimation.frames.push(frame);
            currentFrame = frame;
        } else if (line.startsWith("point ")) {
            if (!currentFrame) throw new Error(`No frame to associate point with on line ${lineNumber}`);
            const attributes = parseAttributes(line, lineNumber);
            if (!attributes.label) throw new Error(`Point is missing label on line ${lineNumber}`);
            const point = {
                label: attributes.label,
                x: parseFloat(attributes.x),
                y: parseFloat(attributes.y)
            };
            currentFrame.points.push(point);
        } else {
            const wordEnd = line.indexOf(" ");
            const word = wordEnd < 0 ? line : line.slice(0, wordEnd);
            throw new Error(`Unexpected "${word}" on line ${lineNumber}`);
        }
    }
    return animations;
}
function serializeObject(name, object) {
    const text = [
        name
    ];
    for(const key in object){
        const value = object[key];
        switch(typeof value){
            case "string":
                if (value != "") {
                    text.push(" ");
                    text.push(key);
                    text.push("=");
                    text.push((0, _quoteUnquote.double)(value));
                }
                break;
            case "number":
                if (value != 0) text.push(` ${key}=${value}`);
                break;
            case "boolean":
                if (value == true) {
                    text.push(" ");
                    text.push(key);
                    text.push("=1");
                }
                break;
            case "object":
                if (Array.isArray(value)) break;
            default:
                throw new Error(`Unexpected ${typeof value} for ${key}`);
        }
    }
    return text.join("");
}
function serializeAnimations(animations) {
    const lines = [];
    for (const animation of animations){
        lines.push(serializeObject("animation", animation));
        for (const frame of animation.frames){
            lines.push(serializeObject("frame", frame));
            for (const point of frame.points)lines.push(serializeObject("point", point));
        }
        lines.push("");
    }
    return lines.join("\n");
}

},{"quote-unquote":"e2Ij8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e2Ij8":[function(require,module,exports) {
var single = exports.single = function(s) {
    return "'" + s.replace(/\\|'/g, function(m) {
        return "\\" + m;
    }) + "'";
};
var double = exports.double = function(s) {
    return '"' + s.replace(/\\|"/g, function(m) {
        return "\\" + m;
    }) + '"';
};
exports.quote = function(s) {
    return /'/.test(s) ? double(s) : single(s);
};
exports.unquote = function(s) {
    var quote = s[0];
    var single = quote === "'";
    return s.substring(1, s.length - 1).replace(/\\\\/g, "\\").replace(single ? /\\'/g : /\\"/g, quote);
};

},{}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3i1Z4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadImageFile", ()=>loadImageFile);
parcelHelpers.export(exports, "loadTextFile", ()=>loadTextFile);
function loadImageFile(file) {
    return new Promise((resolve, reject)=>{
        // load file as data url, then load as image
        const reader = new FileReader();
        reader.onload = function() {
            // load image
            const image = new Image();
            image.src = reader.result;
            image.onload = function() {
                resolve(image);
            };
            image.onerror = function() {
                reject(new Error(`Failed to load "${file.name}"`));
            };
        };
        reader.onerror = function() {
            reject(new Error(`Failed to load "${file.name}: ${reader.error}"`));
        };
        reader.readAsDataURL(file);
    });
}
function loadTextFile(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result);
        };
        reader.onerror = function() {
            reject(new Error(`Failed to load "${file.name}: ${reader.error}"`));
        };
        reader.readAsText(file);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1NqgS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resolveSingleErrorMessage", ()=>resolveSingleErrorMessage);
function resolveSingleErrorMessage(sheet) {
    if (sheet.animationError) return sheet.animationError;
    else if (sheet.imageError) return sheet.imageError;
    else if (!sheet.animations) return "Missing .animation file";
    else if (!sheet.image) return "Missing image file";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"irsZW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _binPack = require("bin-pack");
var _binPackDefault = parcelHelpers.interopDefault(_binPack);
var _boomsheetsAnimations = require("./boomsheets-animations");
var _groupFrames = require("./group-frames");
var _groupFramesDefault = parcelHelpers.interopDefault(_groupFrames);
var _rect = require("./rect");
class FrameOrganizerWorkspace {
    #sheet;
    #frameGroups;
    #selectedGroups;
    #canvas;
    #ctx;
    #frameCanvas;
    #frameCtx;
    #expandingSelection;
    #mouseDown;
    #selectionRect;
    #dragStartX;
    #dragStartY;
    constructor(canvas){
        this.#sheet = {};
        this.#frameGroups = [];
        this.#selectedGroups = [];
        this.#expandingSelection = false;
        this.#mouseDown = false;
        this.#dragStartX = 0;
        this.#dragStartY = 0;
        this.#canvas = canvas;
        this.#ctx = canvas.getContext("2d");
        this.#frameCanvas = document.createElement("canvas");
        this.#frameCtx = this.#frameCanvas.getContext("2d");
        this.#frameCtx.globalCompositeOperation = "copy";
        let mouseX = 0;
        let mouseY = 0;
        const resolveMousePosition = (event)=>{
            const boundingRect = canvas.getBoundingClientRect();
            const inverseScale = canvas.width / boundingRect.width;
            console.log(boundingRect.width, canvas.width, inverseScale);
            mouseX = Math.floor((event.clientX - boundingRect.left) * inverseScale);
            mouseY = Math.floor((event.clientY - boundingRect.top) * inverseScale);
        };
        this.#canvas.addEventListener("mousedown", (event)=>{
            resolveMousePosition(event);
            this.#mouseDown = true;
            this.#dragStartX = mouseX;
            this.#dragStartY = mouseY;
            const selectedExisting = this.#selectedGroups.some(({ work })=>(0, _rect.pointIntersectsRect)(work, mouseX, mouseY));
            if (selectedExisting) this.#expandingSelection = false;
            else {
                // redefine selection
                this.#selectedGroups = this.#frameGroups.filter(({ work })=>(0, _rect.pointIntersectsRect)(work, mouseX, mouseY));
                this.#expandingSelection = this.#selectedGroups.length == 0;
            }
            this.render();
        });
        this.#canvas.addEventListener("mousemove", (event)=>{
            if (!this.#mouseDown) return;
            const lastX = mouseX;
            const lastY = mouseY;
            resolveMousePosition(event);
            if (this.#expandingSelection) {
                const minX = Math.min(mouseX, this.#dragStartX);
                const minY = Math.min(mouseY, this.#dragStartY);
                const maxX = Math.max(mouseX, this.#dragStartX);
                const maxY = Math.max(mouseY, this.#dragStartY);
                const rect = {
                    x: minX,
                    y: minY,
                    w: maxX - minX,
                    h: maxY - minY
                };
                this.#selectionRect = rect;
                this.#selectedGroups = this.#frameGroups.filter(({ work })=>(0, _rect.rectOverlaps)(rect, work));
            } else {
                const shiftX = mouseX - lastX;
                const shiftY = mouseY - lastY;
                this.#shiftSelections(shiftX, shiftY);
            }
            this.render();
        });
        this.#canvas.addEventListener("mouseup", ()=>{
            if (this.#mouseDown) {
                this.#mouseDown = false;
                this.#selectionRect = undefined;
                this.render();
            }
        });
        this.#canvas.addEventListener("keydown", (event)=>{
            let shiftX = 0;
            let shiftY = 0;
            switch(event.code){
                case "KeyA":
                case "ArrowLeft":
                    shiftX -= 1;
                    break;
                case "KeyD":
                case "ArrowRight":
                    shiftX += 1;
                    break;
                case "KeyW":
                case "ArrowUp":
                    shiftY -= 1;
                    break;
                case "KeyS":
                case "ArrowDown":
                    shiftY += 1;
                    break;
            }
            if (shiftX == 0 && shiftY == 0) return;
            event.preventDefault();
            if (event.shiftKey) this.#accordionSelections(shiftX, shiftY);
            else this.#shiftSelections(shiftX, shiftY);
            this.render();
        });
    }
    #shiftSelections(shiftX, shiftY) {
        for (const { work } of this.#selectedGroups)(0, _groupFrames.moveGroup)(work, work.x + shiftX, work.y + shiftY);
    }
    #accordionSelections(shiftX, shiftY) {
        if (this.#selectedGroups.length == 0) return;
        // x
        this.#selectedGroups.sort((a, b)=>a.work.x - b.work.x);
        let lastX = this.#selectedGroups[0].work.x;
        let currentShiftX = 0;
        for (const { work } of this.#selectedGroups){
            if (work.x != lastX) {
                lastX = work.x;
                currentShiftX += shiftX;
            }
            (0, _groupFrames.moveGroup)(work, work.x + currentShiftX, work.y);
        }
        // y
        this.#selectedGroups.sort((a, b)=>a.work.y - b.work.y);
        let lastY = this.#selectedGroups[0].work.y;
        let currentShiftY = 0;
        for (const { work } of this.#selectedGroups){
            if (work.y != lastY) {
                lastY = work.y;
                currentShiftY += shiftY;
            }
            (0, _groupFrames.moveGroup)(work, work.x, work.y + currentShiftY);
        }
    }
    loadSheet(sheet) {
        const sourceImage = sheet.image;
        this.#sheet = sheet;
        const groups = (0, _groupFramesDefault.default)(sheet.animations);
        const packed = (0, _binPackDefault.default)(groups.map((group)=>({
                width: group.w + 2,
                height: group.h + 2,
                group
            })));
        this.#frameGroups = [];
        for (const item of packed.items){
            const work = item.item.group;
            const packed = structuredClone(work);
            (0, _groupFrames.moveGroup)(packed, item.x + 1, item.y + 1);
            this.#frameGroups.push({
                work,
                packed
            });
        }
        // update canvas bounds
        this.#canvas.width = sourceImage.width;
        this.#canvas.height = sourceImage.height;
        this.#frameCanvas.width = packed.width;
        this.#frameCanvas.height = packed.height;
        // create frame source
        for (const { work, packed } of this.#frameGroups)for(let i = 0; i < packed.frames.length; i++){
            const sourceFrame = work.frames[i];
            const destFrame = packed.frames[i];
            const w = sourceFrame.w;
            const h = sourceFrame.h;
            this.#frameCtx.drawImage(sourceImage, sourceFrame.x, sourceFrame.y, w, h, destFrame.x, destFrame.y, w, h);
        }
        this.render();
    }
    render() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#renderFrames(this.#ctx);
        this.#renderOutlines();
    }
    #renderFrames(ctx) {
        for (const { work, packed } of this.#frameGroups)for(let i = 0; i < packed.frames.length; i++){
            const sourceFrame = packed.frames[i];
            const destFrame = work.frames[i];
            const w = sourceFrame.w;
            const h = sourceFrame.h;
            ctx.drawImage(this.#frameCanvas, sourceFrame.x, sourceFrame.y, w, h, destFrame.x, destFrame.y, w, h);
        }
    }
    #renderOutlines() {
        const ctx = this.#ctx;
        ctx.strokeStyle = "orange";
        ctx.fillStyle = "rgba(255, 127, 0, 0.2)";
        const renderRect = (rect)=>{
            ctx.beginPath();
            ctx.rect(rect.x + 0.5, rect.y + 0.5, rect.w, rect.h);
            ctx.fill();
            ctx.stroke();
        };
        for (const group of this.#frameGroups){
            ctx.globalAlpha = this.#selectedGroups.includes(group) ? 1.0 : 0.2;
            renderRect(group.work);
        }
        ctx.globalAlpha = 1.0;
        if (this.#selectionRect) renderRect(this.#selectionRect);
    }
    renderOutput(canvas) {
        canvas.width = this.#canvas.width;
        canvas.height = this.#canvas.height;
        const ctx = canvas.getContext("2d");
        this.#renderFrames(ctx);
    }
    serializeSheet() {
        if (this.#sheet.animations) return (0, _boomsheetsAnimations.serializeAnimations)(this.#sheet.animations);
        else return "";
    }
}
exports.default = FrameOrganizerWorkspace;

},{"bin-pack":"1azMl","./boomsheets-animations":"83wx1","./group-frames":"8y2Dp","./rect":"gU1Zl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1azMl":[function(require,module,exports) {
"use strict";
var GrowingPacker = require("b04314455fa4b8ba");
module.exports = function(items, options) {
    options = options || {};
    var packer = new GrowingPacker();
    var inPlace = options.inPlace || false;
    // Clone the items.
    var newItems = items.map(function(item) {
        return inPlace ? item : {
            width: item.width,
            height: item.height,
            item: item
        };
    });
    newItems = newItems.sort(function(a, b) {
        // TODO: check that each actually HAS a width and a height.
        // Sort based on the size (area) of each block.
        return b.width * b.height - a.width * a.height;
    });
    packer.fit(newItems);
    var w = newItems.reduce(function(curr, item) {
        return Math.max(curr, item.x + item.width);
    }, 0);
    var h = newItems.reduce(function(curr, item) {
        return Math.max(curr, item.y + item.height);
    }, 0);
    var ret = {
        width: w,
        height: h
    };
    if (!inPlace) ret.items = newItems;
    return ret;
};

},{"b04314455fa4b8ba":"2j3LH"}],"2j3LH":[function(require,module,exports) {
/******************************************************************************

This is a binary tree based bin packing algorithm that is more complex than
the simple Packer (packer.js). Instead of starting off with a fixed width and
height, it starts with the width and height of the first block passed and then
grows as necessary to accomodate each subsequent block. As it grows it attempts
to maintain a roughly square ratio by making 'smart' choices about whether to
grow right or down.

When growing, the algorithm can only grow to the right OR down. Therefore, if
the new block is BOTH wider and taller than the current target then it will be
rejected. This makes it very important to initialize with a sensible starting
width and height. If you are providing sorted input (largest first) then this
will not be an issue.

A potential way to solve this limitation would be to allow growth in BOTH
directions at once, but this requires maintaining a more complex tree
with 3 children (down, right and center) and that complexity can be avoided
by simply chosing a sensible starting block.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

	blocks: array of any objects that have .w and .h attributes

Outputs:
-------

	marks each block that fits with a .fit attribute pointing to a
	node with .x and .y coordinates

Example:
-------

	var blocks = [
		{ w: 100, h: 100 },
		{ w: 100, h: 100 },
		{ w:  80, h:  80 },
		{ w:  80, h:  80 },
		etc
		etc
	];

	var packer = new GrowingPacker();
	packer.fit(blocks);

	for(var n = 0 ; n < blocks.length ; n++) {
		var block = blocks[n];
		if (block.fit) {
			Draw(block.fit.x, block.fit.y, block.w, block.h);
		}
	}


******************************************************************************/ var GrowingPacker = function() {};
GrowingPacker.prototype = {
    fit: function(blocks) {
        var n, node, block, len = blocks.length, fit;
        var width = len > 0 ? blocks[0].width : 0;
        var height = len > 0 ? blocks[0].height : 0;
        this.root = {
            x: 0,
            y: 0,
            width: width,
            height: height
        };
        for(n = 0; n < len; n++){
            block = blocks[n];
            if (node = this.findNode(this.root, block.width, block.height)) {
                fit = this.splitNode(node, block.width, block.height);
                block.x = fit.x;
                block.y = fit.y;
            } else {
                fit = this.growNode(block.width, block.height);
                block.x = fit.x;
                block.y = fit.y;
            }
        }
    },
    findNode: function(root, width, height) {
        if (root.used) return this.findNode(root.right, width, height) || this.findNode(root.down, width, height);
        else if (width <= root.width && height <= root.height) return root;
        else return null;
    },
    splitNode: function(node, width, height) {
        node.used = true;
        node.down = {
            x: node.x,
            y: node.y + height,
            width: node.width,
            height: node.height - height
        };
        node.right = {
            x: node.x + width,
            y: node.y,
            width: node.width - width,
            height: height
        };
        return node;
    },
    growNode: function(width, height) {
        var canGrowDown = width <= this.root.width;
        var canGrowRight = height <= this.root.height;
        var shouldGrowRight = canGrowRight && this.root.height >= this.root.width + width; // attempt to keep square-ish by growing right when height is much greater than width
        var shouldGrowDown = canGrowDown && this.root.width >= this.root.height + height; // attempt to keep square-ish by growing down  when width  is much greater than height
        if (shouldGrowRight) return this.growRight(width, height);
        else if (shouldGrowDown) return this.growDown(width, height);
        else if (canGrowRight) return this.growRight(width, height);
        else if (canGrowDown) return this.growDown(width, height);
        else return null; // need to ensure sensible root starting size to avoid this happening
    },
    growRight: function(width, height) {
        this.root = {
            used: true,
            x: 0,
            y: 0,
            width: this.root.width + width,
            height: this.root.height,
            down: this.root,
            right: {
                x: this.root.width,
                y: 0,
                width: width,
                height: this.root.height
            }
        };
        var node;
        if (node = this.findNode(this.root, width, height)) return this.splitNode(node, width, height);
        else return null;
    },
    growDown: function(width, height) {
        this.root = {
            used: true,
            x: 0,
            y: 0,
            width: this.root.width,
            height: this.root.height + height,
            down: {
                x: 0,
                y: this.root.height,
                width: this.root.width,
                height: height
            },
            right: this.root
        };
        var node;
        if (node = this.findNode(this.root, width, height)) return this.splitNode(node, width, height);
        else return null;
    }
};
module.exports = GrowingPacker;

},{}],"8y2Dp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "moveGroup", ()=>moveGroup);
parcelHelpers.export(exports, "default", ()=>groupFrames);
var _rect = require("./rect");
function updateBounds(group) {
    const firstFrame = group.frames[0];
    let minX = firstFrame.x;
    let minY = firstFrame.y;
    let maxX = firstFrame.x + firstFrame.w;
    let maxY = firstFrame.y + firstFrame.h;
    for(let i = 1; i < group.frames.length; i++){
        const frame = group.frames[i];
        minX = Math.min(minX, frame.x);
        minY = Math.min(minY, frame.y);
        maxX = Math.max(maxX, frame.x + frame.w);
        maxY = Math.max(maxY, frame.y + frame.h);
    }
    group.x = minX;
    group.y = minY;
    group.w = maxX - minX;
    group.h = maxY - minY;
}
// create a single group, removes frames from the passed list
function takeGroup(frames) {
    const group = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        frames: [
            frames.pop()
        ]
    };
    updateBounds(group);
    for(let i = frames.length - 1; i >= 0; i--){
        const frame = frames[i];
        if (!(0, _rect.rectOverlaps)(group, frame)) continue;
        if (!group.frames.some((f)=>(0, _rect.rectOverlaps)(f, frame))) continue;
        // take frame by swap remove
        frames[i] = frames[frames.length - 1];
        frames.pop();
        group.frames.push(frame);
        updateBounds(group);
    }
    return group;
}
function moveGroup(group, x, y) {
    const shiftX = x - group.x;
    const shiftY = y - group.y;
    group.x = x;
    group.y = y;
    for (const frame of group.frames){
        frame.x += shiftX;
        frame.y += shiftY;
    }
}
function groupFrames(animations) {
    const frames = animations.flatMap((animation)=>animation.frames);
    const groups = [];
    while(frames.length > 0)groups.push(takeGroup(frames));
    return groups;
}

},{"./rect":"gU1Zl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gU1Zl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "rectOverlaps", ()=>rectOverlaps);
parcelHelpers.export(exports, "pointIntersectsRect", ()=>pointIntersectsRect);
function rectOverlaps(a, b) {
    const aIsLeft = a.x + a.w <= b.x;
    const aIsRight = a.x >= b.x + b.w;
    const aIsAbove = a.y + a.h <= b.y;
    const aIsBelow = a.y >= b.y + b.h;
    return !(aIsLeft || aIsRight || aIsAbove || aIsBelow);
}
function pointIntersectsRect(rect, x, y) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gmPuC","h7u1C"], "h7u1C", "parcelRequire7c7a")

//# sourceMappingURL=index.b71e74eb.js.map
