(function () {
  var e = function (a) {
      return (
        !!document.currentScript &&
        (document.currentScript.src.indexOf(`?${a}`) != -1 ||
          document.currentScript.src.indexOf(`&${a}`) != -1)
      )
    },
    f = e('loadGamesSDK') ? '/cast_game_sender.js' : '/cast_sender.js',
    g = e('loadCastFramework') || e('loadCastApplicationFramework'),
    h = function () {
      return typeof window.__onGCastApiAvailable === 'function'
        ? window.__onGCastApiAvailable
        : null
    },
    k = [
      'pkedcjkdefgpdelpbcmbmeomcjbeemfm',
      'enhhojjnijigcajfphajepfemndkmdlo',
    ],
    m = function (a) {
      a.length
        ? l(a.shift(), () => {
          m(a)
        })
        : n()
    },
    p = function (a) {
      return `chrome-extension://${a}${f}`
    },
    l = function (a, c, b) {
      const d = document.createElement('script')
      d.onerror = c
      b && (d.onload = b)
      d.src = a;
      (document.head || document.documentElement).appendChild(d)
    },
    q = function (a) {
      return window.navigator.userAgent.indexOf(a) >= 0
    },
    n = function () {
      const a = h()
      a && a(!1, 'No cast extension found')
    },
    r = function () {
      if (g) {
        let a = 2,
          c = h(),
          b = function () {
            a--
            a == 0 && c && c(!0)
          }
        window.__onGCastApiAvailable = b
        l('//www.gstatic.com/cast/sdk/libs/sender/1.0/cast_framework.js', n, b)
      }
    }
  if (q('CriOS')) {
    const t =
      window.__gCrWeb &&
      window.__gCrWeb.message &&
      window.__gCrWeb.message.invokeOnHost
    t && (r(), t({ command: 'cast.sender.init' }))
  } else if (q('Android') && q('Chrome/') && window.navigator.presentation) {
    r()
    const u = window.navigator.userAgent.match(/Chrome\/([0-9]+)/)
    m([
      `//www.gstatic.com/eureka/clank/${u ? parseInt(u[1], 10) : 0}${f}`,
      `//www.gstatic.com/eureka/clank${f}`,
    ])
  } else {
    window.chrome && window.navigator.presentation && !q('Edge')
      ? (r(), m(k.map(p)))
      : n()
  }
}())
