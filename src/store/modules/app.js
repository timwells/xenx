const app = {
  state: () => ({
    version: '1.0.0',
    sidebarVisible: false,
    sidebarUnfoldable: false,
  }),
  mutations: {
    toggleSidebar(state) {
      console.log('toggleSidebar', state)
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      console.log('toggleUnfoldable', state)
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      console.log('updateSidebarVisible', state)
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
}

export default {
  namespaced: true,
  app,
}
