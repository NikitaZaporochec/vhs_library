// VHS Library Collection Data
const vhsCollection = [
    {
        id: 1,
        title: "Jim Milton",
        year: 2019,
        category: "picture-gallery",
        description: "Famous Van Driver Jim Milton, who was known for his eccentric behavior and unique driving style. Not to mention his passion for delivering the best possible service to his customers.",
        images: "3",
        photographer: "Jim Milton",
        coverColor: "linear-gradient(45deg, #9c3eff, #ff3e9c)",
        imageUrls: [            
            "img/gallery/jim_milton/jim_milton_card.png",
            "img/gallery/jim_milton/jim_milton.jpg",
            "img/gallery/jim_milton/jim_milton2.jpeg"
        ]
    },
    {
        id: 2,
        title: "Lost Footage Of Nikita Zaporozhets",
        year: 1980,
        category: "lost-footage",
        description: "Found footage showing what appears to be Nikita Zaporozhets, a person who mysteriously disappeared in 1980. The footage is grainy and unclear, but it appears to be the real thing.",
        runtime: "1 min 13 seconds",
        recorder: "Unknown",
        videoId: "zpvg-vHGeNo",
        coverColor: "linear-gradient(45deg, #ff873e, #f7d83e)"
    },
    {
        id: 3,
        title: "Nikita Zaporozhets",
        year: 2020,
        category: "picture-gallery",
        description: "Lost pictures of Nikita Zaporozhets. Nikita Zaporozhets is a person who mysteriously disappeared in 2020 and died in 2025.",
        images: "9 stills",
        photographer: "Unknown Photographer",
        coverColor: "linear-gradient(45deg, #3e3e8f, #8f3e3e)",
        imageUrls: [
            "img/gallery/nikita/nikita.jpeg",
            "img/gallery/nikita/happy_nikita.jpg",
            "img/gallery/nikita/happy_nikita2.jpg",
            "img/gallery/nikita/nikita_vstal.jpg",
            "img/gallery/nikita/nikita_vstal2.jpg",
            "img/gallery/nikita/nikitalox.jpg",
            "img/gallery/nikita/nikitalox2.jpg",
            "img/gallery/nikita/nikitalox3.jpg",
            "img/gallery/nikita/nikitalox4.jpg",            
        ]
    },
    {
        id: 4,
        title: "Renat Shipicin",
        year: 2019,
        category: "picture-gallery",
        description: "Renat Shipicin, a school kid who was known for his ability to make people laugh and smile.",
        images: "2",
        photographer: "Unknown",
        coverColor: "linear-gradient(45deg, #9c3eff, #ff3e9c)",
        imageUrls: [            
            "img/gallery/renat_pizdicin/renat1.jpeg",
            "img/gallery/renat_pizdicin/renat2.jpeg"
        ]
    },
    {
        id: 5,
        title: "Bahitzhan Naben",
        year: 2019,
        category: "picture-gallery",
        description: "Bahitzhan Naben, a kid from school who is known for him breaking his own IPhone.",
        images: "1",
        photographer: "Baha Shelby",
        coverColor: "linear-gradient(45deg, #9c3eff, #ff3e9c)",
        imageUrls: [            
            "img/gallery/baha/baha.jpeg",
            "img/gallery/baha/baha2.jpeg"
        ]
    },
    {
        id: 6,
        title: "Damir Skakov",
        year: 2020,
        category: "picture-gallery",
        description: "",
        images: "4",
        photographer: "Nikita Zaporozhets",
        coverColor: "linear-gradient(45deg, #9c3eff, #ff3e9c)",
        imageUrls: [            
            "img/gallery/damir_skakov/nigger.jpeg",
            "img/gallery/damir_skakov/nigger2.jpeg",
            "img/gallery/damir_skakov/nigger3.jpeg",
            "img/gallery/damir_skakov/nigger4.jpeg",
        ]
    },
];

