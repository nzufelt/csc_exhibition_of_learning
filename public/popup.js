// This JavaScript Code controls the popup ability of different profiles on the About Us Page. 

// Define the popup functions in the global scope
function openPopup(button) {
  var popup = button.nextElementSibling;
  var overlay = document.querySelector('.overlay');

  popup.classList.add('show');
  overlay.classList.add('show');
}

function closePopup(element) {
  var popup = element.closest('.popup') || document.querySelector('.popup.show');
  var overlay = document.querySelector('.overlay');

  if (popup) {
    popup.classList.remove('show');
  }
  overlay.classList.remove('show');
}

// Add event listeners after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the overlay to close the popup when clicking on it
  document.querySelector('.overlay').addEventListener('click', function() {
    closePopup(this); // 'this' refers to the overlay element
  });
});


