/* 
   Harshida Joshi | Portfolio Script
   Functionality: AI Chat, Smooth Scroll, Reveal Animations
*/

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Intersection Observer for Reveals --- */
    const revealElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    /* --- 2. AI Assistant Simulation --- */
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    const responses = {
        "hello": "Hi there! I'm Harshida's AI assistant. Ask me about her projects (ERP, BERT, Restro), her 3+ years experience, or her hobbies!",
        "projects": "Harshida has built production-scale systems like a School ERP (Laravel), an Explainable QA system using BERT, and a Restaurant Management Suite.",
        "erp": "The School ERP is a modular Laravel system managing records, finance, and scheduling for active institutes. It's built for high-concurrency.",
        "bert": "The 'Explainable QA Using BERT' project is a semantic search engine that provides answers with transparent reasoning from documents.",
        "skills": "She is an expert in PHP/Laravel and Python (Flask) for the backend, with strong HTML5/CSS3/JS/Bootstrap frontend skills.",
        "experience": "She has over 3+ years of experience, currently focused on architecting scalable ERP solutions at Alpha Computers.",
        "hobbies": "She enjoys travelling to new places, reading, and keeps up with modern AI trends.",
        "contact": "You can reach Harshida at harshidhijoshi@gmail.com or find her on LinkedIn/GitHub via the links below!",
        "default": "That's an interesting question! Harshida specializes in scaling web apps and integrating AI. Would you like to hear about her work in ERP systems or her BERT project?"
    };

    const addMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleInput = () => {
        const userQuery = chatInput.value.trim().toLowerCase();
        if (!userQuery) return;

        addMessage(chatInput.value, true);
        chatInput.value = '';

        setTimeout(() => {
            let reply = responses.default;
            for (let key in responses) {
                if (userQuery.includes(key)) {
                    reply = responses[key];
                    break;
                }
            }
            addMessage(reply);
        }, 600);
    };

    if (chatSend) {
        chatSend.addEventListener('click', handleInput);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleInput();
        });
    }

    /* --- 3. Smooth Scrolling --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
