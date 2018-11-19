// const defaultToken = null
const defaultToken = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNTQ3ODQxODI0fQ.UBRQWHbqyuSrkcuLmVf9J7VvfqAsLFmc3XaxOay_ai0"

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
