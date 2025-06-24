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

function addLogoutButton() {
    const container = document.createElement('div');
    container.id = 'logoutContainer';
    container.style.textAlign = 'center';
    container.style.marginTop = '20px';

    const btn = document.createElement('button');
    btn.id = 'logoutButton';
    btn.textContent = 'Logout';
    btn.style.display = 'none';

    container.appendChild(btn);
    document.body.appendChild(container);

    skapi.getProfile().then(profile => {
        if (profile) {
            btn.style.display = 'inline-block';
        }
    });

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        skapi.logout().then(function () {
            window.location.replace('login.html');
        }).catch(err => alert(err.message));
    });
}