// DOM Elements
const vhsGrid = document.querySelector('.vhs-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('vhs-modal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.querySelector('.modal-body');
const tvScreen = document.querySelector('.tv-screen');
const navLinks = document.querySelectorAll('nav ul li a');
const loaderContainer = document.querySelector('.loader-container');
const loaderProgressBar = document.querySelector('.loader-progress-bar');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show loader with progress animation
    simulateLoading();
    
    // Populate VHS Grid
    populateVHSGrid(vhsCollection);
    
    // Add filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter the VHS collection
            if (filterValue === 'all') {
                populateVHSGrid(vhsCollection);
            } else {
                const filteredCollection = vhsCollection.filter(item => item.category === filterValue);
                populateVHSGrid(filteredCollection);
            }
        });
    });
    
    // Add navigation tab functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle links with hash targets
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Get the target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (!targetSection) return;
                
                // Remove active class from all links
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Add glitch effect to body before scrolling
                document.body.classList.add('glitch');
                setTimeout(() => {
                    document.body.classList.remove('glitch');
                }, 150);
                
                // Scroll to the section with smooth behavior
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active tab based on scroll position
    window.addEventListener('scroll', debounce(highlightCurrentSection, 100));
    
    // Close modal when clicking close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Stop video if playing
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            const iframe = videoContainer.querySelector('iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = src; // Reset iframe
            }
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Stop video if playing
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                const iframe = videoContainer.querySelector('iframe');
                if (iframe) {
                    const src = iframe.src;
                    iframe.src = src; // Reset iframe
                }
            }
        }
    });
    
    // Add VCR button functionality
    const vcrButtons = document.querySelectorAll('.vcr-button');
    const vcrDisplay = document.querySelector('.vcr-display');
    const tvText = document.querySelector('.tv-text');
    const tvStatic = document.querySelector('.tv-screen-static');
    const vcrTape = document.querySelector('.vcr-tape');

    // VCR states
    let isPlaying = false;
    let isTapeInserted = true;
    let currentAction = 'STOP';

    vcrButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            
            // Handle different VCR actions
            switch(action) {
                case 'play':
                    if (isTapeInserted) {
                        isPlaying = true;
                        currentAction = 'PLAY';
                        vcrDisplay.textContent = 'PLAY';
                        tvText.textContent = 'PLAY';
                        tvStatic.style.opacity = '0.5';
                        // Add scanline effect to TV
                        if (!tvStatic.classList.contains('playing')) {
                            tvStatic.classList.add('playing');
                        }
                    } else {
                        vcrDisplay.textContent = 'NO TAPE';
                        tvText.textContent = 'NO TAPE';
                    }
                    break;
                    
                case 'stop':
                    isPlaying = false;
                    currentAction = 'STOP';
                    vcrDisplay.textContent = 'STOP';
                    tvText.textContent = 'STOP';
                    tvStatic.style.opacity = '0.8';
                    tvStatic.classList.remove('playing');
                    break;
                    
                case 'rewind':
                    if (isTapeInserted) {
                        isPlaying = false;
                        currentAction = 'REW';
                        vcrDisplay.textContent = 'REW';
                        tvText.textContent = 'REWIND';
                        // Show rewind animation
                        vcrTape.style.animation = 'tape-rewind 1.5s linear infinite';
                        setTimeout(() => {
                            if (currentAction === 'REW') {
                                vcrDisplay.textContent = 'STOP';
                                tvText.textContent = 'STOP';
                                vcrTape.style.animation = 'tape-insert 8s infinite';
                                currentAction = 'STOP';
                            }
                        }, 3000);
                    }
                    break;
                    
                case 'ff':
                    if (isTapeInserted) {
                        isPlaying = false;
                        currentAction = 'FF';
                        vcrDisplay.textContent = 'FF';
                        tvText.textContent = 'FAST FWD';
                        // Show fast forward animation
                        vcrTape.style.animation = 'tape-ff 0.8s linear infinite';
                        setTimeout(() => {
                            if (currentAction === 'FF') {
                                vcrDisplay.textContent = 'STOP';
                                tvText.textContent = 'STOP';
                                vcrTape.style.animation = 'tape-insert 8s infinite';
                                currentAction = 'STOP';
                            }
                        }, 3000);
                    }
                    break;
                    
                case 'eject':
                    if (isTapeInserted) {
                        // Eject the tape
                        isTapeInserted = false;
                        isPlaying = false;
                        currentAction = 'EJECT';
                        vcrDisplay.textContent = 'EJECT';
                        tvText.textContent = 'NO SIGNAL';
                        tvStatic.style.opacity = '1';
                        tvStatic.classList.remove('playing');
                        
                        // Animate tape ejection
                        vcrTape.style.animation = 'tape-eject 1.5s forwards';
                        
                        // After ejection, show empty slot
                        setTimeout(() => {
                            vcrTape.style.display = 'none';
                        }, 1500);
                    } else {
                        // Insert a new tape
                        vcrTape.style.display = 'block';
                        vcrTape.style.animation = 'tape-insert 8s infinite';
                        isTapeInserted = true;
                        vcrDisplay.textContent = 'LOAD';
                        tvText.textContent = 'TAPE LOADED';
                        
                        setTimeout(() => {
                            vcrDisplay.textContent = 'STOP';
                            tvText.textContent = 'STOP';
                        }, 2000);
                    }
                    break;
            }
        });
    });
    
    // Add retro scan effect
    addRetroScanEffect();
});

