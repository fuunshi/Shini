document.addEventListener('DOMContentLoaded', function () {
    // Utility function for animation delay
    function setAnimationDelay(elements, baseDelay = 0.1) {
        elements.forEach((el, index) => {
            el.style.animationDelay = `${baseDelay * index}s`;
        });
    }

    // Project Section
    const projectsContainer = document.getElementById('projects-container');

    fetch('../json/projects.json')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('project-card', 'animate-fadeInUp');
                    projectCard.innerHTML = `
                        <div class="relative overflow-hidden">
                            <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                            <div class="project-overlay flex items-center justify-center">
                                <div class="space-x-4">
                                    <a href="${project.codeLink}" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                                        <i class="fab fa-github mr-2"></i>Code
                                    </a>
                                    <a href="${project.demoLink}" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                                        <i class="fas fa-external-link-alt mr-2"></i>Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-xl mb-3 text-blue-400">${project.title}</h3>
                            <p class="text-gray-300 mb-4">${project.description}</p>
                        </div>
                    `;
                    projectsContainer.appendChild(projectCard);
                });
                
                // Add animation delays
                setAnimationDelay(document.querySelectorAll('.project-card'));
            } else {
                document.getElementById('projects').style.display = 'none';
                document.querySelector('a[href="#projects"]').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            document.getElementById('projects').style.display = 'none';
            document.querySelector('a[href="#projects"]').style.display = 'none';
        });

    // Skills Section
    const skillsContainer = document.getElementById('skills-container');

    fetch('../json/skills.json')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(skill => {
                    const skillDiv = document.createElement('div');
                    skillDiv.classList.add('skill-icon', 'animate-fadeInUp', 'p-4');
                    
                    const skillImg = document.createElement('img');
                    skillImg.classList.add('h-20', 'w-20', 'mx-auto');
                    skillImg.src = skill.url;
                    skillImg.alt = skill.name;
                    
                    const skillName = document.createElement('p');
                    skillName.classList.add('text-center', 'mt-2', 'text-sm', 'text-gray-300');
                    skillName.textContent = skill.name;
                    
                    skillDiv.appendChild(skillImg);
                    skillDiv.appendChild(skillName);
                    skillsContainer.appendChild(skillDiv);
                });
                
                // Add animation delays
                setAnimationDelay(document.querySelectorAll('.skill-icon'));
            } else {
                document.getElementById('skills').style.display = 'none';
                document.querySelector('a[href="#skills"]').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching skills:', error);
            document.getElementById('skills').style.display = 'none';
            document.querySelector('a[href="#skills"]').style.display = 'none';
        });

    // Experiences Section
    const experiencesContainer = document.getElementById('experiences-container');

    fetch('../json/experiences.json')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(experience => {
                    const experienceCard = document.createElement('div');
                    experienceCard.classList.add('experience-card', 'animate-fadeInUp');
                    experienceCard.innerHTML = `
                        <div class="p-6">
                            <h3 class="font-bold text-xl mb-2 text-blue-400">${experience.title}</h3>
                            <p class="text-gray-300 mb-4">${experience.compName}</p>
                            <div class="space-y-2">
                                ${experience.description.map(point => `
                                    <p class="text-gray-400 flex items-start">
                                        <span class="text-blue-400 mr-2">▹</span>
                                        ${point.substring(2)}
                                    </p>
                                `).join('')}
                            </div>
                            <p class="date">${experience.from} - ${experience.to}</p>
                        </div>
                    `;
                    experiencesContainer.appendChild(experienceCard);
                });
                
                // Add animation delays
                setAnimationDelay(document.querySelectorAll('.experience-card'));
            } else {
                document.getElementById('experiences').style.display = 'none';
                document.querySelector('a[href="#experiences"]').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching experiences:', error);
            document.getElementById('experiences').style.display = 'none';
            document.querySelector('a[href="#experiences"]').style.display = 'none';
        });

    // Certifications Section
    const certificationsContainer = document.getElementById('certifications-container');

    fetch('../json/certifications.json')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(certificate => {
                    const certificateCard = document.createElement('div');
                    certificateCard.classList.add('certification-card', 'animate-fadeInUp');
                    certificateCard.innerHTML = `
                        <div class="relative overflow-hidden">
                            <img src="${certificate.imgURL}" alt="${certificate.title}" class="w-full h-48 object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-xl mb-2 text-blue-400">${certificate.title}</h3>
                            <p class="text-gray-300 mb-4">${certificate.desc}</p>
                            <a href="${certificate.imgURL}" class="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                                <i class="fas fa-certificate mr-2"></i>View Certificate
                            </a>
                        </div>
                    `;
                    certificationsContainer.appendChild(certificateCard);
                });
                
                // Add animation delays
                setAnimationDelay(document.querySelectorAll('.certification-card'));
            } else {
                document.getElementById('certifications').style.display = 'none';
                document.querySelector('a[href="#certifications"]').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching certifications:', error);
            document.getElementById('certifications').style.display = 'none';
            document.querySelector('a[href="#certifications"]').style.display = 'none';
        });
});