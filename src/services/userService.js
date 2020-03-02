import api from "@/services/api";

export default {
    signUp(email, password) {
        return api().post('user/create/', {email: email, password: password})
    },

    login(email, password) {
        return api().post('user/token/', {email: email, password: password}).then(
            user => {
                localStorage.setItem('logged', true);
                localStorage.setItem('token', user.data.token);
            }
        );

    },
    logout() {
        localStorage.removeItem('logged');
        localStorage.removeItem('token');
        // return api().get('user/logout/');
    }
}