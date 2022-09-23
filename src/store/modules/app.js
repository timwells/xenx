
export default {
  namespaced: true,
  state: {
    version: '1.0.0',
    sidebarVisible: false,
    sidebarUnfoldable: false,
  },
  getters: {
    getSidebarVisible: (state) => state.sidebarVisible,
    getSidebarUnfoldable: (state) => state.sidebarUnfoldable,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
}
