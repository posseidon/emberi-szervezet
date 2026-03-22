const fs = require('fs');
const path = require('path');

const subjects = JSON.parse(fs.readFileSync('assets/data/subjects.json', 'utf-8'));
const baseDir = 'assets/sources';

subjects.forEach(subject => {
    const subjectId = subject.id;
    if (!subject.topics) return;

    subject.topics.forEach(topic => {
        const topicId = topic.id;
        if (!topic.modules) return;

        topic.modules.forEach(module => {
            const moduleId = module.id;
            const moduleDir = path.join(baseDir, subjectId, topicId, moduleId);
            
            const flashcardDir = path.join(moduleDir, 'flashcards');
            const quizDir = path.join(moduleDir, 'quizzes');

            // Create directories
            fs.mkdirSync(flashcardDir, { recursive: true });
            fs.mkdirSync(quizDir, { recursive: true });

            console.log(`Created structure for: ${subjectId}/${topicId}/${moduleId}`);

            // Migration logic: Check if files exist in the OLD structure and move them
            // Old Flashcards: assets/sources/{subject}/{topic}/flashcards/{module}.json
            const oldFlashcardPath = path.join(baseDir, subjectId, topicId, 'flashcards', `${moduleId}.json`);
            if (fs.existsSync(oldFlashcardPath)) {
                fs.renameSync(oldFlashcardPath, path.join(flashcardDir, `${moduleId}.json`));
                console.log(`  Moved flashcard: ${moduleId}.json`);
            }

            // Old Quizzes: assets/sources/{subject}/{topic}/quizzes/{module}.json
            const oldQuizPath = path.join(baseDir, subjectId, topicId, 'quizzes', `${moduleId}.json`);
            if (fs.existsSync(oldQuizPath)) {
                fs.renameSync(oldQuizPath, path.join(quizDir, `${moduleId}.json`));
                console.log(`  Moved quiz: ${moduleId}.json`);
            }
        });
    });
});
