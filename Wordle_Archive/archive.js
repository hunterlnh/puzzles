const archiveDiv = document.getElementById("archive");

// Load your archive JSON
fetch("archive.json")
  .then(res => res.json())
  .then(puzzles => {
    puzzles.forEach(puzzle => {
      // Card for the date
      const card = document.createElement("div");
      card.className = "puzzle-card";
      card.innerHTML = `<strong>${puzzle.date}</strong>`;

      // Puzzle content (hidden initially)
      const content = document.createElement("div");
      content.className = "puzzle-content";

      // Build empty grid (6 rows x 5 tiles)
      const grid = document.createElement("div");
      grid.className = "guess-grid";
      for (let i = 0; i < 6; i++) {
        const row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 5; j++) {
          const tile = document.createElement("div");
          tile.className = "tile";
          row.appendChild(tile);
        }
        grid.appendChild(row);
      }

      // "Show Solution" button
      const btn = document.createElement("button");
      btn.textContent = "Show Solution";
      const solution = document.createElement("div");
      solution.className = "solution";
      solution.textContent = puzzle.word.toUpperCase();

      btn.addEventListener("click", e => {
        e.stopPropagation(); // prevent collapsing the card
        solution.style.display = solution.style.display === "block" ? "none" : "block";
      });

      content.appendChild(grid);
      content.appendChild(btn);
      content.appendChild(solution);

      card.appendChild(content);
      archiveDiv.appendChild(card);

      // Toggle puzzle display when clicking the card (except button)
      card.addEventListener("click", e => {
        if (!e.target.matches("button")) {
          content.style.display = content.style.display === "block" ? "none" : "block";
        }
      });
    });
  });
