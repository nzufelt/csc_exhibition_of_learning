// This JavaScript Code controls the popup ability of different profiles on the About Us Page. 

// code for "+" buttons that open the popup:
//changes the display from "none" to "block"
function openPopup(button) {
  var popup = button.nextElementSibling;
  var overlay = document.querySelector('.overlay');

  popup.classList.add('show');
  overlay.classList.add('show');
}

// code for "x" buttons that close the popup:
// removes display of popup and overlay
function closePopup(span) {
  var popup = span.closest('.popup');
  var overlay = document.querySelector('.overlay');

  popup.classList.remove('show');
  overlay.classList.remove('show');
}
