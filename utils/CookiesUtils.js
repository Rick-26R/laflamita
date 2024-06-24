export function getRole() {
    const token = Cookies.get('token');

    if (!token) {
        return null;
    }

    const { role } = JSON.parse(token);

    return role;
}