// Function to simulate loading with progress
function simulateLoading() {
    // Create VHS static audio effect
    const staticAudio = new Audio();
    staticAudio.src = 'https://freesound.org/data/previews/35/35749_182940-lq.mp3'; // TV static sound
    staticAudio.volume = 0.2;
    staticAudio.loop = true;
    
    // Create VCR loading sound
    const vcrSound = new Audio();
    vcrSound.src = 'https://freesound.org/data/previews/274/274998_5184264-lq.mp3'; // VCR mechanism sound
    vcrSound.volume = 0.5;
    vcrSound.loop = false;
    
    // Start audio (requires user interaction in most browsers)
    const startAudio = () => {
        staticAudio.play().catch(() => {
            // Audio couldn't play automatically (browser restrictions)
            console.log('Audio autoplay blocked by browser');
        });
        vcrSound.play().catch(() => {
            console.log('VCR sound autoplay blocked');
        });
        document.removeEventListener('click', startAudio);
    };
    
    document.addEventListener('click', startAudio);
    
    // Show a message about enabling sound
    const soundMessage = document.createElement('div');
    soundMessage.textContent = 'CLICK ANYWHERE FOR SOUND';
    soundMessage.style.color = '#666';
    soundMessage.style.marginTop = '10px';
    soundMessage.style.fontSize = '12px';
    soundMessage.style.fontFamily = "'VT323', monospace";
    document.querySelector('.loader').appendChild(soundMessage);
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        loaderProgressBar.style.width = `${progress}%`;
        
        // Add random glitches during loading
        if (Math.random() > 0.9) {
            document.body.classList.add('glitch');
            setTimeout(() => {
                document.body.classList.remove('glitch');
            }, 150);
        }
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                // Fade out static
                let vol = staticAudio.volume;
                const fadeAudio = setInterval(() => {
                    if (vol > 0.05) {
                        vol -= 0.05;
                        staticAudio.volume = vol;
                    } else {
                        clearInterval(fadeAudio);
                        staticAudio.pause();
                    }
                }, 100);
                
                loaderContainer.style.opacity = '0';
                setTimeout(() => {
                    loaderContainer.style.display = 'none';
                    // Add initial glitch effect after loading
                    document.body.classList.add('glitch');
                    setTimeout(() => {
                        document.body.classList.remove('glitch');
                    }, 300);
                }, 500);
            }, 500);
        }
    }, 150);
}

// Function to populate the VHS grid
function populateVHSGrid(collection) {
    // Clear existing grid
    vhsGrid.innerHTML = '';
    
    // Loop through collection and create VHS items
    collection.forEach(item => {
        const vhsItem = document.createElement('div');
        vhsItem.classList.add('vhs-item');
        vhsItem.setAttribute('data-id', item.id);
        
        if (item.category === 'picture-gallery') {
            // New design for picture gallery items
            vhsItem.innerHTML = `
                <div class="photo-item">
                    <div class="photo-preview" style="background: ${item.coverColor}">
                        <h3 class="photo-title">${item.title}</h3>
                        <p class="photo-year">${item.year}</p>
                    </div>
                    <div class="photo-info">
                        <p class="photo-count">${item.images} images</p>
                        <span class="photo-category">${getCategoryName(item.category)}</span>
                    </div>
                </div>
            `;
        } else {
            // Keep VHS design for other categories
            vhsItem.innerHTML = `
                <div class="vhs-tape">
                    <div class="vhs-front">
                        <div class="vhs-label" style="background: ${item.coverColor}">
                            <h3 class="vhs-title">${item.title}</h3>
                            <p class="vhs-year">${item.year}</p>
                        </div>
                        <div class="vhs-bottom">
                            <div class="vhs-reel"></div>
                            <div class="vhs-reel"></div>
                        </div>
                        <div class="vhs-write-protect"></div>
                    </div>
                    <div class="vhs-back">
                        <p class="vhs-description">${item.description}</p>
                        <div class="vhs-details">
                            ${item.runtime ? `<p>Runtime: ${item.runtime}</p>` : ''}
                            ${item.images ? `<p>Images: ${item.images}</p>` : ''}
                            ${item.recorder ? `<p>Recorded by: ${item.recorder}</p>` : ''}
                            ${item.photographer ? `<p>Photographer: ${item.photographer}</p>` : ''}
                        </div>
                        <span class="vhs-category">${getCategoryName(item.category)}</span>
                    </div>
                </div>
            `;
        }
        
        // Add click event to open modal
        vhsItem.addEventListener('click', () => {
            openVHSModal(item);
        });
        
        vhsGrid.appendChild(vhsItem);
    });
    
    // Add animation delay to each item for staggered appearance
    const items = document.querySelectorAll('.vhs-item');
    items.forEach((item, index) => {
        item.style.animation = `fadeIn 0.5s ${index * 0.1}s both`;
    });
    
    // Add empty message if no items
    if (collection.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty-message');
        emptyMessage.textContent = 'No VHS tapes found in this category.';
        vhsGrid.appendChild(emptyMessage);
    }
}

// Function to get category display name
function getCategoryName(category) {
    switch(category) {
        case 'lost-footage':
            return 'Lost Footage';
        case 'picture-gallery':
            return 'Picture Gallery';
        default:
            return category;
    }
}

