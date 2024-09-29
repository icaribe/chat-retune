let token = '';  
let agentId = '';  

// Função para definir as credenciais  
document.getElementById('setCredentials').addEventListener('click', () => {  
    token = document.getElementById('token').value.trim();  
    agentId = document.getElementById('agentId').value.trim();  

    if (token && agentId) {  
        alert('Credenciais salvas com sucesso!');  
        document.getElementById('credentials').style.display = 'none';  
        document.getElementById('chat').style.display = 'block';  
    } else {  
        alert('Por favor, preencha todos os campos!');  
    }  
});  

// Função para enviar mensagem  
document.getElementById('sendMessage').addEventListener('click', () => {  
    const messageInput = document.getElementById('inputMessage');  
    const message = messageInput.value.trim();  

    if (message) {  
        addMessage(`Você: ${message}`);  
        sendMessageToRetune(message);  
        messageInput.value = ''; // Limpa o campo de entrada  
    }  
});  

// Função para adicionar mensagem ao chat  
function addMessage(message) {  
    const messagesDiv = document.getElementById('messages');  
    messagesDiv.innerHTML += `<div>${message}</div>`;  
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Rola para baixo automaticamente  
}  

// Função para enviar mensagem para a API do Retune  
function sendMessageToRetune(message) {  
    fetch('https://api.retune.ai/v1/chat', {  
        method: 'POST',  
        headers: {  
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',  
        },  
        body: JSON.stringify({ message, agentId }) // Incluindo o ID do agente na requisição  
    })  
    .then(response => response.json())  
    .then(data => {  
        if (data.response) {  
            addMessage(`Bot: ${data.response}`);  
        } else {  
            addMessage(`Bot: Não consegui entender a mensagem.`);  
        }  
    })  
    .catch(error => {  
        console.error('Erro:', error);  
        addMessage(`Bot: Ocorreu um erro ao enviar a mensagem.`);  
    });  
}  

// Função para carregar conversas antigas  
document.getElementById('loadOldConversations').addEventListener('click', () => {  
    // Aqui, você pode implementar a lógica de carregamento de mensagens do passado, se necessário.  
    // Por enquanto, vamos apenas adicionar uma mensagem fictícia.  
    addMessage('Bot: Esta é uma conversa antiga de exemplo.');  
});