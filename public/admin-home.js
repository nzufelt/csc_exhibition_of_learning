document.addEventListener("DOMContentLoaded", function() {
  // toggle the visibility of the search pop-up
  var searchExhibitionsButton = document.getElementById('search_button');
  searchExhibitionsButton.addEventListener('click', function() {
    toggleSearchPopUp();
  });
  
  var searchAdminTags = document.getElementById('search_button_admin');
  searchAdminTags.addEventListener('click', function() {
    toggleSearchPopUp2();
  });

  function toggleSearchPopUp() {
    var searchPopUp = document.getElementById('search_pop_up');
    if (searchPopUp.style.display === 'block') {
      searchPopUp.style.display = 'none';
    } else {
      searchPopUp.style.display = 'block';
    }
  }
  
  function toggleSearchPopUp2() {
    var searchPopUp = document.getElementById('admin_search_pop_up');
    if (searchPopUp.style.display === 'block') {
      searchPopUp.style.display = 'none';
    } else {
      searchPopUp.style.display = 'block';
    }
  }
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
  
  
  // filter tag buttons based on search
function tag_search_admin() {
    const searchbox = document.getElementById("admin_search_bar").value.toUpperCase();
    const allTags = document.querySelectorAll('.all_admins .admin'); // select all tag buttons within the .all_tags container

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
document.getElementById('admin_search_bar').addEventListener('keyup', tag_search_admin);
