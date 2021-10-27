const state = {
  meetingList: [],
  formHeight: 0,
  tableHeight: 0
}

const mutations = {
  SET_MEETING_LIST: (state, data) => {
    state.meetingList = data
  },
  SET_FORM_HEIGHT: (state, height) => {
    state.formHeight = height
  },
  SET_TABLE_HEIGHT: (state, height) => {
    state.tableHeight = height
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
