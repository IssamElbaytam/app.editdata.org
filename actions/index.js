/*global requestAnimationFrame*/
var constants = require('../constants')
var router = require('../lib/router')

var editor = require('./editor')
var github = require('./github')
var file = require('./file')
var save = require('./save')

module.exports = function ActionCreators (store) {
  /**
   * Sign out of the app
   * @param  {Store} store App store
   * @return {Function}
   */
  function signOut () {
    return store({
      type: constants.SIGN_OUT
    })
  }

  /**
   * Reset state to initialState
   * @param {Store} store
   */
  function reset () {
    store({
      type: constants.RESET
    })
  }

  /**
   * Set the current URL properties.  This is a
   * Private method, use `setRoute` to trigger route changes.
   * @return {Object}
   */
  function setUrl () {
    return {
      type: constants.SET_URL
    }
  }

  /**
   * Set a user's Github profile
   * @param {Object} profile Github profile object
   * @return {Object}
   */
  function setUserProfile (profile) {
    return {
      type: constants.SET_USER_PROFILE,
      profile: profile
    }
  }

  /**
   * Set the current user
   * @param {Object} user User object
   * @return {Object}
   */
  function setUser (user) {
    return {
      type: constants.SET_USER,
      user: user
    }
  }

  /**
   * Trigger a route change.  The router call is wrapped in
   * `requestAnimationFrame` to throttle quick route changes.
   * @param {String} url     Path to trigger
   * @param {Object} options Router options
   * @param {Store} store   App store
   */
  function setRoute (url, options) {
    requestAnimationFrame(function () {
      router.go(url, options || {})
      setUrl(store)
    })
  }

  /**
   * Toggle `modal` open or closed.  Opening a model closes all other modals.
   * @param  {String} modal Modal property name, as found in initialState
   * @param  {Booleab} value True to open, false to close
   * @param  {Store} store App store
   * @return {Function}
   */
  function modal (modal, value) {
    return store({
      type: constants.MODAL,
      modal: modal,
      value: value
    })
  }

  function closeModals () {
    return store({
      type: constants.CLOSE_MODALS
    })
  }

  /**
   * Toggle drop-down `menu` open or closed.  Opening a menu
   * closes all other menus.
   * @param  {String} menu  Menu property name, as found in initialState
   * @param  {Boolean} value True to open, false to close
   * @param  {Store} store App store
   * @return {Function}
   */
  function menu (menu, value) {
    return store({
      type: constants.MENU,
      menu: menu,
      value: value
    })
  }

  var commonActions = {
    menu: menu,
    modal: modal,
    setRoute: setRoute,
    setUser: setUser,
    setUserProfile: setUserProfile
  }

  return {
    editor: editor(store, commonActions),
    github: github(store, commonActions),
    save: save(store, commonActions),
    file: file(store, commonActions),
    modal: modal,
    menu: menu,
    reset: reset,
    setUrl: setUrl,
    setUser: setUser,
    setUserProfile: setUserProfile,
    setRoute: setRoute,
    signOut: signOut,
    closeModals: closeModals
  }
}
