let mutations  = {
    setToken(state,payload) {
        console.log(state,payload)
        state.token = payload.token
    },
    clearToken(state){
        state.token = '';
    }
}
export default mutations

