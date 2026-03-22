const fs = require('fs');
const path = require('path');

const srcDir = 'assets/sources/biology/4_Emberi_Szervezet/quizzes/';
const destDir = 'assets/data/';

function convertCSVToQuizJSON(csvContent, moduleId) {
    const lines = csvContent.trim().split('\n');
    const quiz = [];
    
    // Skip separator and header lines
    const dataLines = lines.filter(line => !line.startsWith('#') && !line.startsWith('Kérdés'));

    dataLines.forEach((line, index) => {
        const parts = line.split(';');
        if (parts.length < 2) return;

        let rawQuestion = parts[0];
        let rawAnswer = parts[1];
        let type = rawQuestion.includes('[MC]') ? 'MC' : 'BLANK';

        const entry = {
            id: index + 1,
            type: type,
            question: "",
            options: [],
            answer: ""
        };

        if (type === 'MC') {
            const segments = rawQuestion.replace('[MC] ', '').split('<br>');
            entry.question = segments[0];
            entry.options = segments.slice(1).map(opt => opt.replace(/^[A-Z]\)\s?/, '').trim());
            
            // Clean answer: Strip "Helyes: ", "C) ", and everything after <br> (explanations)
            let cleanAnswer = rawAnswer.replace('Helyes: ', '').split('<br>')[0];
            entry.answer = cleanAnswer.replace(/^[A-Z]\)\s?/, '').replace(/\.$/, '').trim();
        } else {
            entry.question = rawQuestion.replace('[KIEG] ', '');
            entry.options = [];
            entry.answer = rawAnswer.split('<br>')[0].trim();
        }

        quiz.push(entry);
    });

    return { subjectId: "biology", moduleId, quiz };
}

// Ensure destination exists
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

// Process all CSV files in the source directory
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.csv'));

files.forEach(file => {
    const moduleId = file.replace('.csv', '');
    const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
    const json = convertCSVToQuizJSON(content, moduleId);
    
    fs.writeFileSync(
        path.join(destDir, `quiz-${moduleId}.json`),
        JSON.stringify(json, null, 2)
    );
    console.log(`Processed: ${file} -> quiz-${moduleId}.json`);
});
