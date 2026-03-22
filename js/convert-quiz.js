/**
 * Utility to convert custom Semicolon CSV to Lumina Quiz JSON
 * Run this in your browser console or a Node environment to transform your data.
 */
function convertCSVToQuizJSON(csvContent, subjectId) {
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
            // Remove [MC] prefix and split by <br>
            const segments = rawQuestion.replace('[MC] ', '').split('<br>');
            entry.question = segments[0]; // First segment is the question
            
            // Remaining segments are options (cleaning up "A) ", "B) " prefixes)
            entry.options = segments.slice(1).map(opt => opt.replace(/^[A-Z]\)\s?/, '').trim());
            
            // Clean up answer: "Helyes: C) Text" -> "Text"
            entry.answer = rawAnswer.replace('Helyes: ', '').replace(/^[A-Z]\)\s?/, '').replace(/\.$/, '').trim();
        } else {
            // Fill in the blank
            entry.question = rawQuestion.replace('[KIEG] ', '');
            entry.options = []; // Blanks don't usually have buttons
            entry.answer = rawAnswer.trim();
        }

        quiz.push(entry);
    });

    return JSON.stringify({ subjectId, quiz }, null, 2);
}

// Example usage:
const myCSV = `[MC] A vezetéklés és a szabályozás közötti alapvető különbség melyik jellemzője a kontrollmechanizmusnak?<br>A) Azonos mértékben függenek a központi idegrendszertől<br>B) A vezetéklés gyorsabb, mint a szabályozás<br>C) A szabályozás kétirányú visszacsatoláson alapul, míg a vezetéklés egyirányú<br>D) A vezetéklés csak tudatos irányításra képes;Helyes: C) A szabályozás kétirányú visszacsatoláson alapul, míg a vezetéklés egyirányú.;Homeosztázis::MC
[KIEG] Az irányítási folyamat alapműveleteinek sorrendje: alapjelképzés, _____, összehasonlítás, döntés.;mérés;Homeosztázis::BLANK`;

console.log(convertCSVToQuizJSON(myCSV, "homeostasis"));