// Function to open modal with VHS details
function openVHSModal(item) {
    // Populate modal content
    modalBody.innerHTML = `
        <div class="modal-header" style="background: ${item.coverColor}">
            <h2>${item.title} (${item.year})</h2>
        </div>
        <div class="modal-info">
            <div class="modal-description">
                <p>${item.description}</p>
                <div class="vhs-details-full">
                    ${item.runtime ? `<p><strong>Runtime:</strong> ${item.runtime}</p>` : ''}
                    ${item.images ? `<p><strong>Images:</strong> ${item.images}</p>` : ''}
                    ${item.recorder ? `<p><strong>Recorded by:</strong> ${item.recorder}</p>` : ''}
                    ${item.photographer ? `<p><strong>Photographer:</strong> ${item.photographer}</p>` : ''}
                    <p><strong>Category:</strong> ${getCategoryName(item.category)}</p>
                </div>
            </div>
            <div class="modal-tape">
                ${item.category === 'picture-gallery' ? 
                    `<div class="photo-preview-large" style="background: ${item.coverColor}">
                        <h3>${item.title}</h3>
                        <p>${item.year}</p>
                        <div class="photo-count-large">${item.images} images</div>
                    </div>` : 
                    `<div class="vhs-tape-large">
                        <div class="vhs-label-large" style="background: ${item.coverColor}">
                            <h3>${item.title}</h3>
                            <p>${item.year}</p>
                        </div>
                        <div class="vhs-reels">
                            <div class="vhs-reel"></div>
                            <div class="vhs-reel"></div>
                        </div>
                        <div class="vhs-write-protect"></div>
                    </div>`
                }
                <button class="play-button">${item.category === 'picture-gallery' ? 'View Pictures' : 'Play This Tape'}</button>
            </div>
        </div>
        ${item.videoId ? `<div class="video-container" style="display: none;">
            <iframe width="100%" height="450" src="https://www.youtube.com/embed/${item.videoId}" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>` : ''}
    `;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add event listener to play button
    const playButton = document.querySelector('.play-button');
    playButton.addEventListener('click', () => {
        playVHSTape(item);
    });
}

