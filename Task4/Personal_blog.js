// Sample blog post data
const blogPosts = [
  {
      id: 1,
      title: "My Journey into Web Development",
      excerpt: "How I transitioned from a completely different field into frontend development and what I learned along the way.",
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      date: "May 15, 2023",
      category: "tech"
  },
  {
      id: 2,
      title: "Exploring the Swiss Alps",
      excerpt: "Breathtaking views, charming villages, and incredible hiking trails - my week in the Swiss Alps was unforgettable.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      date: "April 22, 2023",
      category: "travel"
  },
  {
      id: 3,
      title: "The Best Coffee Shops in Portland",
      excerpt: "From artisan pour-overs to cozy atmospheres, here are my top picks for coffee lovers in Portland.",
      image: "https://images.unsplash.com/photo-1463797221720-6b07e6426c24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      date: "April 10, 2023",
      category: "food"
  },
  {
      id: 4,
      title: "Minimalism: Living with Less",
      excerpt: "How adopting a minimalist lifestyle helped me focus on what truly matters and find more joy in everyday life.",
      image: "https://www.betterup.com/hubfs/woman-at-a-clean-minimalist-house-sitting-on-couch-working-on-laptop-minimalist-lifestyle-1.jpg",
      date: "March 28, 2023",
      category: "lifestyle"
  },
  {
      id: 5,
      title: "React vs Vue: Which Framework to Choose",
      excerpt: "A comparison of two popular JavaScript frameworks based on performance, learning curve, and ecosystem.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      date: "March 15, 2023",
      category: "tech"
  },
  {
      id: 6,
      title: "Street Food Tour in Bangkok",
      excerpt: "Join me as I explore the vibrant street food scene in Bangkok, from pad thai to mango sticky rice.",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1133&q=80",
      date: "February 22, 2023",
      category: "food"
  },
  {
      id: 7,
      title: "Hidden Gems of Bali",
      excerpt: "Beyond the popular tourist spots, Bali has countless hidden waterfalls, temples, and beaches waiting to be discovered.",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      date: "February 10, 2023",
      category: "travel"
  },
  {
      id: 8,
      title: "Morning Routines for Productivity",
      excerpt: "How starting your day with intention can dramatically improve your focus and output throughout the day.",
      image: "https://images.unsplash.com/photo-1495653797063-114787b77b23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      date: "January 28, 2023",
      category: "lifestyle"
  }
];

// DOM elements
const postsContainer = document.getElementById('posts-container');
const paginationContainer = document.getElementById('pagination');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const mainContent = document.querySelector('.main-content');
const aboutSection = document.getElementById('about');
const contactSection = document.getElementById('contact');
const navLinks = document.querySelectorAll('nav a');

// Configuration
const postsPerPage = 6;
let currentPage = 1;
let currentCategory = 'all';
let currentSearchTerm = '';

// Initialize the blog
function initBlog() {
  renderPosts();
  setupPagination();
  setupEventListeners();
}

// Filter posts based on category and search term
function filterPosts() {
  return blogPosts.filter(post => {
      const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
      const matchesSearch = post.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(currentSearchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
  });
}

// Render posts for the current page
function renderPosts() {
  const filteredPosts = filterPosts();
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
  
  postsContainer.innerHTML = '';
  
  if (paginatedPosts.length === 0) {
      postsContainer.innerHTML = '<p class="no-posts" style="text-align: center; grid-column: 1 / -1; padding: 40px; font-size: 18px;">No posts found. Try a different search or category.</p>';
      return;
  }
  
  paginatedPosts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.classList.add('post-card');
      
      postElement.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="post-image">
          <div class="post-content">
              <span class="post-category">${post.category}</span>
              <h2 class="post-title">${post.title}</h2>
              <p class="post-excerpt">${post.excerpt}</p>
              <div class="post-meta">
                  <span class="post-date">${post.date}</span>
                  <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
              </div>
          </div>
      `;
      
      postsContainer.appendChild(postElement);
  });
  
  updatePagination(filteredPosts.length);
}

// Setup pagination
function setupPagination() {
  const filteredPosts = filterPosts();
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  paginationContainer.innerHTML = '';
  
  if (totalPages <= 1) return;
  
  // Previous button
  const prevButton = document.createElement('button');
  prevButton.innerHTML = '&laquo;';
  prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          renderPosts();
      }
  });
  paginationContainer.appendChild(prevButton);
  
  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.toggle('active', i === currentPage);
      button.addEventListener('click', () => {
          currentPage = i;
          renderPosts();
      });
      
      paginationContainer.appendChild(button);
  }
  
  // Next button
  const nextButton = document.createElement('button');
  nextButton.innerHTML = '&raquo;';
  nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
          currentPage++;
          renderPosts();
      }
  });
  paginationContainer.appendChild(nextButton);
}

// Update pagination buttons
function updatePagination(totalPosts) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const buttons = paginationContainer.querySelectorAll('button');
  
  buttons.forEach((button, index) => {
      if (index > 0 && index < buttons.length - 1) {
          const pageNum = parseInt(button.textContent);
          button.classList.toggle('active', pageNum === currentPage);
          button.style.display = pageNum <= totalPages ? 'block' : 'none';
      }
  });
}

// Setup event listeners
function setupEventListeners() {
  // Category filter buttons
  categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          currentCategory = button.dataset.category;
          currentPage = 1;
          renderPosts();
          setupPagination();
      });
  });
  
  // Search functionality
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
          performSearch();
      }
  });
  
  // Navigation
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = link.getAttribute('href').substring(1);
          
          // Hide all sections first
          mainContent.style.display = 'none';
          aboutSection.style.display = 'none';
          contactSection.style.display = 'none';
          
          // Show the target section
          if (target === 'home') {
              mainContent.style.display = 'block';
              window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (target === 'categories') {
              mainContent.style.display = 'block';
              document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
          } else if (target === 'about') {
              aboutSection.style.display = 'block';
              aboutSection.scrollIntoView({ behavior: 'smooth' });
          } else if (target === 'contact') {
              contactSection.style.display = 'block';
              contactSection.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });
  
  // Footer category links
  document.querySelectorAll('.footer-links a[data-category]').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          // Show main content and categories section
          mainContent.style.display = 'block';
          aboutSection.style.display = 'none';
          contactSection.style.display = 'none';
          
          // Filter by category
          const category = link.getAttribute('data-category');
          categoryButtons.forEach(btn => {
              btn.classList.remove('active');
              if (btn.getAttribute('data-category') === category) {
                  btn.classList.add('active');
              }
          });
          
          currentCategory = category;
          currentPage = 1;
          renderPosts();
          setupPagination();
          
          // Scroll to categories
          document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
      });
  });
}

// Perform search
function performSearch() {
  currentSearchTerm = searchInput.value;
  currentPage = 1;
  renderPosts();
  setupPagination();
}

// Initialize the blog when the page loads
document.addEventListener('DOMContentLoaded', initBlog);