// frontend/js/auth.js

function getToken() {
  return localStorage.getItem('token');
}

function logout() {
  localStorage.clear();
  location.href = 'login.html';
}

function authHeader() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getToken()
  };
}

function checkAuth(roleRequired) {
  const token = getToken();
  const role = localStorage.getItem('role');

  if (!token) {
    location.href = 'login.html';
  }

  if (roleRequired && role !== roleRequired) {
    alert('Akses ditolak');
    logout();
  }
}
