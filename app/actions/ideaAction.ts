import axios from '../../node_modules/axios';

export function createIdea(ideaData: object, authData: object): object {
    return (dispatch: object) => (axios.post('/api/idea', {ideaData, authData}));
}

export function getAllIdeas(): object {
    return (dispatch: object) => (axios.get('/api/idea'));
}
