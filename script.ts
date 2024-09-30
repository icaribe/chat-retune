const apiKey = "11ee4e96-a9b6-bb50-a693-134967a0a207";
const chatId = "11ef18a5-2605-f5d0-9b0b-8d16427a56c7";

// Função para criar um novo thread
async function createNewThread() {
    const response = await fetch(`https://retune.so/api/chat/${chatId}/new-thread`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Workspace-API-Key": apiKey
        },
        body: JSON.stringify({})
    });
    const data = await response.json();
    document.getElementById('response').innerText = JSON.stringify(data, null, 2);
}

// Função para continuar a conversa em um thread
async function continueInThread() {
    const threadId = document.getElementById('threadId').value;
    const inputMessage = document.getElementById('inputMessage').value;

    const response = await fetch(`https://retune.so/api/chat/${chatId}/response`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Workspace-API-Key": apiKey
        },
        body: JSON.stringify({
            "threadId": threadId,
            "input": inputMessage
        })
    });
    const data = await response.json();
    document.getElementById('response').innerText = JSON.stringify(data, null, 2);
}

// Função para obter todos os threads
async function getAllThreads() {
    const response = await fetch(`https://retune.so/api/chat/${chatId}/threads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Workspace-API-Key": apiKey
        },
        body: JSON.stringify({
            "from": 0,
            "total": 10
        })
    });
    const data = await response.json();
    document.getElementById('response').innerText = JSON.stringify(data, null, 2);
}

// Função para obter todas as mensagens de um thread
async function getAllMessages() {
    const threadId = document.getElementById('threadId').value;

    const response = await fetch(`https://retune.so/api/chat/${chatId}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Workspace-API-Key": apiKey
        },
        body: JSON.stringify({
            "threadId": threadId,
            "from": 0,
            "total": 10
        })
    });
    const data = await response.json();
    document.getElementById('response').innerText = JSON.stringify(data, null, 2);
}
