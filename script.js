 // DOM Elements
        const welcomePopup = document.getElementById('welcomePopup');
        const enterSiteBtn = document.getElementById('enterSite');
        const themeToggleBtn = document.getElementById('themeToggle');
        const menuToggleBtn = document.getElementById('menuToggle');
        const settingsPanel = document.getElementById('settingsPanel');
        const themeOptions = document.querySelectorAll('.theme-option');
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        const successMessage = document.getElementById('successMessage');
        const submissionTime = document.getElementById('submissionTime');
        const body = document.body;
        const themeToast = document.getElementById('themeToast');
        const toastMessage = document.getElementById('toastMessage');
        const skillCards = document.querySelectorAll('.skill-card');
        
        // Theme names mapping for toast messages
        const themeNames = {
            'theme-black-yellow': 'Black-Yellow',
            'theme-dark': 'Dark Mode', 
            'theme-light': 'Light',
            'theme-purple': 'Purple',
            'theme-black-green': 'Black-Green',
            'theme-fade-blue': 'Fade Blue',
            'theme-fade-red': 'Fade Red'
        };
        
        // Show toast notification
        function showToast(themeName) {
            toastMessage.textContent = `${themeName} theme activated`;
            themeToast.classList.add('show');
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                themeToast.classList.remove('show');
            }, 3000);
        }
        
        // Welcome Popup - Close when ANYWHERE on screen is clicked
        welcomePopup.addEventListener('click', function(event) {
            // Only close if the click is on the overlay (not the content)
            if (event.target === welcomePopup) {
                welcomePopup.classList.remove('active');
                localStorage.setItem('hasVisited', 'true');
            }
        });
        
        // Also close when button is clicked (for button functionality)
        enterSiteBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling to parent
            welcomePopup.classList.remove('active');
            localStorage.setItem('hasVisited', 'true');
        });
        
        // Prevent clicks inside content from closing the popup
        document.querySelector('.welcome-content').addEventListener('click', function(event) {
            event.stopPropagation();
        });
        
        // Check if user has visited before
        if (localStorage.getItem('hasVisited') === 'true') {
            welcomePopup.classList.remove('active');
        }
        
        // Toggle Settings Panel
        menuToggleBtn.addEventListener('click', function() {
            settingsPanel.classList.toggle('active');
        });
        
        // Close settings panel when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.settings-panel') && !event.target.closest('.hamburger-menu') && !event.target.closest('.theme-btn')) {
                settingsPanel.classList.remove('active');
            }
        });
        
        // Theme Switching Functionality
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Get selected theme
                const selectedTheme = this.getAttribute('data-theme');
                const themeName = themeNames[selectedTheme];
                
                // Remove all theme classes from body
                body.classList.remove('theme-black-yellow', 'theme-dark', 'theme-light', 'theme-purple', 'theme-black-green', 'theme-fade-blue', 'theme-fade-red');
                
                // Add selected theme class
                body.classList.add(selectedTheme);
                
                // Update active theme option
                themeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update theme toggle button color
                updateThemeToggleColor();
                
                // Store theme preference
                localStorage.setItem('selectedTheme', selectedTheme);
                
                // Show toast notification
                showToast(themeName);
                
                // Close settings panel
                settingsPanel.classList.remove('active');
            });
        });
        
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            body.classList.remove('theme-black-yellow');
            body.classList.add(savedTheme);
            
            // Update active theme option
            themeOptions.forEach(option => {
                if (option.getAttribute('data-theme') === savedTheme) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        }
        
        // Update theme toggle button color function
        function updateThemeToggleColor() {
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            themeToggleBtn.style.backgroundColor = primaryColor;
            themeToggleBtn.style.color = 'white';
            
            // Update hamburger menu color
            const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
            menuToggleBtn.style.backgroundColor = secondaryColor;
        }
        
        // Contact Form Submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Get current date and time
            const now = new Date();
            const dateTimeString = now.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            // Simple validation
            if (name && email && subject && message) {
                // Show success message in the form
                successMessage.textContent = `Thank you ${name}! Your message "${subject}" has been submitted successfully.`;
                submissionTime.innerHTML = `<i class="far fa-clock"></i> Submitted on: ${dateTimeString}`;
                
                // Show the success message
                formSuccess.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 8 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 8000);
            } else {
                alert('Please fill in all fields before submitting.');
            }
        });
        
        // Random Theme Toggle Button
        themeToggleBtn.addEventListener('click', function() {
            const allThemes = ['theme-black-yellow', 'theme-dark', 'theme-light', 'theme-purple', 'theme-black-green', 'theme-fade-blue', 'theme-fade-red'];
            
            // Get current theme
            const currentTheme = body.classList[0];
            
            // Filter out current theme
            const availableThemes = allThemes.filter(theme => theme !== currentTheme);
            
            // Pick random theme
            const randomIndex = Math.floor(Math.random() * availableThemes.length);
            const randomTheme = availableThemes[randomIndex];
            const themeName = themeNames[randomTheme];
            
            // Remove all theme classes from body
            body.classList.remove(...allThemes);
            
            // Add random theme class
            body.classList.add(randomTheme);
            
            // Update active theme option
            themeOptions.forEach(option => {
                if (option.getAttribute('data-theme') === randomTheme) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
            
            // Update theme toggle button color
            updateThemeToggleColor();
            
            // Store theme preference
            localStorage.setItem('selectedTheme', randomTheme);
            
            // Show toast notification
            showToast(themeName);
        });
        
        // Update theme button color on page load
        window.addEventListener('load', function() {
            updateThemeToggleColor();
            
            // Initialize skill percentages
            initializeSkillPercentages();
        });
        
        // Initialize skill percentages
        function initializeSkillPercentages() {
            skillCards.forEach(card => {
                const progressBar = card.querySelector('.progress-bar');
                const progressValue = card.querySelector('.skill-progress-value');
                const percentage = progressBar.getAttribute('data-percentage');
                
                // Calculate the stroke-dashoffset based on percentage
                const circumference = 2 * Math.PI * 65;
                const offset = circumference - (percentage / 100) * circumference;
                
                // Set the stroke-dashoffset
                progressBar.style.strokeDasharray = 440;
                progressBar.style.strokeDashoffset = offset;
                
                // Set the percentage text
                progressValue.textContent = percentage + "%";
                
                // Add skill level description
                const skillLevel = card.querySelector('.skill-level');
                if (skillLevel) {
                    const endValue = parseInt(percentage);
                    if (endValue >= 90) {
                        skillLevel.textContent = "Expert Level";
                    } else if (endValue >= 80) {
                        skillLevel.textContent = "Advanced Level";
                    } else if (endValue >= 70) {
                        skillLevel.textContent = "Intermediate Level";
                    } else {
                        skillLevel.textContent = "Beginner Level";
                    }
                }
            });
        }
        
        // Skill Percentage Animation on Scroll
        function animateSkillBars() {
            skillCards.forEach(card => {
                const progressBar = card.querySelector('.progress-bar');
                const progressValue = card.querySelector('.skill-progress-value');
                const percentage = progressBar.getAttribute('data-percentage');
                
                // Calculate the stroke-dashoffset based on percentage
                const circumference = 2 * Math.PI * 65;
                const offset = circumference - (percentage / 100) * circumference;
                
                // Set the stroke-dashoffset
                progressBar.style.strokeDashoffset = offset;
                
                // Animate the percentage text
                let startValue = 0;
                const endValue = parseInt(percentage);
                const duration = 1500; // Animation duration in milliseconds
                const increment = endValue / (duration / 16); // 60fps
                
                const counter = setInterval(() => {
                    startValue += increment;
                    if (startValue >= endValue) {
                        startValue = endValue;
                        clearInterval(counter);
                    }
                    progressValue.textContent = Math.floor(startValue) + "%";
                }, 16);
            });
        }
        
        // Check if skill cards are in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (windowHeight + 200) && // 200px offset for early trigger
                rect.right <= windowWidth
            );
        }
        
        // Handle scroll events for skill animation
        let skillsAnimated = false;
        window.addEventListener('scroll', function() {
            const skillsSection = document.getElementById('skills-section');
            
            if (isElementInViewport(skillsSection) && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
        
        // Trigger skill animation on page load if skills section is already visible
        window.addEventListener('load', function() {
            const skillsSection = document.getElementById('skills-section');
            if (isElementInViewport(skillsSection)) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });