export function authHeader() {
    // return authorization header with basic auth credentials
    let user = localStorage.getItem('token');
    // eslint-disable-next-line no-console
    console.log(user);
    if (user) {
        return {'Authorization': 'Token ' + user};
    } else {
        return {};
    }
}