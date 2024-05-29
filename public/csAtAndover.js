
function toggleText(button) {
  var hiddenText = button.nextElementSibling;
  var expandMoreIcon = button.querySelector('.expandMore');
  var expandLessIcon = button.querySelector('.expandLess');

  if (!hiddenText.classList.contains('visible')) {
    hiddenText.classList.add('visible');
    expandMoreIcon.style.display = 'none';
    expandLessIcon.style.display = 'inline-block';
  } else {
    hiddenText.classList.remove('visible');
    expandMoreIcon.style.display = 'inline-block';
    expandLessIcon.style.display = 'none';
  }
}