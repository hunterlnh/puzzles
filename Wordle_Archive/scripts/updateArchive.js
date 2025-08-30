const fs = require('fs');
const path = require('path');

// Import your word list (same as targetWords in script.js)
const { targetWords } = require('../../Wordle/targetWords.js'); 

const archivePath = path.join(__dirname, '../Wordle_Archive/archive.json');

// Calculate today’s word
const referenceDate = new Date(2022, 0, 1);
const today = new Date();
const dayOffset = Math.floor((today - referenceDate) / (1000 * 60 * 60 * 24));
const todayWord = targetWords[dayOffset % targetWords.length];

// Load existing archive or create empty array
let archive = [];
if (fs.existsSync(archivePath)) {
  archive = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
}

// Only add if today isn’t already in the archive
const todayISO = today.toISOString().slice(0, 10);
if (!archive.find(e => e.date === todayISO)) {
  archive.push({ date: todayISO, word: todayWord });
  fs.writeFileSync(archivePath, JSON.stringify(archive, null, 2));
  console.log(`Added word for ${todayISO}: ${todayWord}`);
} else {
  console.log(`Word for ${todayISO} already exists.`);
}
