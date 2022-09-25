import { createStore } from 'vuex'
import app from './modules/app'
import auth from './modules/auth'
import energyEvents from './modules/energyEvents'

export default createStore({
  modules: {
    app,
    auth,
    energyEvents
  },
})
