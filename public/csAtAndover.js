
function showSkillDescription(button) {
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


function showCourseDescription(button) {
  var allButtons = document.querySelectorAll('.course-button');
  
  // Close all other descriptions
  allButtons.forEach(function(btn) {
    if (btn !== button) {
      var hiddenText = btn.nextElementSibling;
      var expandMoreIcon = btn.querySelector('.expandMore');
      var expandLessIcon = btn.querySelector('.expandLess');

      hiddenText.classList.remove('visible');
      expandMoreIcon.style.display = 'inline-block';
      expandLessIcon.style.display = 'none';
    }
  });
  
  // Toggle the description for the clicked button
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

