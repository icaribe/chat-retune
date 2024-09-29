document.getElementById('authenticate').addEventListener('click', async () => {  
    const workspace = document.getElementById('workspace').value;  
    if (!workspace) {  
        alert("Por favor, insira um Workspace.");  
        return;  
    }  
    try {  
        const response = await fetch(`/api/authenticate/${workspace}`); // Substitua pela URL real da sua API  
        if (response.ok) {  
            document.querySelector('.chat-area').style.display = 'block';  
            document.getElementById('threads-container').innerHTML = ''; // Limpar threads anteriores  
            loadThreads(workspace);  
        } else {  
            alert("Erro ao autenticar. Verifique seu Workspace.");  
        }  
    } catch (error) {  
        console.error("Erro ao autenticar:", error);  
        alert("Um erro ocorreu. Tente novamente mais tarde.");  
    }  
});  

async function loadThreads(workspace) {  
    try {  
        const response = await fetch(`/api/threads/${workspace}`); // Substitua pela URL real da sua API  
        if (!response.ok) {  
            throw new Error("Erro ao carregar threads.");  
        }  
        const threads = await response.json();  
        const container = document.getElementById('threads-container');  
        threads.forEach(thread => {  
            const threadDiv = document.createElement('div');  
            threadDiv.textContent = thread.title;  
            threadDiv.className = 'thread';  
            threadDiv.addEventListener('click', () => loadMessages(thread.id));  
            container.appendChild(threadDiv);  
        });  
    } catch (error) {  
        console.error("Erro ao carregar threads:", error);  
    }  
}  

async function loadMessages(threadId) {  
    try {  
        const response = await fetch(`/api/messages/${threadId}`); // Substitua pela URL real da sua API  
        if (!response.ok) {  
            throw new Error("Erro ao carregar mensagens.");  
        }  
        const messages = await response.json();  
        const messagesDiv = document.getElementById('messages');  
        messagesDiv.innerHTML = '';  // Limpa mensagens anteriores  
        messages.forEach(message => {  
            const p = document.createElement('p');  
            p.textContent = message.content;  
            messagesDiv.appendChild(p);  
        });  
    } catch (error) {  
        console.error("Erro ao carregar mensagens:", error);  
    }  
}  

document.getElementById('send-message').addEventListener('click', async () => {  
    const messageInput = document.getElementById('message-input');  
    const message = messageInput.value;  
    const threadId = /* ID da thread ativa */; // Isso precisa ser definido conforme a lógica de threads.  

    if (!threadId) {  
        alert("Por favor, selecione uma thread antes de enviar mensagens.");  
        return;  
    }  

    if (!message) {  
        alert("Digite uma mensagem antes de enviar.");  
        return;  
    }  

    try {  
        const response = await fetch(`/api/messages/${threadId}`, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify({ content: message })  
        });  

        if (response.ok) {  
            messageInput.value = '';  // Limpa o campo de entrada  
            loadMessages(threadId);    // Recarrega mensagens para incluir a nova  
        } else {  
            throw new Error("Erro ao enviar mensagem.");  
        }  
    } catch (error) {  
        console.error("Erro ao enviar mensagem:", error);  
    }  
});
