// const defaultToken = null
const defaultToken = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NywiZXhwIjoxNTQ3ODM3MDMxfQ.aQUFb4qL752m5Pk2aMwWlPdysO5jfRdBV5xxa8jYZqY"

export default function tokenReducer (state = defaultToken, action) {
    switch (action.type) {
        case 'token-save':
            return action.token;
        case 'token-destroy':
            return defaultToken;
        default:
            return state;
    }
}
