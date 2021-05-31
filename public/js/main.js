document.addEventListener('DOMContentLoaded', init);

function init() {
    const loginBtn = document.querySelector('#loginBtn');
    const layerPopup = document.querySelector('.layerPopup')
    const localLogin = document.querySelector('#localLogin')
    loginBtn.addEventListener('click', loginBtnFn)
    layerPopup.addEventListener('click', popupClose)
    localLogin.addEventListener('click', login)
}

function loginBtnFn() {
    const layerPopup = document.querySelector('.layerPopup');
    layerPopup.classList.add('open')
}
function popupClose(event) {
    if (event.target == this) {
        this.classList.remove('open')
    }
}

async function login() {
    const userid = document.querySelector('#userid');
    const userpw = document.querySelector('#userpw');

    if (userid.value == '') {
        alert('아이디 입력')
        userid.focus();
        return 0;
    }
    if (userpw.value == '') {
        alert('비번 입력')
        userpw.focus();
        return 0;
    }


    let url = 'http://localhost:3000/auth/local/login';
    let options = {
        method: 'POST',
        headers: {
            'content-type': `application/json`
        },
        body: JSON.stringify({
            userid: userid.value,
            userpw: userpw.value
        })
    }

    let respons = await fetch(url, options);
    let json = await respons.json();

    let { result, msg } = json;
    alert(msg);
    if (result) {
        // 로그인 성공
        let layerPopup = document.querySelector('.layerPopup')
        layerPopup.classList.remove('open')
    } else {
        userid.value = '';
        userpw.value = '';
        userid.focus();
    }
}