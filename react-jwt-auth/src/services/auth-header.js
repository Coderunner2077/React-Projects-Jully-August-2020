export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.accessToken)
        // For Node.js + Express backend
        return { 'x-access-token': user.accessToken} // Else {"Authorization": "Bearer " + user.accessToken}
    return {};
}