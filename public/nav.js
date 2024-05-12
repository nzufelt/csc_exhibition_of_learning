// JS for nav bar

// when the hamburger button is clicked, move the sidebar so
// that it is on the screen.
function showSidebar() {
  // querySelector: https://www.w3schools.com/jsref/met_document_queryselector.asp
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.add('show-sidebar');
  }
  
  // move the sidebar back of the screen when the close button is clicked
  function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('show-sidebar');
  }
  
  // adding event listeners: https://www.w3schools.com/jsref/met_win_addeventlistener.asp
  //ensuring that the sidebar collapses if the screen is expanded while the sidebar is open. 
  window.addEventListener('resize', function() {
    const screenWidth = window.innerWidth;
  
    if (screenWidth > 800) {
      hideSidebar();
    }
  });
  
  // Check if the user has scrolled beyond the top of the page
  // If they have, add a shadow to the navigation bar. 
  // window scrollY property: https://www.w3schools.com/jsref/prop_win_scrolly.asp
  window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
      navbar.classList.add('nav-shadow'); // Add border class to the navbar
    } 
    else {
      navbar.classList.remove('nav-shadow'); // Remove border class
    }
  });