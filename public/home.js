function toggleTagPopUp(tag_panel) {
  // Hide all pop-ups
  var popUps = document.querySelectorAll('.tag_section > div[id$="_pop_up"]');
  popUps.forEach(function(popUp) {
      if (popUp.id !== tag_panel) {
          popUp.style.display = 'none';
      }
  });

  // Toggle the clicked pop-up
  var popUp = document.getElementById(tag_panel);
  if (popUp.style.display === 'block') {
      popUp.style.display = 'none';
  } else {
      popUp.style.display = 'block';
  }
}


// Function to insert a tag into the tag_box panel
function insertTagIntoTagBox(tag) {
const tagBox = document.querySelector('.tag_box');

// Create a new button element for the tag
const tagButton = document.createElement('button');
tagButton.textContent = tag;
tagButton.classList.add('tag'); // Add the 'tag' class to make the button appear like the original tags

// Get the original tag
const originalTag = document.querySelector(`.tag.${CSS.escape(tag.replace(' ', '_'))}`);
if (originalTag) {
  // Copy the class list from the original tag
  originalTag.classList.forEach(className => {
    tagButton.classList.add(className);
  });
}

// Add an event listener to remove the tag when the button is clicked
tagButton.addEventListener('click', function() {
  this.remove();
});

// Append the button as a child of the tag_box panel
tagBox.appendChild(tagButton);
}

document.addEventListener("DOMContentLoaded", function() {
 
// Add event listener to throughlineButton
var throughlineButton = document.getElementById('throughline_button');
throughlineButton.addEventListener('click', function() {
  toggleTagPopUp("throughline_pop_up");
});

// Add event listener to skillButton
var skillButton = document.getElementById('skill_button');
skillButton.addEventListener('click', function() {
  toggleTagPopUp("skill_pop_up");
});

// Add event listener to courseButton
var courseButton = document.getElementById('course_button');
courseButton.addEventListener('click', function() {
  toggleTagPopUp("course_pop_up");
});


// Add event listener to levelButton
var levelButton = document.getElementById('level_button');
levelButton.addEventListener('click', function() {
  toggleTagPopUp("level_pop_up");
});

// Add event listeners to all tags to insert them into the tag_box panel when clicked
const allTags = document.querySelectorAll('.tag');
allTags.forEach(function(tag) {
tag.addEventListener('click', function() {
  // Get the text content of the clicked tag
  const tagText = this.textContent;

  // Insert the tag into the tag_box panel
  insertTagIntoTagBox(tagText);
});
});

// Add event listener to search exhibitions button
var searchExhibitionsButton = document.getElementById('search_button');
searchExhibitionsButton.addEventListener('click', function() {
  toggleSearchPopUp(); // Toggle the visibility of the search pop-up
});

// Function to toggle the visibility of the search pop-up
function toggleSearchPopUp() {
  var searchPopUp = document.querySelector('.search_pop_up');
  if (searchPopUp.style.display === 'block') {
      searchPopUp.style.display = 'none';
  } else {
      searchPopUp.style.display = 'block';
  }
}
});