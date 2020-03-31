let mutations  = {
    setToken(state,payload) {
        console.log(state,payload)
        state.token = payload.token
    },
    setPage(state,payload) {
        console.log(state,payload)
        state.pageList = payload.menu
    },
    clearToken(state){
        state.token = '';
    }
}
export default mutations

