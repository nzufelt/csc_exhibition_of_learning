//arrays to store tags
let years = [];
let skills = [];
let courseLevel=[];
let courses = [];

function toggleTagPopUp(tag_panel) {
    // hide all pop-ups
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

// function to dynamically create the year tagsfor the year_pop_up
function generateYearTagsYear() {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearContainer = document.getElementById('year_pop_up');

  for (let year = startYear; year <= currentYear + 1; year++) {
    const yearButton = document.createElement('button');
    yearButton.classList.add('tag', 'year');
    yearButton.textContent = String(year) + String(" - ") + String(year+1);
    yearContainer.appendChild(yearButton);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  generateYearTagsYear();
});

// function to dynamically create the year tagsfor the all_tags_pop_up
function generateYearTagsAll() {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearContainer = document.getElementById('all_tags_pop_up');

  for (let year = startYear; year <= currentYear + 1; year++) {
    const yearButton = document.createElement('button');
    yearButton.classList.add('tag', 'year');
    yearButton.textContent = String(year) + String(" - ") + String(year+1);
    yearContainer.appendChild(yearButton);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  generateYearTagsAll();
});

function insertTagIntoTagBox(tag) {
  const tagBox = document.querySelector('.tag_box');
  const tagText = tag.textContent.trim(); // tag text content and remove whitespace
  const tagIdentifier = tag.dataset.identifier; // get idenitifying data associated with tag

  // check that tag is in the tag_box
  const existingTags = tagBox.querySelectorAll('.tag');
  for (const existingTag of existingTags) {
    if (existingTag.textContent.trim() === tagText) {
      return; // if tag exists, exit
    }
  }

  const tagButton = document.createElement('button');
  tagButton.textContent = tagText;
  tagButton.classList.add('tag');

  // check that original tag has specific classes, add them to the new tag button
  if (tag.classList.contains('human_communication')) {
    tagButton.classList.add('human_communication');
  } else if (tag.classList.contains('working_with_code')) {
    tagButton.classList.add('working_with_code');
  } else if (tag.classList.contains('research_and_design')) {
    tagButton.classList.add('research_and_design');
  } else if (tag.classList.contains('asking_questions')) {
    tagButton.classList.add('asking_questions');
  } else if (tag.classList.contains('working_with_systems')) {
    tagButton.classList.add('working_with_systems');
  }

  // append the button as a child of the tag_box panel
  tagBox.appendChild(tagButton);
  
  // add tag to appropriate tag array
  if (tag.classList.contains('years')){
    yearss.push(tagText)
  }
  
  if (tag.classList.contains('skill')){
    skills.push(tagIdentifier)
  }
  
  if (tag.classList.contains('course')){
    courses.push(tagIdentifier)
  }
  
  if (tag.classList.contains('level')){
    courseLevel.push(tagText)
  }
  
  // remove the tag when the button is clicked
  tagButton.addEventListener('click', function() {
  this.remove();
   if (tag.classList.contains('year')){
     years.splice(years.indexOf(tagText), 1);
   }
   
   // remove tag from appropriate tag array
   if (tag.classList.contains('skill')){
     skills.splice(skills.indexOf(tagText), 1);
   }
    
   if (tag.classList.contains('course')){
     courses.splice(courses.indexOf(tagText), 1);
   }
    
   if (tag.classList.contains('level')){
     courseLevel.splice(courseLevel.indexOf(tagText), 1);
   }
  
  displayArrays();
  });
  
} 

document.addEventListener("DOMContentLoaded", function() {
   
// add event listener to yearButton
var yearButton = document.getElementById('year_button');
yearButton.addEventListener('click', function() {
    toggleTagPopUp("year_pop_up");
    displayArrays(); // update and display arrays when a tag is clicked
});

// add event listener to skillButton
var skillButton = document.getElementById('skill_button');
skillButton.addEventListener('click', function() {
    toggleTagPopUp("skill_pop_up");
    displayArrays(); // display array
});

// add event listener to courseButton
var courseButton = document.getElementById('course_button');
courseButton.addEventListener('click', function() {
    toggleTagPopUp("course_pop_up");
    displayArrays(); // display array
});

// add event listener to levelButton
var levelButton = document.getElementById('level_button');
levelButton.addEventListener('click', function() {
    toggleTagPopUp("level_pop_up");
    displayArrays(); // display array
});
  
// add event listener to search bar
var searchBar = document.getElementById('search_bar');
searchBar.addEventListener('click', function(event) {
    var allTagsPopUp = document.getElementById('all_tags_pop_up');
    if (allTagsPopUp.style.display === 'block') {
        return;
    }
    toggleTagPopUp("all_tags_pop_up");
    event.stopPropagation();
});

// add event listeners to all tags to insert them into the tag_box panel when clicked
const allTags = document.querySelectorAll('.tag');
allTags.forEach(function(tag) {
  tag.addEventListener('click', function() {
    // pass the clicked tag element to insertTagIntoTagBox
    insertTagIntoTagBox(this);
    displayArrays(); // display array
  });
});

// add event listener to search exhibitions button
var searchExhibitionsButton = document.getElementById('search_button');
searchExhibitionsButton.addEventListener('click', function() {
    toggleSearchPopUp();
});

// toggle the visibility of the search pop-up
function toggleSearchPopUp() {
    var searchPopUp = document.querySelector('.search_pop_up');
    if (searchPopUp.style.display === 'block') {
        searchPopUp.style.display = 'none';
    } else {
        searchPopUp.style.display = 'block';
    }
}
  displayArrays(); // display array
  
});


// https://www.youtube.com/watch?v=ZFUOC-y4i0s&t=18s&ab_channel=Tech2etc
//Filter tag buttons based on search
function search() {
  const searchbox = document.getElementById("search_bar").value.toUpperCase();

  // Get all tag pop-ups
  const popUps = document.querySelectorAll('.tag_pop_up');

  // Iterate through each pop-up to search for matching tags
  popUps.forEach(popUp => {
    // Get tag buttons within the current pop-up
    const tagButtons = popUp.querySelectorAll('.tag');

    // Iterate through each tag button to check for matching text content
    tagButtons.forEach(button => {
      const buttonText = button.textContent.toUpperCase(); // Convert tag button text to uppercase

      // Check if the tag button text contains the search text
      if (buttonText.includes(searchbox)) {
        button.style.display = ""; // Show the tag button if it matches the search
      } else {
        button.style.display = "none"; // Hide the tag button if it doesn't match the search
      }
    });
  });
}


// Function to display array contents on the web page
function displayArrays() {
  // Display years
  document.getElementById("years").textContent = JSON.stringify(years);
  
  // Display skills
  document.getElementById("skills").textContent = JSON.stringify(skills);
  
  // Display courses
  document.getElementById("courses").textContent = JSON.stringify(courses);
  
  // Display course levels
  document.getElementById("courseLevels").textContent = JSON.stringify(courseLevel);
}

function handleButtonClick() {
  // create url based on search parameters
  url_string = "/search?skills=" + JSON.stringify(skills) + "&courses=" + JSON.stringify(courses) + "&levels=" + JSON.stringify(courseLevel)

  // redirect to new url
  window.location.href = url_string; 
}

// handle clicking search button
document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('#submit');
  if (button) {
      button.onclick = handleButtonClick;
  }
});
