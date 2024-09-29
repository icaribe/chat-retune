// Função de login com API Key
function login() {
  const apiKey = document.getElementById('api-key').value;

  if (apiKey) {
    localStorage.setItem('apiKey', apiKey); // Armazenando a API key localmente
    alert("Login bem-sucedido!");
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('bot-container').style.display = 'block';
    document.getElementById('conversation-container').style.display = 'block';
  } else {
    alert("Por favor, insira sua API Key.");
  }
}

// Função para criar um novo bot
function createBot() {
  const apiKey = localStorage.getItem('apiKey');
  if (!apiKey) {
    alert("Por favor, faça login.");
    return;
  }

  fetch('https://api.retune.so/v1/bots', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: "Novo Bot" })
  })
  .then(response => response.json())
  .then(data => {
    alert("Bot criado com sucesso!");
    loadBots();  // Atualiza a lista de bots
  })
  .catch(error => console.error("Erro ao criar bot:", error));
}

// Função para carregar bots existentes
function loadBots() {
  const apiKey = localStorage.getItem('apiKey');
  if (!apiKey) {
    alert("Por favor, faça login.");
    return;
  }

  fetch('https://api.retune.so/v1/bots', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const botsList = document.getElementById('bots-list');
    botsList.innerHTML = '';

    if (data && data.bots) {
      data.bots.forEach(bot => {
        const botItem = document.createElement('div');
        botItem.textContent = `Bot: ${bot.name} (ID: ${bot.id})`;
        botsList.appendChild(botItem);
      });
    }
  })
  .catch(error => console.error("Erro ao carregar bots:", error));
}

// Função para iniciar uma nova conversa
function createConversation() {
  const apiKey = localStorage.getItem('apiKey');
  const botId = prompt("Insira o ID do Bot para iniciar uma conversa:");

  if (!apiKey || !botId) {
    alert("API Key ou Bot ID não fornecidos.");
    return;
  }

  fetch(`https://api.retune.so/v1/bots/${botId}/conversations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    alert("Conversa iniciada com sucesso!");
    loadConversations(botId);
  })
  .catch(error => console.error("Erro ao iniciar conversa:", error));
}

// Função para carregar conversas existentes
function loadConversations() {
  const apiKey = localStorage.getItem('apiKey');
  const botId = prompt("Insira o ID do Bot para carregar conversas:");

  if (!apiKey || !botId) {
    alert("API Key ou Bot ID não fornecidos.");
    return;
  }

  fetch(`https://api.retune.so/v1/bots/${botId}/conversations`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const conversationsList = document.getElementById('conversations-list');
    conversationsList.innerHTML = '';

    if (data && data.conversations) {
      data.conversations.forEach(conversation => {
        const conversationItem = document.createElement('div');
        conversationItem.textContent = `Conversa ID: ${conversation.id}`;
        conversationsList.appendChild(conversationItem);
      });
    }
  })
  .catch(error => console.error("Erro ao carregar conversas:", error));
}
