function onLoad(callback) {
    window.addEventListener('DOMContentLoaded', callback);
}

function requireLogin(redirect) {
    return skapi.getProfile().then(profile => {
        if (!profile) {
            window.location.replace(redirect || 'login.html');
            return Promise.reject();
        }
        return profile;
    });
}

function redirectIfLoggedIn(target) {
    skapi.getProfile().then(profile => {
        if (profile) {
            window.location.replace(target || 'index.html');
        }
    });
}
