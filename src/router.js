/* Usage
var router = new Router({
  pushState
})

*/

class Router {
  constructor( options = {} ){
    this.options = options

    var o = this.options
    o.pushState = o.pushState || false
    o.baseUrl = o.baseUrl || ''
  },

  /*
   * currentUrl will return the section of the url that the application
   * has been told to care about. If options.pushState is true, it will look
   * at the whole url, if false, it will only pay attention to the hash.
   *
   * In any case, options.baseUrl will be stripped off the beginning.
   * If the url has no options.baseUrl, currentUrl will return false
   * and the Router will no longer handle the request.
   */
  currentUrl(){
    var url
    if( this.options.pushState ){
      url = location.pathname
      if( location.search.length ){
        url += '?' + location.search
      }
    } else {
      url = location.hash
      url.replace( /\#/g, '' )
      if( !url.length ){
        url = '/'
      }
    }

    return url
  },

  /*
   * parseUrl will return url data in the following format:
   *
   *   {
   *     matches: ['/users/:user', '/*'],
   *     url: '/users/johnny?tab=history',
   *     params: {
   *       user: 'johnny'
   *     },
   *     query {
   *       tab: 'history'
   *     }
   *   }
   *
   * parseUrl accepts the url it is to parse as it's only argument
   */
  parseUrl( url ){
    //TODO finish this method
  },

  /*
   * triggerCallbacks will give each url handler a chance to handle the url.
   * The callback for each is called with the following pattern:
   *
   *   handler( params, query, url, next )
   *
   * Where next is a callback that will give the next handler in line a chance
   * to handle the route.
   */
  triggerCallbacks( matches, params, query, url ){
    //TODO finish this method
  },

  /* updateUrl pushes the url in the required format.
   * updateUrl does NOT trigger any handlers.
   */
  updateUrl( url, title ){
    title = title || ''

    url = this.options.baseUrl + url
    if( this.options.pushState ){
      history.pushState( {}, title, url )
    } else {
      this._silentHashPush( url )
    }
  },

  // Start will begin the router lifecycle.
  // This must be called after all callbacks and options are set.
  start(){
    var url = this.parseUrl()
  },

  // _silentHashPush will attempt to set the url hash without triggering the
  // page change callbacks.
  _silentHashPush( url ){
    this._ignoreHashChange = true
    location.hash = url
  }
}
