document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'http://localhost:3000/api'; // Substitua pelo URL da sua API
  const loginScreen = document.getElementById('loginScreen');
  const managementScreen = document.getElementById('managementScreen');
  const authForm = document.getElementById('authForm');
  const formTitle = document.getElementById('formTitle');
  const toggleButton = document.getElementById('toggleButton');
  const toggleText = document.getElementById('toggleText');
  const nameField = document.getElementById('nameField');
  const submitButton = document.getElementById('submitButton');
  const actionForm = document.getElementById('actionForm');
  const actionsList = document.getElementById('actionsList');
  const scoreElement = document.getElementById('score');
  const formActionTitle = document.getElementById('formActionTitle');
  const actionSubmitButton = document.getElementById('actionSubmitButton');
  const signOutButton = document.getElementById('signOutButton'); // Novo botão de Sign Out
  let isSignUp = false;

  // Verifica se o usuário já está autenticado ao carregar a página
  const token = localStorage.getItem('token');
  if (token) {
    // Se houver um token, redireciona para a tela de gerenciamento
    loginScreen.classList.add('hidden');
    managementScreen.classList.remove('hidden');
    loadActions();
  } else {
    // Caso contrário, mostra a tela de login
    loginScreen.classList.remove('hidden');
    managementScreen.classList.add('hidden');
  }

  // Alternar entre Sign In e Sign Up
  toggleButton.addEventListener('click', function () {
    isSignUp = !isSignUp;
    formTitle.textContent = isSignUp ? 'Sign Up' : 'Sign In';
    submitButton.textContent = isSignUp ? 'Sign Up' : 'Sign In';
    toggleText.textContent = isSignUp ? 'Já tem uma conta? ' : 'Não tem uma conta? ';
    toggleButton.textContent = isSignUp ? 'Sign In' : 'Sign Up';
    nameField.classList.toggle('hidden', !isSignUp);
  });

  // Submissão do formulário de autenticação
  authForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const user = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    if (isSignUp) {
      user.username = document.getElementById('name').value;
    }

    try {
      const endpoint = isSignUp ? '/auth/register' : '/auth/login';
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Salva o token JWT
        loginScreen.classList.add('hidden');
        managementScreen.classList.remove('hidden');
        loadActions();
      } else {
        console.error('Erro na autenticação');
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
    }
  });

  // Função para carregar ações e pontuação
  async function loadActions() {
    try {
      const response = await fetch(`${apiUrl}/actions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      actionsList.innerHTML = '';
      let totalScore = 0;

      data.forEach(action => {
        const li = document.createElement('li');
        li.className = 'p-4 bg-gray-50 rounded-lg';
        li.innerHTML = `
                    <h3 class="font-semibold text-green-700">${action.title}</h3>
                    <p class="text-sm text-gray-600">${action.description}</p>
                    <p class="text-sm text-gray-500">Categoria: ${action.category} | Pontos: ${action.points}</p>
                    <button onclick="editAction('${action._id}')" class="text-blue-600 hover:underline">Editar</button>
                    <button onclick="deleteAction('${action._id}')" class="text-red-600 hover:underline ml-2">Excluir</button>
                `;
        actionsList.appendChild(li);
        totalScore += action.points;
      });

      scoreElement.textContent = `${totalScore} pontos`;
    } catch (error) {
      console.error('Erro ao carregar ações:', error);
    }
  }

  // Adicionar/Editar ação
  actionForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const action = {
      _id: document.getElementById('actionId').value,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      category: document.getElementById('category').value,
      points: parseInt(document.getElementById('points').value)
    };

    const method = action._id ? 'PUT' : 'POST';
    const endpoint = action._id ? `/actions/${action._id}` : '/actions';

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(action)
      });

      if (response.ok) {
        loadActions();
        actionForm.reset();
        document.getElementById('actionId').value = '';
        formActionTitle.textContent = 'Adicionar Ação Sustentável';
        actionSubmitButton.textContent = 'Adicionar Ação';
      } else {
        console.error('Erro ao salvar ação');
      }
    } catch (error) {
      console.error('Erro ao salvar ação:', error);
    }
  });

  // Funções globais para editar e excluir ações
  window.editAction = function (id) {
    fetch(`${apiUrl}/actions/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(action => {
        document.getElementById('actionId').value = action._id;
        document.getElementById('title').value = action.title;
        document.getElementById('description').value = action.description;
        document.getElementById('category').value = action.category;
        document.getElementById('points').value = action.points;
        formActionTitle.textContent = 'Editar Ação Sustentável';
        actionSubmitButton.textContent = 'Salvar Edição';
      })
      .catch(error => console.error('Erro ao carregar ação:', error));
  };

  window.deleteAction = function (id) {
    if (confirm('Tem certeza que deseja excluir esta ação?')) {
      fetch(`${apiUrl}/actions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (response.ok) {
            loadActions();
          } else {
            console.error('Erro ao excluir ação');
          }
        })
        .catch(error => console.error('Erro ao excluir ação:', error));
    }
  };

  // Lógica para o botão de Sign Out
  signOutButton.addEventListener('click', async function () {
    try {
      const response = await fetch(`${apiUrl}/auth/signout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('token'); // Remove o token JWT
        loginScreen.classList.remove('hidden');
        managementScreen.classList.add('hidden');
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  });
});