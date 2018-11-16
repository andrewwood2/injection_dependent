export default function tokenReducer (state = null, action) {
    switch (action.type) {
        case 'token-save':
            return action.token;
        case 'token-destroy':
            return null;
        default:
            return state;
    }
}
