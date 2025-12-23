/* 
 * Note: This file loads data from JSON files that are controlled by the site owner.
 * The JSON files (projects.json, skills.json, etc.) should only be edited by trusted sources.
 * While some innerHTML usage remains for convenience, ensure JSON data is never user-generated.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Utility function for animation delay
    function setAnimationDelay(elements, baseDelay = 0.1) {
        elements.forEach((el, index) => {
            el.style.animationDelay = `${baseDelay * index}s`;
        });
    }

    // Social Links Section (About page and Footer)
    function loadSocialLinks() {
        const aboutContainer = document.getElementById('social-links-container');
        const footerContainer = document.getElementById('footer-social-links');

        fetch('./json/links.json')
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Load social links in About section
                    data.forEach(link => {
                        const linkElement = document.createElement('a');
                        linkElement.href = link.url;
                        linkElement.target = '_blank';
                        linkElement.rel = 'noopener noreferrer';
                        linkElement.classList.add('social-link');
                        
                        const icon = document.createElement('i');
                        icon.className = link.icon;
                        // Validate color to prevent CSS injection
                        if (link.color && /^#[0-9A-Fa-f]{3,6}$/.test(link.color)) {
                            icon.style.color = link.color;
                        }
                        
                        const span = document.createElement('span');
                        span.textContent = link.name;
                        
                        const externalIcon = document.createElement('i');
                        externalIcon.className = 'fas fa-external-link-alt ml-auto text-sm';
                        
                        linkElement.appendChild(icon);
                        linkElement.appendChild(span);
                        linkElement.appendChild(externalIcon);
                        aboutContainer.appendChild(linkElement);
                    });

                    // Load social links in Footer
                    data.forEach(link => {
                        const footerLink = document.createElement('a');
                        footerLink.href = link.url;
                        footerLink.target = '_blank';
                        footerLink.rel = 'noopener noreferrer';
                        footerLink.title = link.name;
                        
                        const footerIcon = document.createElement('i');
                        footerIcon.className = link.icon;
                        footerLink.appendChild(footerIcon);
                        
                        footerContainer.appendChild(footerLink);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading social links from JSON:', error);
            });
    }

    loadSocialLinks();

    // Project Section
    const projectsContainer = document.getElementById('projects-container');

    fetch('./json/projects.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('project-card');
                    projectCard.innerHTML = `
                        <div class="relative">
                            <img src="${project.image}" alt="${project.title}">
                            <div class="project-overlay">
                                <a href="${project.codeLink}" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-github"></i>Code
                                </a>
                                <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-external-link-alt"></i>Demo
                                </a>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                        </div>
                    `;
                    projectsContainer.appendChild(projectCard);
                });
                
                setAnimationDelay(document.querySelectorAll('.project-card'));
            } else {
                document.getElementById('projects').style.display = 'none';
                const projectLink = document.querySelector('a[href="#projects"]');
                if (projectLink) projectLink.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error loading projects from JSON:', error);
            document.getElementById('projects').style.display = 'none';
            const projectLink = document.querySelector('a[href="#projects"]');
            if (projectLink) projectLink.style.display = 'none';
        });

    // Skills Section
    const skillsContainer = document.getElementById('skills-container');

    fetch('./json/skills.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                // Duplicate the skills array for seamless loop
                const duplicatedData = [...data, ...data];
                
                duplicatedData.forEach(skill => {
                    const skillDiv = document.createElement('div');
                    skillDiv.classList.add('skill-icon');
                    skillDiv.innerHTML = `
                        <img src="${skill.url}" alt="${skill.name}">
                        <p>${skill.name}</p>
                    `;
                    skillsContainer.appendChild(skillDiv);
                });
                
                setAnimationDelay(document.querySelectorAll('.skill-icon'));
            } else {
                document.getElementById('skills').style.display = 'none';
                const skillsLink = document.querySelector('a[href="#skills"]');
                if (skillsLink) skillsLink.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error loading skills from JSON:', error);
            document.getElementById('skills').style.display = 'none';
            const skillsLink = document.querySelector('a[href="#skills"]');
            if (skillsLink) skillsLink.style.display = 'none';
        });

    // Experiences Section
    const experiencesContainer = document.getElementById('experiences-container');

    fetch('./json/experiences.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach(experience => {
                    const experienceCard = document.createElement('div');
                    experienceCard.classList.add('timeline-item');
                    experienceCard.innerHTML = `
                        <div class="timeline-content">
                            <div class="timeline-date">${experience.from} - ${experience.to}</div>
                            <h3>${experience.title}</h3>
                            <p>${experience.compName}</p>
                            <div class="space-y-2">
                                ${experience.description.map(point => `
                                    <p>
                                        <span>▹</span>
                                        ${point.substring(2)}
                                    </p>
                                `).join('')}
                            </div>
                        </div>
                    `;
                    experiencesContainer.appendChild(experienceCard);
                });
                
                setAnimationDelay(document.querySelectorAll('.timeline-item'));
            } else {
                document.getElementById('experiences').style.display = 'none';
                const experiencesLink = document.querySelector('a[href="#experiences"]');
                if (experiencesLink) experiencesLink.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error loading experiences from JSON:', error);
            document.getElementById('experiences').style.display = 'none';
            const experiencesLink = document.querySelector('a[href="#experiences"]');
            if (experiencesLink) experiencesLink.style.display = 'none';
        });

    // Certifications Section
    const certificationsContainer = document.getElementById('certifications-container');

    fetch('./json/certifications.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach(certificate => {
                    const certificateCard = document.createElement('div');
                    certificateCard.classList.add('certification-card');
                    certificateCard.innerHTML = `
                        <div class="relative">
                            <img src="${certificate.imgURL}" alt="${certificate.title}">
                            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        </div>
                        <div class="p-6">
                            <h3>${certificate.title}</h3>
                            <p>${certificate.desc}</p>
                            <a href="${certificate.imgURL}" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-certificate"></i>View Certificate
                            </a>
                        </div>
                    `;
                    certificationsContainer.appendChild(certificateCard);
                });
                
                setAnimationDelay(document.querySelectorAll('.certification-card'));
            } else {
                document.getElementById('certifications').style.display = 'none';
                const certificationsLink = document.querySelector('a[href="#certifications"]');
                if (certificationsLink) certificationsLink.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error loading certifications from JSON:', error);
            document.getElementById('certifications').style.display = 'none';
            const certificationsLink = document.querySelector('a[href="#certifications"]');
            if (certificationsLink) certificationsLink.style.display = 'none';
        });
});