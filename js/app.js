const App = {
    container: null,
    subjects: [],

    async init() {
        this.container = document.getElementById('app');
        this.subjects = await DataService.getSubjects();
        
        Router.init({
            '#/': () => this.showDashboard(),
            '#/subject/:id': (id) => this.showSubject(id),
            '#/subject/:sid/topic/:tid': (sid, tid) => this.showTopic(sid, tid),
            '#/flashcards/:sid/:tid/:mid': (sid, tid, mid) => this.showFlashcards(sid, tid, mid),
            '#/quiz/:sid/:tid/:mid': (sid, tid, mid) => this.showQuiz(sid, tid, mid),
            '#/topic-quiz/:sid/:tid/:num': (sid, tid, num) => this.showTopicQuiz(sid, tid, num),
            '#/subject-quiz/:sid/:num': (sid, num) => this.showSubjectQuiz(sid, num),
            '#/resources/:sid/:tid': (sid, tid) => this.showResources(sid, tid)
        });

        this.startTimer();
    },

    showDashboard() {
        this.container.innerHTML = Components.Dashboard(this.subjects);
    },

    showSubject(id) {
        const subject = this.subjects.find(s => s.id === id);
        if (subject) {
            this.container.innerHTML = Components.SubjectOverview(subject);
        } else {
            location.hash = '#/';
        }
    },

    showTopic(sid, tid) {
        const subject = this.subjects.find(s => s.id === sid);
        const topic = subject ? subject.topics.find(t => t.id === tid) : null;
        if (subject && topic) {
            this.container.innerHTML = Components.TopicOverview(subject, topic);
        } else {
            location.hash = '#/';
        }
    },

    showResources(sid, tid) {
        const subject = this.subjects.find(s => s.id === sid);
        const topic = subject ? subject.topics.find(t => t.id === tid) : null;
        if (subject && topic) {
            this.container.innerHTML = Components.Resources(subject, topic);
        } else {
            location.hash = '#/';
        }
    },

    async showFlashcards(sid, tid, mid) {
        const data = await DataService.getFlashcards(sid, tid, mid);
        this.container.innerHTML = Components.Flashcards(data, sid, tid, mid);
        if (data) this.initFlashcardLogic(data.flashcards);
    },

    async showQuiz(sid, tid, mid) {
        const data = await DataService.getQuiz(sid, tid, mid);
        this.container.innerHTML = Components.Quiz(data, sid, tid, mid);
        if (data) this.initQuizLogic(data.quiz);
    },

    async showTopicQuiz(sid, tid, num) {
        const data = await DataService.getTopicQuiz(sid, tid, num);
        this.container.innerHTML = Components.Quiz(data, sid, tid, num);
        if (data) this.initQuizLogic(data.quiz);
    },

    async showSubjectQuiz(sid, num) {
        const data = await DataService.getSubjectQuiz(sid, num);
        this.container.innerHTML = Components.SubjectQuiz(data, sid, num);
        if (data) this.initQuizLogic(data.quiz);
    },

    initQuizLogic(questions) {
        let currentIndex = 0;
        let score = 0;
        const questionText = document.getElementById('quiz-question-text');
        const optionsContainer = document.getElementById('quiz-options');
        const counter = document.getElementById('quiz-counter');
        const feedback = document.getElementById('quiz-feedback');
        const nextButton = document.getElementById('next-question');
        const results = document.getElementById('quiz-results');
        const questionContainer = document.getElementById('quiz-question-container');

        const updateQuestion = () => {
            const question = questions[currentIndex];
            questionText.textContent = question.question;
            counter.textContent = `${currentIndex + 1} / ${questions.length}`;
            feedback.classList.add('hidden');
            nextButton.classList.add('hidden');
            
            optionsContainer.innerHTML = "";

            if (question.type === 'MC') {
                optionsContainer.className = "grid grid-cols-1 gap-4";
                optionsContainer.innerHTML = question.options.map(option => `
                    <button class="quiz-option w-full p-6 text-left border border-border-color rounded-sm hover:bg-background-light transition-colors font-medium">
                        ${option}
                    </button>
                `).join('');

                document.querySelectorAll('.quiz-option').forEach(btn => {
                    btn.onclick = () => handleAnswer(btn.textContent.trim(), btn);
                });
            } else {
                optionsContainer.className = "flex flex-col gap-4";
                optionsContainer.innerHTML = `
                    <div class="flex items-center gap-4">
                        <input type="text" id="quiz-blank-input" placeholder="Your answer..." class="flex-1 p-4 border border-border-color rounded-sm focus:ring-1 focus:ring-primary focus:outline-none">
                        <button id="quiz-submit-blank" class="px-8 py-4 bg-primary text-white font-bold rounded-sm">Submit</button>
                    </div>
                `;
                
                const input = document.getElementById('quiz-blank-input');
                const submit = document.getElementById('quiz-submit-blank');
                
                submit.onclick = () => handleAnswer(input.value.trim());
                input.onkeydown = (e) => { if(e.key === 'Enter') handleAnswer(input.value.trim()); };
            }
        };

        const handleAnswer = (selected, btn = null) => {
            const question = questions[currentIndex];
            const correct = question.answer;
            const input = document.getElementById('quiz-blank-input');
            const submit = document.getElementById('quiz-submit-blank');
            
            document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
            if (input) input.disabled = true;
            if (submit) submit.disabled = true;

            const isCorrect = selected.toLowerCase() === correct.toLowerCase();

            if (isCorrect) {
                score++;
                if (btn) btn.classList.add('bg-primary/10', 'border-primary', 'text-primary');
                if (input) input.classList.add('border-primary', 'bg-primary/5', 'text-primary');
                feedback.textContent = 'Correct!';
                feedback.classList.remove('hidden', 'bg-red-100', 'text-red-700');
                feedback.classList.add('bg-green-100', 'text-green-700');
            } else {
                if (btn) btn.classList.add('bg-red-100', 'border-red-500', 'text-red-700');
                if (input) input.classList.add('border-red-500', 'bg-red-50', 'text-red-700');
                feedback.textContent = `Incorrect. The correct answer was: ${correct}`;
                feedback.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                feedback.classList.add('bg-red-100', 'text-red-700');
                
                if (question.type === 'MC') {
                    document.querySelectorAll('.quiz-option').forEach(b => {
                        if (b.textContent.trim() === correct) {
                            b.classList.add('bg-primary/10', 'border-primary', 'text-primary');
                        }
                    });
                }
            }
            
            nextButton.classList.remove('hidden');
        };

        nextButton.onclick = () => {
            currentIndex++;
            if (currentIndex < questions.length) {
                updateQuestion();
            } else {
                questionContainer.classList.add('hidden');
                feedback.classList.add('hidden');
                nextButton.classList.add('hidden');
                results.classList.remove('hidden');
                document.getElementById('quiz-score').textContent = `You scored ${score} / ${questions.length}`;
            }
        };

        updateQuestion();
    },

    initFlashcardLogic(flashcards) {
        let currentIndex = 0;
        const inner = document.getElementById('flashcard-inner');
        const term = document.getElementById('card-term');
        const definition = document.getElementById('card-definition');
        const quote = document.getElementById('card-quote');
        const counter = document.getElementById('flashcard-counter');
        const progressBar = document.getElementById('flashcard-progress-bar');
        const container = document.getElementById('flashcard-container');

        const updateCard = () => {
            const card = flashcards[currentIndex];
            inner.classList.remove('rotate-y-180');
            
            setTimeout(() => {
                term.textContent = card.term;
                definition.textContent = card.definition;
                const textEl = document.getElementById('card-text');
                if (textEl) textEl.textContent = card.text || "";
                quote.textContent = card.quote || "";
                counter.textContent = `${currentIndex + 1} / ${flashcards.length}`;
                progressBar.style.width = `${((currentIndex + 1) / flashcards.length) * 100}%`;
            }, 150);
        };

        container.addEventListener('click', () => {
            inner.classList.toggle('rotate-y-180');
        });

        document.getElementById('prev-card').onclick = (e) => {
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                updateCard();
            }
        };

        document.getElementById('next-card').onclick = (e) => {
            e.stopPropagation();
            if (currentIndex < flashcards.length - 1) {
                currentIndex++;
                updateCard();
            }
        };

        const handleKeydown = (e) => {
            if (window.location.hash.includes('flashcards')) {
                if (e.key === 'ArrowLeft') document.getElementById('prev-card').click();
                if (e.key === 'ArrowRight') document.getElementById('next-card').click();
                if (e.key === ' ') container.click();
            } else {
                window.removeEventListener('keydown', handleKeydown);
            }
        };
        window.addEventListener('keydown', handleKeydown);

        updateCard();
    },

    startTimer() {
        let seconds = 0;
        const timerElement = document.getElementById('session-timer');
        setInterval(() => {
            seconds++;
            const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
            const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            timerElement.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }
};

window.addEventListener('DOMContentLoaded', () => App.init());
