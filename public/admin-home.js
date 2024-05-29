document.addEventListener("DOMContentLoaded", function() {
    // toggle the visibility of the search pop-up
    var searchExhibitionsButton = document.getElementById('search_button');
    searchExhibitionsButton.addEventListener('click', function() {
      toggleSearchPopUp();
    });
  
    function toggleSearchPopUp() {
      var searchPopUp = document.querySelector('.search_pop_up');
      if (searchPopUp.style.display === 'block') {
        searchPopUp.style.display = 'none';
      } else {
        searchPopUp.style.display = 'block';
      }
    }
  
    // handle tag button clicks
    const tagButtons = document.querySelectorAll('.tag');
    const tagInfoPanel = document.getElementById('tag_info_panel');
    const tagInfoTitle = document.getElementById('tag_info_title');
    const closeTagInfoButton = document.getElementById('close_button');
  
    tagButtons.forEach(button => {
      button.addEventListener('click', function() {
        tagInfoTitle.textContent = this.textContent;
        tagInfoPanel.style.display = 'block';
      });
    });
  
    closeTagInfoButton.addEventListener('click', function() {
      tagInfoPanel.style.display = 'none';
    });
  
    // toggle the visibility of the new tag pop-up
    var makeNewTagButton = document.getElementById('make_new_tag_button');
    var newTagPanel = document.getElementById('new_tag_panel');
    var closeNewTagButton = document.getElementById('new_tag_close_button');
  
    makeNewTagButton.addEventListener('click', function() {
      newTagPanel.style.display = 'block';
    });
  
    closeNewTagButton.addEventListener('click', function() {
      newTagPanel.style.display = 'none';
    });
  
    // filter tag buttons based on search
    function tag_search() {
      const searchbox = document.getElementById("tag_search_bar").value.toUpperCase();
      const allTags = document.querySelectorAll('.all_tags .tag'); // select all tag buttons within the .all_tags container
  
      allTags.forEach(button => {
        const buttonText = button.textContent.toUpperCase();
  
        if (buttonText.includes(searchbox)) {
          button.style.display = ""; // show the tag button if it matches the search
        } else {
          button.style.display = "none"; // hide the tag button if it doesn't match the search
        }
      });
    }
  
    // attach the search function to the input field
    document.getElementById('tag_search_bar').addEventListener('keyup', tag_search);
  });


// function that logs form submission message
// function logSubmit(event) {
//   event.preventDefault();
//   const form = event.target;
//   const log = form.querySelector(".log");
//   log.textContent = "Form Submitted!";
// }

// select forms
const forms = document.querySelectorAll("form");

// add event listener to the forms
forms.forEach(form => {
  form.addEventListener("submit", logSubmit);
});
