const Router = {
    routes: {},
    
    init(routes) {
        this.routes = routes;
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },

    handleRoute() {
        const hash = window.location.hash || '#/';
        
        // Find matching route
        for (const path in this.routes) {
            const pattern = new RegExp('^' + path.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');
            const match = hash.match(pattern);
            
            if (match) {
                const params = match.slice(1);
                this.routes[path](...params);
                return;
            }
        }
        
        // Default to dashboard if no match
        this.routes['#/']();
    }
};
