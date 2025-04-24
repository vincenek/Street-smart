// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Load tips from Google Sheet
    const publicSpreadsheetUrl = 'YOUR_GOOGLE_SHEETS_PUBLISHED_URL';
    
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: showTips,
        simpleSheet: true
    });

    // Voting system
    document.querySelectorAll('.voteBtn').forEach(btn => {
        btn.addEventListener('click', handleVote);
    });
});

function showTips(data) {
    const container = document.getElementById('tipsContainer');
    container.innerHTML = data.slice(0, 20).map(tip => `
        <div class="bg-gray-800 p-4 rounded">
            <div class="flex justify-between">
                <h3 class="text-orange-500">${tip.location}</h3>
                <span class="text-gray-400">${tip.category}</span>
            </div>
            <p class="my-2">${tip.tip}</p>
            <button class="voteBtn" data-id="${tip.timestamp}">
                👍 <span>${getVotes(tip.timestamp)}</span>
            </button>
        </div>
    `).join('');
}

function getVotes(id) {
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    return votes[id] || 0;
}

function handleVote(e) {
    const id = e.target.dataset.id;
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    votes[id] = (votes[id] || 0) + 1;
    localStorage.setItem('votes', JSON.stringify(votes));
    e.target.querySelector('span').textContent = votes[id];
}
