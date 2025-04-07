const form = document.getElementById('registration-form') as HTMLFormElement;
const userList = document.getElementById('user-list') as HTMLUListElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });

  if (response.ok) {
    form.reset();
    loadUsers();
  }
});

async function loadUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();
  userList.innerHTML = '';
  users.forEach((user: { name: string; email: string }) => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    userList.appendChild(li);
  });
}

loadUsers();