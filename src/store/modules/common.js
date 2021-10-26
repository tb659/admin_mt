const state = {
  meetingList: []
}

const mutations = {
  SET_MEETING_LIST: (state, data) => {
    state.meetingList = data
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
