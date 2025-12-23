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

    // Project Section with detail page
    const projectsContainer = document.getElementById('projects-container');
    let projectsData = [];

    fetch('./json/projects.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                projectsData = data;
                data.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('project-card');
                    projectCard.style.cursor = 'pointer';
                    projectCard.setAttribute('data-project-id', project.id);
                    
                    const mainImage = project.images && project.images.length > 0 ? project.images[0] : '';
                    
                    projectCard.innerHTML = `
                        <div class="relative">
                            <img src="${mainImage}" alt="${project.title}">
                            <div class="project-overlay">
                                <a href="${project.codeLink}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                                    <i class="fab fa-github"></i>Code
                                </a>
                                <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                                    <i class="fas fa-external-link-alt"></i>Demo
                                </a>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                        </div>
                    `;
                    
                    // Add click handler to open detail page
                    projectCard.addEventListener('click', function() {
                        openProjectDetail(project);
                    });
                    
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

    // Project Detail Page Functions
    let currentCarouselIndex = 0;
    let carouselInterval = null;

    function openProjectDetail(project) {
        const detailPage = document.getElementById('project-detail-page');
        const mainImage = document.getElementById('project-main-image');
        const carouselTrack = document.getElementById('project-carousel-track');
        const headerTitle = document.getElementById('project-detail-header-title');
        const title = document.getElementById('project-detail-title');
        const description = document.getElementById('project-detail-description');
        const codeLink = document.getElementById('project-detail-code');
        const demoLink = document.getElementById('project-detail-demo');

        // Set content
        headerTitle.textContent = project.title;
        title.textContent = project.title;
        description.textContent = project.fullDescription || project.description;
        codeLink.href = project.codeLink;
        demoLink.href = project.demoLink;

        // Clear and set images
        mainImage.innerHTML = '';
        carouselTrack.innerHTML = '';
        
        if (project.images && project.images.length > 0) {
            // Set main image
            const mainImg = document.createElement('img');
            mainImg.src = project.images[0];
            mainImg.alt = project.title;
            mainImage.appendChild(mainImg);

            // Create carousel items
            project.images.forEach((imageSrc, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('project-carousel-item');
                if (index === 0) carouselItem.classList.add('active');
                
                const carouselImg = document.createElement('img');
                carouselImg.src = imageSrc;
                carouselImg.alt = `${project.title} - Image ${index + 1}`;
                
                carouselItem.appendChild(carouselImg);
                carouselItem.addEventListener('click', () => {
                    updateMainImage(project.images, index);
                    updateCarouselActive(index);
                    currentCarouselIndex = index;
                });
                
                carouselTrack.appendChild(carouselItem);
            });

            // Start auto-scroll carousel
            currentCarouselIndex = 0;
            startCarouselAutoScroll(project.images);
        }

        // Show detail page
        detailPage.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateMainImage(images, index) {
        const mainImage = document.getElementById('project-main-image');
        mainImage.innerHTML = '';
        const mainImg = document.createElement('img');
        mainImg.src = images[index];
        mainImg.alt = `Project Image ${index + 1}`;
        mainImage.appendChild(mainImg);
    }

    function updateCarouselActive(index) {
        const carouselItems = document.querySelectorAll('.project-carousel-item');
        carouselItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function startCarouselAutoScroll(images) {
        if (images.length <= 1) return;
        
        stopCarouselAutoScroll();
        carouselInterval = setInterval(() => {
            currentCarouselIndex = (currentCarouselIndex + 1) % images.length;
            updateMainImage(images, currentCarouselIndex);
            updateCarouselActive(currentCarouselIndex);
        }, 3000);
    }

    function stopCarouselAutoScroll() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    function closeProjectDetail() {
        const detailPage = document.getElementById('project-detail-page');
        detailPage.classList.remove('active');
        document.body.style.overflow = '';
        stopCarouselAutoScroll();
    }

    // Project detail close button
    document.getElementById('project-detail-close').addEventListener('click', closeProjectDetail);

    // Carousel navigation
    document.getElementById('carousel-prev').addEventListener('click', () => {
        const images = projectsData.find(p => p.id === document.getElementById('project-detail-header-title').textContent.toLowerCase())?.images || [];
        if (images.length > 0) {
            currentCarouselIndex = (currentCarouselIndex - 1 + images.length) % images.length;
            updateMainImage(images, currentCarouselIndex);
            updateCarouselActive(currentCarouselIndex);
            stopCarouselAutoScroll();
            startCarouselAutoScroll(images);
        }
    });

    document.getElementById('carousel-next').addEventListener('click', () => {
        const images = projectsData.find(p => p.id === document.getElementById('project-detail-header-title').textContent.toLowerCase())?.images || [];
        if (images.length > 0) {
            currentCarouselIndex = (currentCarouselIndex + 1) % images.length;
            updateMainImage(images, currentCarouselIndex);
            updateCarouselActive(currentCarouselIndex);
            stopCarouselAutoScroll();
            startCarouselAutoScroll(images);
        }
    });

    // Skills Section with modal
    const skillsContainer = document.getElementById('skills-container');
    const skillsGrid = document.getElementById('skills-grid');
    let allSkills = [];

    fetch('./json/skills.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                allSkills = data;
                
                // Duplicate the skills array for seamless loop in carousel
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
                
                // Populate skills grid for modal (without duplication)
                data.forEach(skill => {
                    const skillDiv = document.createElement('div');
                    skillDiv.classList.add('skill-icon');
                    skillDiv.innerHTML = `
                        <img src="${skill.url}" alt="${skill.name}">
                        <p>${skill.name}</p>
                    `;
                    skillsGrid.appendChild(skillDiv);
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

    // Skills Modal Functions
    const skillsModal = document.getElementById('skills-modal');
    const skillsExpandBtn = document.getElementById('skills-expand-btn');
    const skillsModalClose = document.getElementById('skills-modal-close');

    skillsExpandBtn.addEventListener('click', () => {
        skillsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    skillsModalClose.addEventListener('click', () => {
        skillsModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside content
    skillsModal.addEventListener('click', (e) => {
        if (e.target === skillsModal) {
            skillsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Experiences Section
    const experiencesContainer = document.getElementById('experiences-container');

    fetch('./json/experiences.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach((experience, index) => {
                    const experienceCard = document.createElement('div');
                    experienceCard.classList.add('timeline-item');
                    
                    // Determine if description is long (more than 3 points)
                    const hasLongDescription = experience.description.length > 3;
                    const visibleDescription = hasLongDescription ? experience.description.slice(0, 3) : experience.description;
                    const hiddenDescription = hasLongDescription ? experience.description.slice(3) : [];
                    
                    // Build company name with or without link
                    let companyNameHTML = '';
                    if (experience.href) {
                        companyNameHTML = `<a href="${experience.href}" target="_blank" rel="noopener noreferrer" class="company-link">${experience.compName}</a>`;
                    } else {
                        companyNameHTML = experience.compName;
                    }
                    
                    // Build logo HTML if available
                    let logoHTML = '';
                    if (experience.logo && experience.href) {
                        logoHTML = `
                            <div class="company-logo">
                                <a href="${experience.href}" target="_blank" rel="noopener noreferrer">
                                    <img src="${experience.logo}" alt="${experience.compName} logo">
                                </a>
                            </div>
                        `;
                    }
                    
                    experienceCard.innerHTML = `
                        <div class="timeline-content">
                            <div class="timeline-date">${experience.from} - ${experience.to}</div>
                            ${logoHTML}
                            <h3>${experience.title}</h3>
                            <p>${companyNameHTML}</p>
                            <div class="space-y-2">
                                ${visibleDescription.map(point => `
                                    <p class="experience-point">
                                        <span>▹</span>
                                        ${point.substring(2)}
                                    </p>
                                `).join('')}
                                ${hasLongDescription ? `
                                    <div class="experience-hidden-points" id="hidden-points-${index}" style="display: none;">
                                        ${hiddenDescription.map(point => `
                                            <p class="experience-point">
                                                <span>▹</span>
                                                ${point.substring(2)}
                                            </p>
                                        `).join('')}
                                    </div>
                                    <button class="experience-toggle-btn" id="toggle-btn-${index}" data-index="${index}">
                                        <i class="fas fa-chevron-down"></i>
                                        <span>Show More</span>
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `;
                    experiencesContainer.appendChild(experienceCard);
                    
                    // Add toggle functionality for long descriptions
                    if (hasLongDescription) {
                        const toggleBtn = experienceCard.querySelector(`#toggle-btn-${index}`);
                        const hiddenPoints = experienceCard.querySelector(`#hidden-points-${index}`);
                        
                        toggleBtn.addEventListener('click', function() {
                            const isExpanded = hiddenPoints.style.display !== 'none';
                            
                            if (isExpanded) {
                                hiddenPoints.style.display = 'none';
                                toggleBtn.innerHTML = `
                                    <i class="fas fa-chevron-down"></i>
                                    <span>Show More</span>
                                `;
                            } else {
                                hiddenPoints.style.display = 'block';
                                toggleBtn.innerHTML = `
                                    <i class="fas fa-chevron-up"></i>
                                    <span>Show Less</span>
                                `;
                            }
                        });
                    }
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