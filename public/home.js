// Arrays to store tags
let computerScienceClasses = [];
let skills = [];
let courseLevel=[];

// Function to insert a tag
function insertTag(tag, category) {
  const searchBar = document.getElementById('search_bar'); //https://www.w3schools.com/jsref/met_document_getelementbyid.asp
  const tagButton = document.createElement('button');
  tagButton.textContent = tag;
  tagButton.classList.add('tag_button');

  // Add an event listener to remove the tag when the button is clicked
  
  https://www.w3schools.com/js/js_switch.asp
  tagButton.addEventListener('click', function() {
    searchBar.value = searchBar.value.replace(tag, '').trim();
    
    // https://stackoverflow.com/questions/767821/is-else-if-faster-than-switch-case
    //checks which type of tag was used, and removes it to the corresponding array
    switch (category) {
      case 'computerScienceClasses':
        computerScienceClasses = computerScienceClasses.filter(selectedTag => selectedTag !== tag);
        break;
      case 'skills':
        skills = skills.filter(selectedTag => selectedTag !== tag);
        break;
      case 'courseLevel':
        courseLevel = courseLevel.filter(selectedTag => selectedTag !== tag);
        break;
      default:
        break;
    }
    this.remove();
  });

  // Append the button as a child of the search bar
  searchBar.parentNode.insertBefore(tagButton, searchBar.nextSibling);

  //checks which type of tag is used, and appends it to the corresponding array
  switch (category) {
    case 'computerScienceClasses':
      computerScienceClasses.push(tag);
      break;
    case 'skills':
      skills.push(tag);
      break;
    case 'courseLevel':
      courseLevel.push(tag);
    default:
      break;
  }
}

// https://www.youtube.com/watch?v=ZFUOC-y4i0s&t=18s&ab_channel=Tech2etc
//Filter tag buttons based on search
function search() {
  const searchbox = document.getElementById("search_bar").value.toUpperCase(); //easier to check if all characters are capitalized
  const tagButtons = document.querySelectorAll(".tag_button");
  
  tagButtons.forEach(button => {
    const buttonText = button.textContent.toUpperCase();
    
    if (buttonText.includes(searchbox)) { 
      button.style.display = "";
    } else {
      button.style.display = "none";
    }
  });
}

// https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null
document.addEventListener('DOMContentLoaded', function() {
  //Show tag panel when search bar is clicked
  document.getElementById('search_bar').addEventListener('click', function() {
    const tagPanel = document.getElementById('tag_panel_of_search');
    if (tagPanel) {
      tagPanel.style.display = 'block';
    }
  });
  
   // Hide tag panel when clicking outside
  document.body.addEventListener('click', function(event) {
    const tagPanel = document.getElementById('tag_panel_of_search');
    const searchBar = document.getElementById('search_bar');

    if (tagPanel && searchBar && !tagPanel.contains(event.target) && event.target !== searchBar) {
      tagPanel.style.display = 'none';
    }
  });
});