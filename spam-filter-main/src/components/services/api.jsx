import axios from "axios";
import { showNotification } from "@mantine/notifications";
const api = axios.create({
    baseURL: "http://localhost:8000/"
});

if (get_token()) {
    api.defaults.headers.common['Authorization'] = `Bearer ${get_token()}`;
}

api.interceptors.response.use(function(response) {
    if (response.data?.logged_out) {
        api.defaults.headers.common['Authorization'] = null;
        sessionStorage.removeItem('auth_token');
        showNotification({
            id: 'logout',
            title: 'Logged out',
            message: response.data?.error ?? 'You have been logged out',
            color: 'green'
        });
    }
    return response
})


function get_token() {
    return sessionStorage.getItem('auth_token');
}
export function is_logged_in() {
    const token = api.defaults.headers.common['Authorization'];
    return !!token
}

export function logout() {
    api.defaults.headers.common['Authorization'] = null;
    sessionStorage.clear()
    showNotification({
        id: 'logout',
        title: 'Logged out',
        message: 'You have been logged out',
        color: 'green'
    });
}

export default api;
