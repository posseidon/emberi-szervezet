const DataService = {
    async getSubjects() {
        try {
            const response = await fetch('assets/data/subjects.json');
            if (!response.ok) throw new Error('Failed to load subjects');
            return await response.json();
        } catch (e) {
            console.error('DataService: Error loading subjects:', e);
            return [];
        }
    },

    async getFlashcards(subjectId, topicId, moduleId) {
        try {
            // Updated: assets/sources/{subject}/{topic}/{module}/flashcards/{module}.json
            const response = await fetch(`assets/sources/${subjectId}/${topicId}/${moduleId}/flashcards/${moduleId}.json`);
            if (!response.ok) return null;
            return await response.json();
        } catch (e) {
            console.error('Error loading flashcards:', e);
            return null;
        }
    },

    async getQuiz(subjectId, topicId, moduleId) {
        try {
            // Updated: assets/sources/{subject}/{topic}/{module}/quizzes/{module}.json
            const response = await fetch(`assets/sources/${subjectId}/${topicId}/${moduleId}/quizzes/${moduleId}.json`);
            if (!response.ok) return null;
            return await response.json();
        } catch (e) {
            console.error('Error loading quiz:', e);
            return null;
        }
    },

    async getTopicQuiz(subjectId, topicId, quizNumber) {
        try {
            const response = await fetch(`assets/sources/${subjectId}/${topicId}/quizzes/${topicId}-${quizNumber}.json`);
            if (!response.ok) return null;
            return await response.json();
        } catch (e) {
            console.error('Error loading topic quiz:', e);
            return null;
        }
    }
};
