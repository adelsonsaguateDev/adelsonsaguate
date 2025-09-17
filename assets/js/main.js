document.addEventListener('DOMContentLoaded', () => {

  // Initialize Animate on Scroll
  AOS.init({
    duration: 600,
    once: true,
    offset: 50, // offset (in px) from the original trigger point
  });

  const mainContent = document.getElementById('main-content');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('.content-section');

  if (!mainContent || !navLinks.length || !sections.length) {
    return; // Exit if essential elements are not found
  }

  // Function to update active nav link
  const updateActiveLink = () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      // Check if section is in the viewport (with a 150px offset)
      if (mainContent.scrollTop >= sectionTop - 150) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      // The href attribute looks like "#about", we need to match it with the section id
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  // Listen for scroll events on the main content pane
  mainContent.addEventListener('scroll', updateActiveLink);

  // Initial call to set the active link on page load
  updateActiveLink();

});
