// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function(modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire
  var nodeRequire = typeof require === 'function' && require

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire
        if (!jumped && currentRequire) {
          return currentRequire(name, true)
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true)
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name)
        }

        var err = new Error("Cannot find module '" + name + "'")
        err.code = 'MODULE_NOT_FOUND'
        throw err
      }

      localRequire.resolve = resolve

      var module = (cache[name] = new newRequire.Module(name))

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      )
    }

    return cache[name].exports

    function localRequire(x) {
      return newRequire(localRequire.resolve(x))
    }

    function resolve(x) {
      return modules[name][1][x] || x
    }
  }

  function Module(moduleName) {
    this.id = moduleName
    this.bundle = newRequire
    this.exports = {}
  }

  newRequire.isParcelRequire = true
  newRequire.Module = Module
  newRequire.modules = modules
  newRequire.cache = cache
  newRequire.parent = previousRequire
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports
      },
      {},
    ]
  }

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i])
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1])

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports
      })

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports
    }
  }

  // Override the current require with this new one
  return newRequire
})(
  {
    'node_modules/can-namespace/can-namespace.js': [
      function(require, module, exports) {
        module.exports = {}
      },
      {},
    ],
    'node_modules/can-ndjson-stream/can-ndjson-stream.js': [
      function(require, module, exports) {
        'use strict'
        /*exported ndjsonStream*/

        var namespace = require('can-namespace')

        var ndjsonStream = function(response) {
          // For cancellation
          var is_reader,
            cancellationRequest = false
          return new ReadableStream({
            start: function(controller) {
              var reader = response.getReader()
              is_reader = reader
              var decoder = new TextDecoder()
              var data_buf = ''

              reader.read().then(function processResult(result) {
                if (result.done) {
                  if (cancellationRequest) {
                    // Immediately exit
                    return
                  }

                  data_buf = data_buf.trim()
                  if (data_buf.length !== 0) {
                    try {
                      var data_l = JSON.parse(data_buf)
                      controller.enqueue(data_l)
                    } catch (e) {
                      controller.error(e)
                      return
                    }
                  }
                  controller.close()
                  return
                }

                var data = decoder.decode(result.value, { stream: true })
                data_buf += data
                var lines = data_buf.split('\n')
                for (var i = 0; i < lines.length - 1; ++i) {
                  var l = lines[i].trim()
                  if (l.length > 0) {
                    try {
                      var data_line = JSON.parse(l)
                      controller.enqueue(data_line)
                    } catch (e) {
                      controller.error(e)
                      cancellationRequest = true
                      reader.cancel()
                      return
                    }
                  }
                }
                data_buf = lines[lines.length - 1]

                return reader.read().then(processResult)
              })
            },
            cancel: function(reason) {
              console.log('Cancel registered due to ', reason)
              cancellationRequest = true
              is_reader.cancel()
            },
          })
        }

        module.exports = namespace.ndjsonStream = ndjsonStream
      },
      { 'can-namespace': 'node_modules/can-namespace/can-namespace.js' },
    ],
    'quokka.ts': [
      function(require, module, exports) {
        'use strict'

        var _canNdjsonStream = require('can-ndjson-stream')

        var _canNdjsonStream2 = _interopRequireDefault(_canNdjsonStream)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        fetch('http://localhost:3000') // make a fetch request to a NDJSON stream service
          .then(function(response) {
            return (0, _canNdjsonStream2.default)(response.body)
          })
          .then(function(exampleStream) {
            // retain access to the reader so that you can cancel it
            var reader = exampleStream.getReader()
            var _read = void 0
            reader.read().then(
              (_read = function read(result) {
                if (result.done) {
                  return
                }
                console.log(result.value) // logs {item:"first"}
                exampleStream
                  .getReader()
                  .read()
                  .then(_read)
              }),
            )
          })
      },
      {
        'can-ndjson-stream':
          'node_modules/can-ndjson-stream/can-ndjson-stream.js',
      },
    ],
    'node_modules/parcel-bundler/src/builtins/hmr-runtime.js': [
      function(require, module, exports) {
        var global = arguments[3]
        var OVERLAY_ID = '__parcel__error__overlay__'

        var OldModule = module.bundle.Module

        function Module(moduleName) {
          OldModule.call(this, moduleName)
          this.hot = {
            data: module.bundle.hotData,
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function(fn) {
              this._acceptCallbacks.push(fn || function() {})
            },
            dispose: function(fn) {
              this._disposeCallbacks.push(fn)
            },
          }

          module.bundle.hotData = null
        }

        module.bundle.Module = Module

        var parent = module.bundle.parent
        if (
          (!parent || !parent.isParcelRequire) &&
          typeof WebSocket !== 'undefined'
        ) {
          var hostname = '' || location.hostname
          var protocol = location.protocol === 'https:' ? 'wss' : 'ws'
          var ws = new WebSocket(
            protocol + '://' + hostname + ':' + '33237' + '/',
          )
          ws.onmessage = function(event) {
            var data = JSON.parse(event.data)

            if (data.type === 'update') {
              console.clear()

              data.assets.forEach(function(asset) {
                hmrApply(global.parcelRequire, asset)
              })

              data.assets.forEach(function(asset) {
                if (!asset.isNew) {
                  hmrAccept(global.parcelRequire, asset.id)
                }
              })
            }

            if (data.type === 'reload') {
              ws.close()
              ws.onclose = function() {
                location.reload()
              }
            }

            if (data.type === 'error-resolved') {
              console.log('[parcel] ✨ Error resolved')

              removeErrorOverlay()
            }

            if (data.type === 'error') {
              console.error(
                '[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack,
              )

              removeErrorOverlay()

              var overlay = createErrorOverlay(data)
              document.body.appendChild(overlay)
            }
          }
        }

        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID)
          if (overlay) {
            overlay.remove()
          }
        }

        function createErrorOverlay(data) {
          var overlay = document.createElement('div')
          overlay.id = OVERLAY_ID

          // html encode message and stack trace
          var message = document.createElement('div')
          var stackTrace = document.createElement('pre')
          message.innerText = data.error.message
          stackTrace.innerText = data.error.stack

          overlay.innerHTML =
            '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
            '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
            '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
            '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' +
            message.innerHTML +
            '</div>' +
            '<pre>' +
            stackTrace.innerHTML +
            '</pre>' +
            '</div>'

          return overlay
        }

        function getParents(bundle, id) {
          var modules = bundle.modules
          if (!modules) {
            return []
          }

          var parents = []
          var k, d, dep

          for (k in modules) {
            for (d in modules[k][1]) {
              dep = modules[k][1][d]
              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              ) {
                parents.push(k)
              }
            }
          }

          if (bundle.parent) {
            parents = parents.concat(getParents(bundle.parent, id))
          }

          return parents
        }

        function hmrApply(bundle, asset) {
          var modules = bundle.modules
          if (!modules) {
            return
          }

          if (modules[asset.id] || !bundle.parent) {
            var fn = new Function(
              'require',
              'module',
              'exports',
              asset.generated.js,
            )
            asset.isNew = !modules[asset.id]
            modules[asset.id] = [fn, asset.deps]
          } else if (bundle.parent) {
            hmrApply(bundle.parent, asset)
          }
        }

        function hmrAccept(bundle, id) {
          var modules = bundle.modules
          if (!modules) {
            return
          }

          if (!modules[id] && bundle.parent) {
            return hmrAccept(bundle.parent, id)
          }

          var cached = bundle.cache[id]
          bundle.hotData = {}
          if (cached) {
            cached.hot.data = bundle.hotData
          }

          if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
            cached.hot._disposeCallbacks.forEach(function(cb) {
              cb(bundle.hotData)
            })
          }

          delete bundle.cache[id]
          bundle(id)

          cached = bundle.cache[id]
          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            cached.hot._acceptCallbacks.forEach(function(cb) {
              cb()
            })
            return true
          }

          return getParents(global.parcelRequire, id).some(function(id) {
            return hmrAccept(global.parcelRequire, id)
          })
        }
      },
      {},
    ],
  },
  {},
  ['node_modules/parcel-bundler/src/builtins/hmr-runtime.js', 'quokka.ts'],
  null,
)
//# sourceMappingURL=/quokka.36f96544.map
