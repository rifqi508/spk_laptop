// frontend/js/login.js

function login() {
  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(res => {
    if (!res.token) {
      document.getElementById('error').innerText = 'Login gagal';
      return;
    }

    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('name', res.name);

    if (res.role === 'admin') {
      location.href = 'admin.html';
    } else {
      location.href = 'user.html';
    }
  });
}
