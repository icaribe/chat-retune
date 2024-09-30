const apiKeyInput = document.getElementById('apiKey');
const chatIdInput = document.getElementById('chatId');
const createThreadBtn = document.getElementById('createThreadBtn');
const loadThreadsBtn = document.getElementById('loadThreadsBtn');
const threadList = document.getElementById('threadList');
const threadSection = document.getElementById('threadSection');
const continueSection = document.getElementById('continueSection');
const threadIdInput = document.getElementById('threadId');
const messageInput = document.getElementById('message');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const errorMessage = document.getElementById('errorMessage');

// Função para exibir mensagens de erro
function showError(message) {
  errorMessage.style.display = 'block';
  errorMessage.innerText = message;
}

// Função para criar um novo thread
createThreadBtn.addEventListener('click', async function() {
  const apiKey = apiKeyInput.value;
  const chatId = chatIdInput.value;

  if (!apiKey || !chatId) {
    showError('API Key e Chat ID são obrigatórios.');
    return;
  }

  try {
    const response = await fetch(`https://retune.so/api/chat/${chatId}/new-thread`, {
      method: 'POST',
      headers: {
        'X-Workspace-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - Não foi possível criar um novo thread`);
    }

    const data = await response.json();
    alert('Novo thread criado com sucesso!');

  } catch (error) {
    console.error('Erro ao criar thread:', error);
    showError(`Erro ao criar thread: ${error.message}`);
  }
});

// Função para carregar os threads
loadThreadsBtn.addEventListener('click', async function() {
  const apiKey = apiKeyInput.value;
  const chatId = chatIdInput.value;

  if (!apiKey || !chatId) {
    showError('API Key e Chat ID são obrigatórios.');
    return;
  }

  try {
    const response = await fetch(`https://retune.so/api/chat/${chatId}/threads`, {
      method: 'POST',
      headers: {
        'X-Workspace-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - Não foi possível carregar os threads`);
    }

    const data = await response.json();
    threadSection.style.display = 'block';
    threadList.innerHTML = ''; // Limpa a lista de threads anterior

    data.threads.forEach(thread => {
      const threadElement = document.createElement('div');
      threadElement.classList.add('conversation');
      threadElement.innerText = `Thread ID: ${thread.id}`;
      threadElement.addEventListener('click', () => {
        // Carrega o ID do thread para continuar a conversa
        threadIdInput.value = thread.id;
        continueSection.style.display = 'block';
      });
      threadList.appendChild(threadElement);
    });

  } catch (error) {
    console.error('Erro ao carregar threads:', error);
    showError(`Erro ao carregar threads: ${error.message}`);
  }
});

// Função para enviar uma mensagem para um thread existente
sendMessageBtn.addEventListener('click', async function() {
  const apiKey = apiKeyInput.value;
  const chatId = chatIdInput.value;
  const threadId = threadIdInput.value;
  const message = messageInput.value;

  if (!apiKey || !chatId || !threadId || !message) {
    showError('Todos os campos são obrigatórios.');
    return;
  }

  try {
    const response = await fetch(`https://retune.so/api/chat/${chatId}/response`, {
      method: 'POST',
      headers: {
        'X-Workspace-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        threadId: threadId,
        input: message
      })
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - Não foi possível enviar a mensagem`);
    }

    const data = await response.json();
    alert('Mensagem enviada com sucesso!');

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    showError(`Erro ao enviar mensagem: ${error.message}`);
  }
});
