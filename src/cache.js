// local storage cache interface for currentUser and spaces

export default {
  storeLocal (key, value) {
    try {
      window.localStorage[key] = JSON.stringify(value)
    } catch (error) {
      console.warn('Could not save to localStorage. (localStorage is disabled in private Safari windows)')
    }
  },
  getLocal (key) {
    try {
      return JSON.parse(window.localStorage[key])
    } catch (error) {}
  },
  removeLocal (key) {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {}
  },

  // user

  user () {
    return this.getLocal('user') || {}
  },
  updateUser (key, value) {
    let user = this.user()
    user[key] = value
    this.storeLocal('user', user)
  },
  saveUser (user) {
    this.storeLocal('user', user)
  },

  // space
  space (spaceId) {
    return this.getLocal(`space-${spaceId}`) || {}
  },
  getAllSpaces () {
    const keys = Object.keys(window.localStorage)
    const spaceKeys = keys.filter(key => key.startsWith('space-'))
    const spaces = spaceKeys.map(key => {
      return this.getLocal(key)
    })
    return spaces
  },
  updateSpace (key, value, spaceId) {
    let space = this.space(spaceId)
    space[key] = value
    space.cacheDate = Date.now()
    this.storeLocal(`space-${spaceId}`, space)
  },
  // Added aug 2019, can safely remove this in aug 2020
  updateBetaSpaceId (newId) {
    const updatedSpace = this.space('1')
    updatedSpace.id = newId
    this.storeLocal(`space-${newId}`, updatedSpace)
    this.removeLocal('space-1')
  },
  saveSpace (space) {
    space.cacheDate = Date.now()
    this.storeLocal(`space-${space.id}`, space)
  }
}