// Function to simulate playing the VHS tape
function playVHSTape(item) {
    // Create VHS insertion animation or photo gallery transition
    const mediaElement = document.querySelector(item.category === 'picture-gallery' ? '.photo-preview-large' : '.vhs-tape-large');
    const playButton = document.querySelector('.play-button');
    
    // Add animation classes
    if (item.category === 'picture-gallery') {
        mediaElement.classList.add('photo-transition-animation');
    } else {
        mediaElement.classList.add('vhs-insert-animation');
    }
    
    playButton.disabled = true;
    playButton.textContent = 'Loading...';
    
    // Create glitch effect
    document.body.classList.add('major-glitch');
    
    // After animation
    setTimeout(() => {
        // Hide the media element
        mediaElement.style.display = 'none';
        playButton.style.display = 'none';
        
        // Remove glitch
        document.body.classList.remove('major-glitch');
        
        // If it's a YouTube video
        if (item.videoId) {
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.style.display = 'block';
            }
        } 
        // If it's a picture gallery
        else if (item.category === 'picture-gallery' && item.imageUrls && item.imageUrls.length > 0) {
            // Create a picture gallery viewer
            const galleryContainer = document.createElement('div');
            galleryContainer.classList.add('gallery-container');
            
            // Add image gallery viewer
            let currentImageIndex = 0;
            const totalImages = item.imageUrls.length;
            
            galleryContainer.innerHTML = `
                <div class="gallery-header">
                    <div class="gallery-counter">Image 1/${totalImages}</div>
                    <div class="gallery-controls">
                        <button class="gallery-prev" disabled><i class="fas fa-chevron-left"></i></button>
                        <button class="gallery-next"><i class="fas fa-chevron-right"></i></button>
                        <button class="fullscreen-btn"><i class="fas fa-expand"></i></button>
                    </div>
                </div>
                <div class="gallery-viewer">
                    <div class="image-container">
                        <div class="loading-indicator">Loading...</div>
                        <img src="${item.imageUrls[0]}" alt="${item.title} - Image 1" class="gallery-image">
                        <div class="image-controls">
                            <button class="zoom-btn zoom-out">-</button>
                            <button class="zoom-btn zoom-in">+</button>
                        </div>
                        <button class="exit-fullscreen-btn">&times;</button>
                    </div>
                </div>
                <div class="gallery-timestamp">
                    <div class="play-info">
                        <p>Now viewing: ${item.title}</p>
                        <p class="timestamp">00:00:01</p>
                    </div>
                </div>
            `;
            
            // Replace the media element with gallery
            const modalTape = document.querySelector('.modal-tape');
            modalTape.innerHTML = '';
            modalTape.appendChild(galleryContainer);
            
            // Add navigation functionality
            const prevBtn = galleryContainer.querySelector('.gallery-prev');
            const nextBtn = galleryContainer.querySelector('.gallery-next');
            const galleryImage = galleryContainer.querySelector('.gallery-image');
            const galleryCounter = galleryContainer.querySelector('.gallery-counter');
            const timestampEl = galleryContainer.querySelector('.timestamp');
            const loadingIndicator = galleryContainer.querySelector('.loading-indicator');
            
            // Handle image load success
            galleryImage.onload = function() {
                loadingIndicator.style.display = 'none';
                galleryImage.style.display = 'block';
                
                // Apply current zoom level if set
                if (currentZoom !== 100) {
                    galleryImage.style.maxWidth = `${currentZoom}%`;
                    galleryImage.style.maxHeight = `${currentZoom}%`;
                }
                
                addNoiseToImage(galleryImage);
            };
            
            // Handle image load error
            galleryImage.onerror = function() {
                loadingIndicator.textContent = 'Error loading image';
            };
            
            // Start a timestamp counter
            let seconds = 1; // Start at 1 to show we're viewing the first image
            const timestampInterval = setInterval(() => {
                seconds++;
                const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
                const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
                const secs = (seconds % 60).toString().padStart(2, '0');
                timestampEl.textContent = `${hours}:${minutes}:${secs}`;
            }, 1000);
            
            // Navigation handlers
            prevBtn.addEventListener('click', () => {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateGallery();
                }
            });
            
            nextBtn.addEventListener('click', () => {
                if (currentImageIndex < totalImages - 1) {
                    currentImageIndex++;
                    updateGallery();
                }
            });
            
            // Function to update gallery display
            function updateGallery() {
                // Show loading indicator
                loadingIndicator.style.display = 'flex';
                
                // Set new image source
                galleryImage.src = item.imageUrls[currentImageIndex];
                galleryImage.alt = `${item.title} - Image ${currentImageIndex + 1}`;
                
                // Apply the zoom level specific to this image
                currentZoom = zoomLevels[currentImageIndex];
                galleryImage.style.maxWidth = `${currentZoom}%`;
                galleryImage.style.maxHeight = `${currentZoom}%`;
                
                // Update counter text
                galleryCounter.textContent = `Image ${currentImageIndex + 1}/${totalImages}`;
                
                // Update button states
                prevBtn.disabled = currentImageIndex === 0;
                nextBtn.disabled = currentImageIndex === totalImages - 1;
            }
            
            // Function to add VHS-style noise to images
            function addNoiseToImage(imgElement) {
                imgElement.classList.add('vhs-image-effect');
            }
            
            // Add zoom control functionality
            const zoomInBtn = galleryContainer.querySelector('.zoom-in');
            const zoomOutBtn = galleryContainer.querySelector('.zoom-out');
            
            // Store zoom levels for each image
            const zoomLevels = new Array(totalImages).fill(100);
            let currentZoom = 100;

            zoomInBtn.addEventListener('click', () => {
                if (zoomLevels[currentImageIndex] < 200) { // Max zoom: 200%
                    zoomLevels[currentImageIndex] += 20;
                    currentZoom = zoomLevels[currentImageIndex];
                    galleryImage.style.maxWidth = `${currentZoom}%`;
                    galleryImage.style.maxHeight = `${currentZoom}%`;
                }
            });

            zoomOutBtn.addEventListener('click', () => {
                if (zoomLevels[currentImageIndex] > 60) { // Min zoom: 60%
                    zoomLevels[currentImageIndex] -= 20;
                    currentZoom = zoomLevels[currentImageIndex];
                    galleryImage.style.maxWidth = `${currentZoom}%`;
                    galleryImage.style.maxHeight = `${currentZoom}%`;
                }
            });
            
            // Add keyboard navigation for the gallery
            const keyHandler = (e) => {
                if (e.key === 'ArrowRight' && !nextBtn.disabled) {
                    currentImageIndex++;
                    updateGallery();
                } else if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
                    currentImageIndex--;
                    updateGallery();
                } else if (e.key === '+' || e.key === '=') {
                    // Zoom in with + key
                    if (zoomLevels[currentImageIndex] < 200) {
                        zoomLevels[currentImageIndex] += 20;
                        currentZoom = zoomLevels[currentImageIndex];
                        galleryImage.style.maxWidth = `${currentZoom}%`;
                        galleryImage.style.maxHeight = `${currentZoom}%`;
                    }
                } else if (e.key === '-') {
                    // Zoom out with - key
                    if (zoomLevels[currentImageIndex] > 60) {
                        zoomLevels[currentImageIndex] -= 20;
                        currentZoom = zoomLevels[currentImageIndex];
                        galleryImage.style.maxWidth = `${currentZoom}%`;
                        galleryImage.style.maxHeight = `${currentZoom}%`;
                    }
                } else if (e.key === 'Escape' && isFullscreen) {
                    // Exit fullscreen with ESC key
                    exitFullscreen();
                }
            };

            document.addEventListener('keydown', keyHandler);

            // Add fullscreen functionality after initializing other controls
            const fullscreenBtn = galleryContainer.querySelector('.fullscreen-btn');
            const exitFullscreenBtn = galleryContainer.querySelector('.exit-fullscreen-btn');
            let isFullscreen = false;

            fullscreenBtn.addEventListener('click', () => {
                const galleryViewer = galleryContainer.querySelector('.gallery-viewer');
                
                if (!isFullscreen) {
                    // Enter fullscreen mode
                    if (galleryViewer.requestFullscreen) {
                        galleryViewer.requestFullscreen();
                    } else if (galleryViewer.webkitRequestFullscreen) {
                        galleryViewer.webkitRequestFullscreen();
                    } else if (galleryViewer.msRequestFullscreen) {
                        galleryViewer.msRequestFullscreen();
                    }
                    
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                    exitFullscreenBtn.style.display = 'block';
                    isFullscreen = true;
                } else {
                    // Exit fullscreen mode
                    exitFullscreen();
                }
            });
            
            // Function to exit fullscreen
            function exitFullscreen() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                exitFullscreenBtn.style.display = 'none';
                isFullscreen = false;
            }
            
            // Add event listener to the exit fullscreen button
            exitFullscreenBtn.addEventListener('click', exitFullscreen);

            // Add fullscreen change event listener
            document.addEventListener('fullscreenchange', handleFullscreenChange);
            document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.addEventListener('mozfullscreenchange', handleFullscreenChange);
            document.addEventListener('MSFullscreenChange', handleFullscreenChange);

            function handleFullscreenChange() {
                if (!document.fullscreenElement && 
                    !document.webkitFullscreenElement && 
                    !document.mozFullScreenElement && 
                    !document.msFullscreenElement) {
                    // Fullscreen was exited
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                    exitFullscreenBtn.style.display = 'none';
                    isFullscreen = false;
                } else {
                    // Entered fullscreen
                    exitFullscreenBtn.style.display = 'block';
                }
            }

            // Update the cleanupInterval function to remove fullscreen event listeners
            const cleanupInterval = () => {
                clearInterval(timestampInterval);
                document.removeEventListener('keydown', keyHandler);
                document.removeEventListener('fullscreenchange', handleFullscreenChange);
                document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
                document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
                document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
                
                // Make sure we exit fullscreen when closing the modal
                if (isFullscreen) {
                    exitFullscreen();
                }
                
                closeModal.removeEventListener('click', cleanupInterval);
                modal.removeEventListener('click', modalClickHandler);
            };
            
            const modalClickHandler = (e) => {
                if (e.target === modal) {
                    cleanupInterval();
                }
            };
            
            closeModal.addEventListener('click', cleanupInterval);
            modal.addEventListener('click', modalClickHandler);
        }
        // Default for other types (static effect)
        else {
            // Create a static TV effect
            const staticContainer = document.createElement('div');
            staticContainer.classList.add('static-container');
            staticContainer.innerHTML = `
                <div class="tv-static"></div>
                <div class="play-info">
                    <p>Now playing: ${item.title}</p>
                    <p class="timestamp">00:00:00</p>
                </div>
            `;
            
            // Replace the tape with static
            const modalTape = document.querySelector('.modal-tape');
            modalTape.innerHTML = '';
            modalTape.appendChild(staticContainer);
            
            // Start a timestamp counter
            let seconds = 0;
            const timestampEl = staticContainer.querySelector('.timestamp');
            const timestampInterval = setInterval(() => {
                seconds++;
                const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
                const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
                const secs = (seconds % 60).toString().padStart(2, '0');
                timestampEl.textContent = `${hours}:${minutes}:${secs}`;
            }, 1000);
            
            // Clear interval when modal is closed
            const cleanupInterval = () => {
                clearInterval(timestampInterval);
                closeModal.removeEventListener('click', cleanupInterval);
                modal.removeEventListener('click', modalClickHandler);
            };
            
            const modalClickHandler = (e) => {
                if (e.target === modal) {
                    cleanupInterval();
                }
            };
            
            closeModal.addEventListener('click', cleanupInterval);
            modal.addEventListener('click', modalClickHandler);
        }
    }, 2500);
}

