// frontend/js/admin.js

const API = 'http://localhost:3000/api/users';

function loadUsers() {
  fetch(API, { headers: authHeader() })
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach((u, i) => {
        html += `
          <tr>
            <td>${i + 1}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>
              <button class="btn btn-primary" onclick="editUser(${u.id}, '${u.name}', '${u.email}')">
                ✏️ Edit
              </button>
              <button class="btn btn-danger" onclick="deleteUser(${u.id})">
                🗑 Hapus
              </button>
            </td>
          </tr>
        `;
      });
      document.getElementById('users').innerHTML = html;
    });
}

function addUser() {
  if (!name.value || !email.value || !password.value) {
    alert('Lengkapi data terlebih dahulu');
    return;
  }

  fetch(API, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  }).then(() => {
    alert('User berhasil ditambahkan');
    name.value = '';
    email.value = '';
    password.value = '';
    loadUsers();
  });
}

function editUser(id, oldName, oldEmail) {
  const newName = prompt('Edit Nama User', oldName);
  if (!newName) return;

  const newEmail = prompt('Edit Email User', oldEmail);
  if (!newEmail) return;

  fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify({
      name: newName,
      email: newEmail
    })
  }).then(() => {
    alert('User berhasil diperbarui');
    loadUsers();
  });
}

function deleteUser(id) {
  if (!confirm('Yakin ingin menghapus user ini?')) return;

  fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: authHeader()
  }).then(() => {
    alert('User berhasil dihapus');
    loadUsers();
  });
}

loadUsers();
