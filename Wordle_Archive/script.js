fetch('archive.json')
  .then(res => res.json())
  .then(data => {
    const archiveDiv = document.getElementById('archive');
    
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'puzzle-card';
      card.innerHTML = `<strong>${item.date}</strong>`;
      
      const content = document.createElement('div');
      content.className = 'puzzle-content';
      
      // Insert puzzle layout here. For example, empty Wordle grid:
      content.innerHTML = `
        <div class="grid-preview">[Puzzle Grid Here]</div>
        <button class="show-solution">Show Solution</button>
        <div class="solution">${item.word}</div>
      `;
      
      card.appendChild(content);
      archiveDiv.appendChild(card);
      
      // Toggle content visibility
      card.addEventListener('click', e => {
        if (!e.target.classList.contains('show-solution')) {
          content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
      });
      
      // Toggle solution visibility
      content.querySelector('.show-solution').addEventListener('click', e => {
        e.stopPropagation(); // prevent collapsing the card
        const sol = content.querySelector('.solution');
        sol.style.display = sol.style.display === 'block' ? 'none' : 'block';
      });
    });
  });
