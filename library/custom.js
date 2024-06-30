document.addEventListener('DOMContentLoaded', function () {
    // Project Section
    const projectsContainer = document.getElementById('projects-container');

    fetch('../json/projects.json')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('project-card');
                    projectCard.innerHTML = `
                        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="font-bold text-xl mb-2">${project.title}</h3>
                            <p class="text-gray-700 mb-4">${project.description}</p>
                            <div class="flex justify-center space-x-4">
                                <a href="${project.codeLink}" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Code</a>
                                <a href="${project.demoLink}" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Try It</a>
                            </div>
                        </div>
                    `;
                    projectsContainer.appendChild(projectCard);
                });
            } else {
                document.getElementById('projects').style.display = 'none'; // Hide section if no projects
                document.querySelector('a[href="#projects"]').style.display = 'none'; // Hide navbar link for Projects
            }
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            document.getElementById('projects').style.display = 'none'; // Hide section on error
            document.querySelector('a[href="#projects"]').style.display = 'none'; // Hide navbar link for Projects
        });

    // Skills Section
    const skillsContainer = document.getElementById('skills-container');

    fetch('../json/skills.json')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(skill => {
                    const skillImg = document.createElement('img');
                    skillImg.classList.add('h-24', 'w-24')
                    skillImg.src = skill.url;
                    skillImg.alt = skill.name;

                    skillsContainer.appendChild(skillImg);
                });
            } else {
                document.getElementById('skills').style.display = 'none'; // Hide skills section if no skills are available
                document.querySelector('a[href="#skills"]').style.display = 'none'; // Hide navbar link for Skills
            }
        })
        .catch(error => {
            console.error('Error fetching skills:', error);
            document.getElementById('skills').style.display = 'none'; // Hide section on error
            document.querySelector('a[href="#skills"]').style.display = 'none'; // Hide navbar link for Skills
        });

    // Experiences Section
    const experiencesContainer = document.getElementById('experiences-container');

    fetch('../json/experiences.json')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(experience => {
                    const experienceCard = document.createElement('div');
                    experienceCard.classList.add('experience-card');
                    experienceCard.innerHTML = `
                        <div class="p-4">
                            <h3 class="font-bold text-xl mb-2">${experience.title}</h3>
                            <p class="text-gray-700 mb-2">${experience.compName}</p>
                            ${experience.description.map(point => `<p>${point}</p>`).join('')}
                            <p class="date">${experience.from} - ${experience.to}</p>
                        </div>
                    `;
                    experiencesContainer.appendChild(experienceCard);
                });
            } else {
                document.getElementById('experiences').style.display = 'none'; // Hide Experience section if no experiences are available
                document.querySelector('a[href="#experiences"]').style.display = 'none'; // Hide navbar link for Experiences
            }
        })
        .catch(error => {
            console.error('Error fetching experiences:', error);
            document.getElementById('experiences').style.display = 'none'; // Hide section on error
            document.querySelector('a[href="#experiences"]').style.display = 'none'; // Hide navbar link for Experiences
        });

    // Certifications Section
    const certificationsContainer = document.getElementById('certifications-container');

    fetch('../json/certifications.json')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(certificate => {
                    const certificateCard = document.createElement('div');
                    certificateCard.classList.add('certification-card');
                    certificateCard.innerHTML = `
                        <img src="${certificate.imgURL}" alt="${certificate.title}" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="font-bold text-xl mb-2">${certificate.title}</h3>
                            <p class="text-gray-700 mb-2">${certificate.desc}</p>
                            <a href="${certificate.imgURL}" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">View</a>
                        </div>
                    `;
                    certificationsContainer.appendChild(certificateCard);
                });
            } else {
                document.getElementById('certifications').style.display = 'none'; // Hide Certifications section if no certifications are available
                document.querySelector('a[href="#certifications"]').style.display = 'none'; // Hide navbar link for Certifications
            }
        })
        .catch(error => {
            console.error('Error fetching certifications:', error);
            document.getElementById('certifications').style.display = 'none'; // Hide section on error
            document.querySelector('a[href="#certifications"]').style.display = 'none'; // Hide navbar link for Certifications
        });
});