// Function to add retro scan effect
function addRetroScanEffect() {
    // Random glitch effect
    setInterval(() => {
        if (Math.random() > 0.97) {
            document.body.classList.add('glitch');
            setTimeout(() => {
                document.body.classList.remove('glitch');
            }, 150);
        }
    }, 2000);
}

// Debounce function to limit scroll event firing
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Function to highlight the current section in the navigation
function highlightCurrentSection() {
    // Get all sections that have an ID
    const sections = Array.from(document.querySelectorAll('section[id]'));
    
    // If there are no sections with IDs, return
    if (sections.length === 0) return;
    
    // Get the current scroll position
    const scrollPosition = window.scrollY + 100; // Add offset to trigger slightly earlier
    
    // Find the section that's currently in view
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // This is the current section
            const currentId = section.getAttribute('id');
            
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to the corresponding nav link
            const correspondingLink = document.querySelector(`nav ul li a[href="#${currentId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
                
                // Add a subtle glitch to the newly active tab
                correspondingLink.style.animation = 'none';
                void correspondingLink.offsetWidth; // Trigger reflow
                correspondingLink.style.animation = 'tab-mini-glitch 0.4s ease-out';
            }
            
            // We found our section, no need to continue
            return;
        }
    }
    
    // If we're at the top of the page or above the first section, highlight the Home link
    const firstSection = sections[0];
    if (scrollPosition < firstSection.offsetTop) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
}

// Add some additional CSS for the modal and animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes tab-mini-glitch {
        0% { text-shadow: none; }
        25% { text-shadow: 1px 0 var(--vhs-blue), -1px 0 var(--vhs-purple); }
        50% { text-shadow: -1px 0 var(--vhs-purple), 1px 0 var(--vhs-blue); }
        75% { text-shadow: 1px 0 var(--vhs-blue), -1px 0 var(--vhs-purple); }
        100% { text-shadow: none; }
    }
    
    /* New photo item styles */
    .photo-item {
        width: 100%;
        height: 100%;
        background-color: #222;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
    }
    
    .photo-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
    
    .photo-preview {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1rem;
        position: relative;
    }
    
    .photo-title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: white;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
    
    .photo-year {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.8);
    }
    
    .photo-info {
        padding: 0.8rem;
        background-color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .photo-count {
        font-size: 0.9rem;
        color: #ddd;
    }
    
    .photo-category {
        font-size: 0.8rem;
        background-color: var(--vhs-purple);
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 3px;
    }
    
    /* Large photo preview in modal */
    .photo-preview-large {
        width: 220px;
        height: 350px;
        background-color: #222;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1.5rem;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        position: relative;
    }
    
    .photo-preview-large h3 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        color: white;
    }
    
    .photo-preview-large p {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 1rem;
    }
    
    .photo-count-large {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 0.5rem;
        color: white;
        font-size: 1rem;
    }
    
    /* Photo transition animation */
    .photo-transition-animation {
        animation: photoTransition 2.5s forwards;
    }
    
    @keyframes photoTransition {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        50% { transform: translateY(-30px) scale(0.95); opacity: 0.8; }
        100% { transform: translateY(-200px) scale(0.9); opacity: 0; }
    }
    
    .modal-header {
        padding: 1.5rem;
        border-radius: 7px 7px 0 0;
        color: white;
    }
    
    .modal-info {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 1.5rem;
    }
    
    .modal-description {
        flex: 2;
        min-width: 300px;
    }
    
    .modal-description p {
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .vhs-details-full {
        display: grid;
        gap: 0.5rem;
    }
    
    .modal-tape {
        flex: 1;
        min-width: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    .vhs-tape-large {
        width: 220px;
        height: 350px;
        background-color: #222;
        border: 5px solid var(--vhs-blue);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform: rotate(5deg);
        box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease;
    }
    
    .vhs-tape-large:hover {
        transform: rotate(0);
    }
    
    .vhs-label-large {
        flex: 4;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    
    .vhs-label-large h3 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }
    
    .vhs-reels {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #333;
        padding: 1rem;
    }
    
    .play-button {
        padding: 1rem 2rem;
        background-color: var(--vhs-red);
        color: white;
        border: none;
        border-radius: 5px;
        font-family: 'VT323', monospace;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(255, 62, 62, 0.3);
    }
    
    .play-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(255, 62, 62, 0.4);
    }
    
    .play-button:active {
        transform: translateY(0);
        box-shadow: 0 3px 10px rgba(255, 62, 62, 0.3);
    }
    
    .empty-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        font-size: 1.5rem;
        color: #777;
    }
    
    body.glitch {
        position: relative;
    }
    
    body.glitch::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 0, 255, 0.1);
        pointer-events: none;
        z-index: 9999;
        animation: glitch-animation 0.2s ease;
    }
    
    @keyframes glitch-animation {
        0% { transform: translate(0); }
        20% { transform: translate(-10px, 10px); }
        40% { transform: translate(10px, -10px); }
        60% { transform: translate(-5px, 5px); }
        80% { transform: translate(5px, -5px); }
        100% { transform: translate(0); }
    }
    
    .vhs-insert-animation {
        animation: insertTape 2.5s forwards;
    }
    
    @keyframes insertTape {
        0% { transform: rotate(5deg) translateY(0); }
        20% { transform: rotate(0) translateY(-20px); }
        50% { transform: translateY(-50px) scale(0.9); }
        100% { transform: translateY(-200px) scale(0.8); opacity: 0; }
    }
    
    body.major-glitch::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 0, 255, 0.2);
        pointer-events: none;
        z-index: 9999;
        animation: major-glitch-animation 2.5s ease;
    }
    
    @keyframes major-glitch-animation {
        0% { transform: translate(0); background-color: rgba(255, 0, 255, 0.1); }
        20% { transform: translate(-20px, 20px); background-color: rgba(0, 255, 255, 0.1); }
        40% { transform: translate(20px, -20px); background-color: rgba(255, 255, 0, 0.1); }
        60% { transform: translate(-10px, 10px); background-color: rgba(0, 255, 0, 0.1); }
        80% { transform: translate(10px, -10px); background-color: rgba(255, 0, 0, 0.1); }
        100% { transform: translate(0); background-color: rgba(255, 0, 255, 0.1); }
    }
    
    .tv-static {
        width: 100%;
        height: 240px;
        background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), 
                    url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feBlend mode="screen"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
        border-radius: 5px;
        position: relative;
        margin-bottom: 1rem;
        overflow: hidden;
    }
    
    .tv-static::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, 
            rgba(255, 0, 255, 0.1), 
            rgba(0, 255, 255, 0.1), 
            rgba(255, 255, 0, 0.1));
        mix-blend-mode: color;
        animation: staticColor 4s infinite;
    }
    
    @keyframes staticColor {
        0% { opacity: 0.3; }
        50% { opacity: 0.7; }
        100% { opacity: 0.3; }
    }
    
    .play-info {
        font-family: 'VT323', monospace;
        text-align: center;
        color: #0f0;
        background-color: #000;
        padding: 0.5rem;
        border-radius: 5px;
    }
    
    .timestamp {
        font-size: 1.5rem;
    }
    
    .video-container {
        width: 100%;
        margin-top: 2rem;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    }
    
    /* Gallery Styles */
    .gallery-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .gallery-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #111;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-family: 'VT323', monospace;
    }
    
    .gallery-counter {
        color: #0f0;
        font-size: 1.2rem;
    }
    
    .gallery-controls {
        display: flex;
        gap: 0.5rem;
    }
    
    .gallery-prev,
    .gallery-next {
        background-color: #333;
        color: white;
        border: none;
        border-radius: 3px;
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .gallery-prev:hover:not(:disabled),
    .gallery-next:hover:not(:disabled) {
        background-color: #444;
    }
    
    .gallery-prev:disabled,
    .gallery-next:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .gallery-viewer {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 80%; /* Increased from 66.67% to provide more vertical space */
        background-color: #000;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    
    .image-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        padding: 10px; /* Add some padding around the image */
    }
    
    .gallery-image {
        position: relative;
        max-width: 95%; /* Increased from default */
        max-height: 95%; /* Increased from default */
        width: auto;
        height: auto;
        display: block !important; /* Force display */
        opacity: 1 !important; /* Force visibility */
        z-index: 2; /* Ensure it's above other elements */
        object-fit: contain;
        transition: opacity 0.3s ease;
    }
    
    .vhs-image-effect {
        position: relative;
    }
    
    .vhs-image-effect::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            linear-gradient(to bottom, 
                rgba(255, 255, 255, 0) 0%, 
                rgba(255, 255, 255, 0.03) 50%, 
                rgba(255, 255, 255, 0) 100%
            ),
            url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" stitchTiles="stitch"/><feBlend mode="overlay"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
        background-size: 100% 4px, cover;
        mix-blend-mode: overlay;
        opacity: 0.3;
        pointer-events: none;
        z-index: 3;
    }
    
    .gallery-timestamp {
        width: 100%;
    }
    
    @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
    }
    
    .gallery-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background-color: rgba(255, 255, 255, 0.1);
        animation: scanline 8s linear infinite;
        pointer-events: none;
    }
    
    .loading-indicator {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'VT323', monospace;
        color: #0f0;
        font-size: 2rem;
        background-color: #000;
        z-index: 4;
    }

    /* Add image sizing controls */
    .image-controls {
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 5;
        display: flex;
        gap: 5px;
    }

    .zoom-btn {
        background-color: rgba(0, 0, 0, 0.7);
        color: #0f0;
        border: 1px solid #0f0;
        border-radius: 3px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-family: 'VT323', monospace;
        font-size: 1.2rem;
    }

    .zoom-btn:hover {
        background-color: rgba(0, 255, 0, 0.2);
    }

    /* Fullscreen mode improvements */
    .gallery-viewer:fullscreen {
        padding-bottom: 0 !important;
        height: 100%;
    }
    
    .gallery-viewer:fullscreen .image-container {
        padding: 20px;
    }
    
    .gallery-viewer:fullscreen .gallery-image {
        max-width: 100%;
        max-height: 100%;
    }

    .fullscreen-btn {
        background-color: #333;
        color: white;
        border: none;
        border-radius: 3px;
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .fullscreen-btn:hover {
        background-color: #444;
    }
`;

document.head.appendChild(style);

// Add the new keyframe animations for tape actions
const newStyle = document.createElement('style');
newStyle.textContent = `
    @keyframes tape-rewind {
        0% { left: 50%; }
        100% { left: -120px; }
    }
    
    @keyframes tape-ff {
        0% { left: 50%; }
        100% { left: 100%; }
    }
    
    @keyframes tape-eject {
        0% { left: 50%; top: 4px; }
        50% { left: 50%; top: -15px; }
        100% { left: 110%; top: -15px; }
    }
    
    .tv-screen-static.playing::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background-color: rgba(255, 255, 255, 0.2);
        animation: scanline 3s linear infinite;
        pointer-events: none;
        z-index: 3;
    }
    
    @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(2000%); }
    }
`;
document.head.appendChild(newStyle); 
