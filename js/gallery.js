// Gallery JavaScript

const galleryImages = {
  events: [
    { src: 'image/Events1.png', alt: 'Event Image 1' },
    { src: 'image/Events2.png', alt: 'Event Image 2' },
    { src: 'image/Events3.png', alt: 'Event Image 3' },
  ],
  trainings: [
    { src: 'image/Trainings1.jpeg', alt: 'Training Image 1' },
    { src: 'image/Trainings2.jpeg', alt: 'Training Image 2' },
    { src: 'image/Trainings3.jpeg', alt: 'Training Image 3' },
    { src: 'image/Trainings4.jpeg', alt: 'Training Image 4' },
    { src: 'image/Trainings5.jpeg', alt: 'Training Image 5' },
    { src: 'image/Trainings6.jpeg', alt: 'Training Image 6' },
    { src: 'image/Trainings7.jpeg', alt: 'Training Image 7' },
    { src: 'image/Trainings8.jpeg', alt: 'Training Image 8' },
    { src: 'image/Trainings9.jpeg', alt: 'Training Image 9' },
  ],
  'safety-meeting': [
    { src: 'image/Safety Meeting1.jpeg', alt: 'Safety Meeting Image 1' },
    { src: 'image/Safety Meeting2.jpeg', alt: 'Safety Meeting Image 2' },
    { src: 'image/Safety Meeting3.jpeg', alt: 'Safety Meeting Image 3' },
    { src: 'image/Safety Meeting4.jpeg', alt: 'Safety Meeting Image 4' },
    { src: 'image/Safety Meeting5.jpeg', alt: 'Safety Meeting Image 5' },
    { src: 'image/Safety Meeting6.jpeg', alt: 'Safety Meeting Image 6' },
  ],
  celebrations: [
    { src: 'image/Celebrations1.jpeg', alt: 'Celebration Image 1' },
    { src: 'image/Celebrations2.jpeg', alt: 'Celebration Image 2' },
    { src: 'image/Celebrations3.jpeg', alt: 'Celebration Image 3' },
    { src: 'image/Celebrations4.jpeg', alt: 'Celebration Image 4' },
    { src: 'image/Celebrations5.jpeg', alt: 'Celebration Image 5' },
    { src: 'image/Celebrations6.jpeg', alt: 'Celebration Image 6' },
    { src: 'image/Celebrations7.jpeg', alt: 'Celebration Image 7' },
    { src: 'image/Celebrations8.jpeg', alt: 'Celebration Image 8' },
    { src: 'image/Celebrations9.jpeg', alt: 'Celebration Image 9' },
    { src: 'image/Celebrations10.jpeg', alt: 'Celebration Image 10' },
    { src: 'image/Celebrations11.jpeg', alt: 'Celebration Image 11' },
    { src: 'image/Celebrations12.jpeg', alt: 'Celebration Image 12' },
  ],
  operations: [
    { src: 'image/Operations1.png', alt: 'Operation Image 1' },
    { src: 'image/Operations2.png', alt: 'Operation Image 2' },
    { src: 'image/Operations3.png', alt: 'Operation Image 3' },
    { src: 'image/Operations4.jpeg', alt: 'Operation Image 4' },
    { src: 'image/Operations5.png', alt: 'Operation Image 5' },
    { src: 'image/Operations6.png', alt: 'Operation Image 6' },
    { src: 'image/Operations7.png', alt: 'Operation Image 7' },
    { src: 'image/Operations8.png', alt: 'Operation Image 8' },
    { src: 'image/Operations9.png', alt: 'Operation Image 9' },
    { src: 'image/Operations10.jpeg', alt: 'Operation Image 10' },
    { src: 'image/Operations11.jpeg', alt: 'Operation Image 11' },
    { src: 'image/Operations12.jpeg', alt: 'Operation Image 12' },
    { src: 'image/Operations13.jpeg', alt: 'Operation Image 13' },
    { src: 'image/Operations14.jpeg', alt: 'Operation Image 14' },
    { src: 'image/Operations15.jpeg', alt: 'Operation Image 15' },
    { src: 'image/Operations16.jpeg', alt: 'Operation Image 16' },
    { src: 'image/Operations17.jpeg', alt: 'Operation Image 17' },
    { src: 'image/Operations18.jpeg', alt: 'Operation Image 18' },
  ],
  'community-service': [
    { src: 'image/Community Service1.jpeg', alt: 'Community Service Image 1' },
    { src: 'image/Community Service2.jpeg', alt: 'Community Service Image 2' },
    { src: 'image/Community Service3.jpeg', alt: 'Community Service Image 3' },
    { src: 'image/Community Service4.jpeg', alt: 'Community Service Image 4' },
    { src: 'image/Community Service5.jpeg', alt: 'Community Service Image 5' },
  ],
};

let currentCategory = 'events';
let currentImageIndex = 0;
let currentImages = [];

const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCounter = document.getElementById('lightbox-counter');
const categoryTabs = document.querySelectorAll('.category-tab');

function renderGallery() {
  currentImages = galleryImages[currentCategory] || [];
  galleryGrid.innerHTML = '';
  
  if (currentImages.length === 0) {
    galleryGrid.innerHTML = '<div class="col-span-full text-center py-16"><p class="text-gray-500 text-lg">No images in this category yet.</p></div>';
    return;
  }
  
  currentImages.forEach((image, index) => {
    const card = document.createElement('div');
    card.className = 'group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer';
    card.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
        </div>
      </div>
      <div class="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span class="text-white font-medium text-sm">View Image</span>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(card);
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  updateLightbox();
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = 'unset';
}

function updateLightbox() {
  lightboxImage.src = currentImages[currentImageIndex].src;
  lightboxImage.alt = currentImages[currentImageIndex].alt;
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

function goToPrevious() {
  currentImageIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
  updateLightbox();
}

function goToNext() {
  currentImageIndex = currentImageIndex === currentImages.length - 1 ? 0 : currentImageIndex + 1;
  updateLightbox();
}

// Event Listeners
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    categoryTabs.forEach(t => {
      t.classList.remove('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/25');
      t.classList.add('bg-gray-100', 'text-gray-600');
    });
    tab.classList.remove('bg-gray-100', 'text-gray-600');
    tab.classList.add('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/25');
    currentCategory = tab.dataset.category;
    renderGallery();
  });
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', goToPrevious);
document.getElementById('lightbox-next').addEventListener('click', goToNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  }
});

// Initialize gallery
renderGallery();
