const Components = {
    Dashboard(subjects) {
        const gridItems = subjects.map(subject => `
            <div onclick="location.hash='#/subject/${subject.id}'" class="bg-surface border border-border-color p-8 rounded-sm card-hover flex flex-col h-full cursor-pointer group">
                <div class="flex items-start justify-between mb-8">
                    <div class="size-12 rounded-sm bg-primary/10 text-primary flex items-center justify-center">
                        <span class="material-symbols-outlined text-[28px]">${subject.icon}</span>
                    </div>
                </div>
                <div class="flex-grow">
                    <h4 class="text-xl font-bold text-text-main group-hover:text-primary transition-colors mb-2">${subject.name}</h4>
                    <p class="text-sm text-text-muted leading-relaxed">${subject.description}</p>
                </div>
                <div class="mt-8 pt-6 border-t border-border-color flex items-center justify-between">
                    <span class="text-xs font-bold text-text-muted uppercase tracking-wide">Next: ${subject.next}</span>
                    <span class="material-symbols-outlined text-text-muted group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
            </div>
        `).join('');

        return `
            <div class="max-w-[1400px] w-full mx-auto p-8 lg:p-12">
                <div class="flex flex-col gap-10">
                    <div class="flex items-end justify-between border-b border-border-color pb-6">
                        <div>
                            <h3 class="text-xs font-bold text-text-muted tracking-wider uppercase mb-2">Curriculum Overview</h3>
                            <h1 class="text-4xl font-bold text-text-main tracking-tight font-display">Your Subjects</h1>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${gridItems}
                    </div>
                </div>
            </div>
        `;
    },

    SubjectOverview(subject) {
        const topicRows = (subject.topics || []).map((topic, index) => `
            <div class="flex flex-col md:flex-row md:items-center justify-between py-6 px-6 bg-surface border border-border-color hover:border-primary/30 transition-all duration-200 group gap-4 md:gap-6 rounded-sm mb-2 shadow-sm">
                <div class="flex items-center gap-4 flex-grow cursor-pointer" onclick="location.hash='#/subject/${subject.id}/topic/${topic.id}'">
                    <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        ${index + 1}
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-text-main group-hover:text-primary transition-colors">${topic.name}</h3>
                        <p class="text-xs text-text-muted uppercase tracking-widest font-bold mt-1">${topic.difficulty} • ${topic.time}</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 md:gap-3">
                    <button onclick="location.hash='#/subject/${subject.id}/topic/${topic.id}'" class="flex items-center gap-1.5 bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all shadow-sm">
                        <span class="material-symbols-outlined text-[16px]">description</span>
                        REVIEW
                    </button>
                    <button onclick="location.hash='#/subject/${subject.id}/topic/${topic.id}'" title="View Flashcards" class="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-colors">
                        <span class="material-symbols-outlined text-[20px]">style</span>
                    </button>
                    <button onclick="location.hash='#/subject/${subject.id}/topic/${topic.id}'" title="View Quiz" class="flex items-center justify-center w-10 h-10 bg-primary/5 text-primary/70 hover:bg-primary/10 rounded-full transition-colors">
                        <span class="material-symbols-outlined text-[20px]">task_alt</span>
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="max-w-[1000px] w-full mx-auto p-8 lg:p-12">
                <div class="mb-12 text-center">
                    <a href="#/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group">
                        <span class="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span class="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
                    </a>
                    <h1 class="text-5xl font-extrabold text-text-main tracking-tight font-display mb-4">${subject.name}</h1>
                    <p class="text-lg text-text-muted max-w-2xl mx-auto">${subject.description}</p>
                </div>

                <div class="flex items-center justify-between pb-4 border-b border-border-color mb-6 px-4">
                    <span class="text-xs font-bold tracking-widest uppercase text-text-muted">Course Syllabus</span>
                    <span class="text-xs font-bold text-primary uppercase tracking-widest">${subject.topics?.length || 0} Modules</span>
                </div>

                <div class="flex flex-col">
                    ${topicRows}
                </div>

                <div class="mt-12 p-8 border-2 border-dashed border-primary/20 rounded-sm bg-primary/5">
                    <div class="text-center mb-8">
                        <h4 class="text-lg font-bold text-text-main mb-2">Mastered the material?</h4>
                        <p class="text-text-muted text-sm">Take a comprehensive quiz covering all topics in ${subject.name}.</p>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        ${[1,2,3,4,5,6,7,8].map(n => `
                            <div onclick="location.hash='#/subject-quiz/${subject.id}/${n}'"
                                 class="bg-surface border border-border-color rounded-sm p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/40 transition-colors group">
                                <span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">quiz</span>
                                <span class="text-sm font-bold text-text-main">Quiz ${n}</span>
                            </div>
                        `).join('')}
                        ${[9,10].map(n => `
                            <div onclick="location.hash='#/subject-quiz/${subject.id}/${n}'"
                                 class="bg-surface border border-red-500/30 rounded-sm p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-red-500/60 transition-colors group">
                                <span class="material-symbols-outlined text-red-500 group-hover:scale-110 transition-transform">local_fire_department</span>
                                <span class="text-sm font-bold text-text-main">Quiz ${n}</span>
                                <span class="text-[10px] font-bold uppercase text-red-500 tracking-widest">Expert</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    TopicOverview(subject, topic) {
        const modulesList = (topic.modules || []).map(mod => `
            <div class="bg-surface border border-border-color rounded-sm px-6 py-5 flex flex-col md:flex-row items-center gap-6 hover:border-primary/40 transition-colors group">
                <div class="w-12 h-12 flex-shrink-0 bg-background-light rounded-sm flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    <span class="material-symbols-outlined text-primary">${mod.icon || 'book'}</span>
                </div>
                <div class="flex-grow">
                    <h4 class="text-lg font-bold text-text-main">${mod.name}</h4>
                    <p class="text-sm text-text-muted">${mod.description}</p>
                </div>
                <div class="flex items-center gap-6">
                    ${mod.questions ? `
                    <div class="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full">
                        <span class="text-[10px] font-bold uppercase text-primary">${mod.questions} Qs</span>
                    </div>
                    ` : ''}
                    <div class="flex items-center gap-2">
                        <button onclick="location.hash='#/flashcards/${subject.id}/${topic.id}/${mod.id}'" class="p-2 text-text-muted hover:text-primary transition-colors flex items-center gap-2" title="Flashcards">
                            <span class="material-symbols-outlined">style</span>
                            <span class="text-[10px] font-bold uppercase hidden sm:inline">Flashcards</span>
                        </button>
                        <button onclick="location.hash='#/quiz/${subject.id}/${topic.id}/${mod.id}'" class="p-2 text-text-muted hover:text-primary transition-colors flex items-center gap-2" title="Quiz">
                            <span class="material-symbols-outlined">quiz</span>
                            <span class="text-[10px] font-bold uppercase hidden sm:inline">Quiz</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="max-w-[1400px] w-full mx-auto p-8 lg:p-12">
                <nav class="flex items-center gap-2 mb-8 text-sm text-text-muted font-medium">
                    <a class="hover:text-primary" href="#/subject/${subject.id}">${subject.name}</a>
                    <span class="material-symbols-outlined text-xs">chevron_right</span>
                    <span class="text-text-main">${topic.name}</span>
                </nav>

                <header class="mb-16 max-w-5xl">
                    <h1 class="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 text-text-main font-display">${topic.name}</h1>
                    <p class="text-lg text-text-muted leading-relaxed max-w-3xl">
                        ${topic.description}
                    </p>
                </header>

                <!-- Learning Modules -->
                <section class="max-w-5xl">
                    <div class="mb-8">
                        <h2 class="text-sm font-bold uppercase tracking-[0.05em] text-primary">Learning Modules</h2>
                    </div>
                    <div class="space-y-4">
                        ${modulesList}
                    </div>
                </section>

                <!-- Topic Quizzes -->
                <section class="max-w-5xl mt-16">
                    <div class="mb-8">
                        <h2 class="text-sm font-bold uppercase tracking-[0.05em] text-primary">Topic Quizzes</h2>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        ${[1, 2, 3].map(n => `
                            <div onclick="location.hash='#/topic-quiz/${subject.id}/${topic.id}/${n}'"
                                 class="bg-surface border border-border-color rounded-sm p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors cursor-pointer group">
                                <div class="w-10 h-10 flex-shrink-0 bg-background-light rounded-sm flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                                    <span class="material-symbols-outlined text-primary">quiz</span>
                                </div>
                                <div>
                                    <h4 class="text-base font-bold text-text-main">Quiz ${n}</h4>
                                    <p class="text-xs text-text-muted mt-1">${n}. gyakorló teszt ehhez a témához</p>
                                </div>
                                <div class="mt-auto pt-4 border-t border-border-color flex items-center justify-between">
                                    <span class="text-[10px] font-bold uppercase text-primary tracking-widest">Indítás</span>
                                    <span class="material-symbols-outlined text-text-muted text-[18px] group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <div class="mt-20 flex flex-wrap gap-12 text-text-muted text-xs uppercase font-bold tracking-widest border-t border-border-color pt-12">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">schedule</span>
                        <span>Estimated: ${topic.time}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">stars</span>
                        <span>Difficulty: ${topic.difficulty}</span>
                    </div>
                </div>
            </div>
        `;
    },

    Resources(subject, topic) {
        return `
            <div class="max-w-[1400px] w-full mx-auto p-8 lg:p-12">
                <div class="mb-12">
                    <a href="#/subject/${subject.id}/topic/${topic.id}" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6 group">
                        <span class="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span class="text-sm font-bold uppercase tracking-widest">Back to ${topic.name}</span>
                    </a>
                    <h1 class="text-5xl font-bold text-text-main tracking-tight font-display mb-4">Resources</h1>
                    <p class="text-lg text-text-muted max-w-2xl">Supplementary materials for ${topic.name}.</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Video Overview -->
                    <div class="flex flex-col gap-6">
                        <h3 class="text-2xl font-bold font-display">Video Lecture</h3>
                        <div class="aspect-video bg-black rounded-sm overflow-hidden border border-border-color">
                            <video controls class="w-full h-full">
                                <source src="assets/video/${topic.id}.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <!-- Audio Overview -->
                    <div class="flex flex-col gap-6">
                        <h3 class="text-2xl font-bold font-display">Audio Summary</h3>
                        <div class="bg-surface border border-border-color p-8 rounded-sm flex flex-col gap-4">
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-4xl text-primary">audiotrack</span>
                                <div>
                                    <h4 class="font-bold">${topic.name} Overview</h4>
                                    <p class="text-xs text-text-muted uppercase tracking-widest">Audio Lecture • 12:45</p>
                                </div>
                            </div>
                            <audio controls class="w-full mt-4">
                                <source src="assets/audio/${topic.id}.mp3" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>

                        <!-- Slide Deck Placeholder -->
                        <h3 class="text-2xl font-bold font-display mt-6">Slide Deck</h3>
                        <div onclick="window.open('assets/slides/${topic.id}.pdf')" class="bg-surface border border-border-color p-8 rounded-sm card-hover cursor-pointer group flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-4xl text-primary">presentation_play</span>
                                <div>
                                    <h4 class="font-bold">Lecture Slides</h4>
                                    <p class="text-sm text-text-muted">Download as PDF</p>
                                </div>
                            </div>
                            <span class="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">download</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    Flashcards(data, subjectId, topicId, moduleId) {
        if (!data) return `
            <div class="flex flex-col items-center justify-center p-20">
                <h2 class="text-2xl font-bold mb-4">No flashcards found.</h2>
                <a href="#/subject/${subjectId}/topic/${topicId}" class="text-primary hover:underline font-bold uppercase tracking-widest text-sm">Back to Topic</a>
            </div>
        `;
        const { flashcards } = data;
        return `
            <div class="flex-grow flex flex-col items-center justify-center px-4 relative">
                <header class="absolute top-0 w-full px-8 py-6 flex justify-between items-center z-10">
                    <a href="#/subject/${subjectId}/topic/${topicId}" class="flex items-center gap-2 text-muted hover:text-text-main transition-colors duration-200 group">
                        <span class="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span class="font-body font-medium text-[15px]">Exit Session</span>
                    </a>
                    <div class="flex items-center gap-4">
                        <div class="hidden sm:block w-32 h-[4px] bg-border-color rounded-full overflow-hidden">
                            <div id="flashcard-progress-bar" class="h-full bg-primary rounded-full w-0 transition-all duration-500"></div>
                        </div>
                        <span id="flashcard-counter" class="font-body font-medium text-text-muted text-[14px] tracking-wide">1 / ${flashcards.length}</span>
                    </div>
                </header>

                <button id="prev-card" class="fixed left-2 sm:left-12 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-all p-3 sm:p-4 rounded-full bg-surface/90 sm:bg-transparent shadow-md sm:shadow-none border border-border-color sm:border-none z-50 active:scale-95">
                    <span class="material-symbols-outlined text-3xl sm:text-4xl">chevron_left</span>
                </button>
                <button id="next-card" class="fixed right-2 sm:right-12 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-all p-3 sm:p-4 rounded-full bg-surface/90 sm:bg-transparent shadow-md sm:shadow-none border border-border-color sm:border-none z-50 active:scale-95">
                    <span class="material-symbols-outlined text-3xl sm:text-4xl">chevron_right</span>
                </button>

                <div id="flashcard-container" class="perspective-1000 w-full max-w-[600px] h-[400px] block group cursor-pointer">
                    <div id="flashcard-inner" class="card-inner relative w-full h-full transform-style-3d flip-transition shadow-sm hover:shadow-md transition-shadow duration-300 rounded">
                        <div id="card-front" class="absolute w-full h-full backface-hidden bg-surface border border-border-color rounded flex flex-col items-center justify-center p-8">
                            <span class="text-primary text-sm font-medium uppercase tracking-widest mb-4">Term</span>
                            <h2 id="card-term" class="font-display font-bold text-[32px] sm:text-[40px] text-text-main text-center leading-tight">Loading...</h2>
                        </div>
                        <div id="card-back" class="absolute w-full h-full backface-hidden bg-surface border border-primary/20 rounded flex flex-col items-center justify-center p-12 rotate-y-180">
                            <div class="max-w-[80%] text-center">
                                <p id="card-definition" class="font-body text-[18px] sm:text-[20px] leading-relaxed text-text-main">Loading...</p>
                                <p id="card-text" class="mt-4 font-body text-[15px] leading-relaxed text-text-muted italic"></p>
                                <p id="card-quote" class="mt-6 font-display font-bold text-primary text-[16px]"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-12 flex items-center gap-3 text-text-muted">
                    <span class="material-symbols-outlined text-[18px]">touch_app</span>
                    <p class="font-body text-[13px] font-medium tracking-wide">Click to flip | Use arrows to navigate</p>
                </div>
            </div>
        `;
    },

    Quiz(data, subjectId, topicId, moduleId) {
        if (!data) return `
            <div class="flex flex-col items-center justify-center p-20">
                <h2 class="text-2xl font-bold mb-4">No quiz found.</h2>
                <a href="#/subject/${subjectId}/topic/${topicId}" class="text-primary hover:underline font-bold uppercase tracking-widest text-sm">Back to Topic</a>
            </div>
        `;
        const { quiz } = data;
        return `
            <div class="max-w-[800px] w-full mx-auto p-8 lg:p-12 flex flex-col items-center">
                <header class="w-full mb-12 flex justify-between items-center">
                    <a href="#/subject/${subjectId}/topic/${topicId}" class="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors group">
                        <span class="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span class="font-body font-medium text-[15px]">Exit Quiz</span>
                    </a>
                    <div class="flex items-center gap-4 text-text-muted text-sm font-bold uppercase tracking-widest">
                        Question <span id="quiz-counter">1 / ${quiz.length}</span>
                    </div>
                </header>

                <div id="quiz-question-container" class="w-full bg-surface border border-border-color p-10 rounded-sm shadow-sm mb-8">
                    <h2 id="quiz-question-text" class="text-2xl font-bold font-display text-text-main mb-10 leading-snug">Loading...</h2>
                    <div id="quiz-options" class="grid grid-cols-1 gap-4"></div>
                </div>

                <div id="quiz-feedback" class="w-full p-4 rounded-sm text-center font-bold text-sm hidden mb-8"></div>
                <button id="next-question" class="hidden px-8 py-3 bg-primary text-white font-bold rounded-sm hover:opacity-90 transition-opacity">Next Question</button>

                <div id="quiz-results" class="hidden w-full text-center">
                    <h2 class="text-4xl font-bold font-display mb-6">Quiz Complete!</h2>
                    <p id="quiz-score" class="text-xl text-text-muted mb-10"></p>
                    <a href="#/subject/${subjectId}/topic/${topicId}" class="inline-block px-8 py-3 bg-primary text-white font-bold rounded-sm hover:opacity-90 transition-opacity">Return to Topic</a>
                </div>
            </div>
        `;
    },

    SubjectQuiz(data, subjectId, quizNumber) {
        const isExpert = parseInt(quizNumber) >= 9;
        if (!data) return `
            <div class="flex flex-col items-center justify-center p-20">
                <h2 class="text-2xl font-bold mb-4">No quiz found.</h2>
                <a href="#/subject/${subjectId}" class="text-primary hover:underline font-bold uppercase tracking-widest text-sm">Back to Subject</a>
            </div>
        `;
        const { quiz } = data;
        return `
            <div class="max-w-[800px] w-full mx-auto p-8 lg:p-12 flex flex-col items-center">
                <header class="w-full mb-12 flex justify-between items-center">
                    <a href="#/subject/${subjectId}" class="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors group">
                        <span class="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span class="font-body font-medium text-[15px]">Exit Quiz</span>
                    </a>
                    <div class="flex items-center gap-4">
                        ${isExpert ? '<span class="text-[10px] font-bold uppercase text-red-500 tracking-widest px-3 py-1 bg-red-50 border border-red-200 rounded-full">Expert Level</span>' : ''}
                        <div class="text-text-muted text-sm font-bold uppercase tracking-widest">
                            Question <span id="quiz-counter">1 / ${quiz.length}</span>
                        </div>
                    </div>
                </header>

                <div id="quiz-question-container" class="w-full bg-surface border border-border-color p-10 rounded-sm shadow-sm mb-8">
                    <h2 id="quiz-question-text" class="text-2xl font-bold font-display text-text-main mb-10 leading-snug">Loading...</h2>
                    <div id="quiz-options" class="grid grid-cols-1 gap-4"></div>
                </div>

                <div id="quiz-feedback" class="w-full p-4 rounded-sm text-center font-bold text-sm hidden mb-8"></div>
                <button id="next-question" class="hidden px-8 py-3 bg-primary text-white font-bold rounded-sm hover:opacity-90 transition-opacity">Next Question</button>

                <div id="quiz-results" class="hidden w-full text-center">
                    <h2 class="text-4xl font-bold font-display mb-6">Quiz Complete!</h2>
                    <p id="quiz-score" class="text-xl text-text-muted mb-10"></p>
                    <a href="#/subject/${subjectId}" class="inline-block px-8 py-3 bg-primary text-white font-bold rounded-sm hover:opacity-90 transition-opacity">Return to Subject</a>
                </div>
            </div>
        `;
    }
};
