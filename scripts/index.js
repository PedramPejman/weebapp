var current_page = 11;


window.onload = function()
{
  setUpDraggableElements();
  setUpPageInteractions();
  setUpPageAdding();
  setUpEditorLayout();
}




function setUpPageInteractions() {
  //Setting up the page-choosing mechanism
  var page_elements = document.querySelectorAll('.page');
  for (var i = 0; i < page_elements.length; i++) {
    page_elements[i].addEventListener('click', function(e) {
      current_page = this.getAttribute('id');
      setUpEditorLayout();
    });
  }

  //Setting up the page-deletion mechanism
  var page_delete_buttons = document.querySelectorAll('.page_delete');
  for (var i = 0; i < page_delete_buttons.length; i++) {
    page_delete_buttons[i].addEventListener('click', function(e) {
      deletePage(this.getAttribute('id'));
    });
  }
}

function setUpPageAdding() {
    //Setting up the page-adding mechanism
    var page_add_button = document.querySelector('.page_add');
    page_add_button.addEventListener('click', function(e) {
      addPage();
    });

}


function addPage() {
  
  sql_command = "SELECT * FROM pages";
  $.ajax({ url: './executeTask.php',
         data: {command :  sql_command},
         type: 'get',
         dataType: 'json',
         success: function(pages) {
            var new_page_num = Math.max(pages[pages.length-1]['id'].valueOf(), pages.length) +1;
            $.ajax({ url: './executeTask.php',
              data: {command: 'INSERT INTO pages VALUES (' + new_page_num + ')'},
              type: 'get',
              success: function(elements) {
                setUpSideBar();
              },
              error: function(data) {
                alert('error');
              }
            });

          }
}); 

  
}

function deletePage(id) {
  //Delete the page object from pages table
  $.ajax({ url: './executeTask.php',
      data: {command: 'DELETE FROM pages WHERE id = ' + id},
      type: 'get',
      success: function(elements) {
        setUpSideBar();
      },
      error: function(data) {
        alert('error');
      }

  });

  //Delete the elements pretaining to that page
  $.ajax({ url: './executeTask.php',
      data: {command: 'DELETE FROM elements WHERE page = ' + id},
      type: 'get',
      success: function(elements) {
        setUpSideBar();
      },
      error: function(data) {
        alert('error');
      }

  });
}

function setUpEditorLayout() {
  var page_selector = document.querySelector('.page_selector');
  var current_page_layout = document.querySelector('.current_page');
  //update the page_selector field
  page_selector.innerHTML = "<h1> Page " + current_page + "</h1>";
  //update the current_page_layout
    $.ajax({ url: './executeTask.php',
         data: {command : 'SELECT * FROM elements WHERE page = ' + current_page},
         type: 'get',
         dataType: 'json',
         success: function(elements) {
            layout_inner_html = "";
            for (var i = 0; i < elements.length; i++) {
              if (elements[i]['type'] == 'text') {
                layout_inner_html += "<textarea class = 'layout_text_element'>" + elements[i]['data'] + "</textarea>";
              }
              else if(elements[i]['type'] == 'image') {
                layout_inner_html += "<div class = 'layout_image_element'></div>";
              }
            }
            current_page_layout.innerHTML = layout_inner_html;
            setUpElementFocusListeners();
          }
});
}

function setUpSideBar() {
  var sidebar_pages_layout = document.querySelector('.pages');
  //update the sidebar_pages section layout
    $.ajax({ url: './executeTask.php',
         data: {command : 'SELECT * FROM pages'},
         type: 'get',
         dataType: 'json',
         success: function(elements) {
            sidebar_inner_html = "<div class = 'section_title'>Pages</div>";
            for (var i = 0; i < elements.length; i++) {
                sidebar_inner_html += "<li class='page_line'>";
                sidebar_inner_html += "<a class='page' id = '" + elements[i]['id'] + "'> Page " + elements[i]['id'] + "</a>"
                sidebar_inner_html += "<a class='page_delete' id = '" + elements[i]['id'] + "'> Delete </a> </li><br>" ;
            }
            sidebar_pages_layout.innerHTML = sidebar_inner_html;
            setUpPageInteractions();
          }
});

}



//In this functino, we set up our drag-and-drop environment for all draggable elements
function setUpDraggableElements() {
	var editor = document.querySelector('.current_page');
	var dragElements = document.querySelectorAll('.elements li');
	var elementDragged = null;

	for (var i = 0; i < dragElements.length; i++) {
	  // Event Listener for when the drag interaction starts.
	  dragElements[i].addEventListener('dragstart', function(e) {
	    e.dataTransfer.effectAllowed = 'move';
	    e.dataTransfer.setData('type', this.getAttribute('element-type'));
	    elementDragged = this;
	  });


  // Event Listener for when the drag interaction finishes.
  dragElements[i].addEventListener('dragend', function(e) {
    elementDragged = null;
  });

};

// Event Listener for when the dragged element is over the drop zone.
editor.addEventListener('dragover', function(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';

  return false;
});


// Event Listener for when the dragged element enters the drop zone.
editor.addEventListener('dragenter', function(e) {
  this.className = this.className + " dragging_over";
});

// Event Listener for when the dragged element leaves the drop zone.
editor.addEventListener('dragleave', function(e) {
	//Some regex stuff --- sorta overkill sorta clever :) 
  //-- basically removing the dragging_over class - could have used removeClass().. but then we wouldn't know how awesome regex is!!!!
	this.className = this.className.replace(/\bdragging_over\b/,'');
});

// Event Listener for when the dragged element dropped in the drop zone.
editor.addEventListener('drop', function(e) {
  if (e.preventDefault) e.preventDefault(); 
  if (e.stopPropagation) e.stopPropagation();
  this.className = this.className.replace(/\bdragging_over\b/,'');
  addElement(e.dataTransfer.getData('type'));
  return false;
});
}

function addElement(type) {
  sql_command = "INSERT INTO elements VALUES (NULL, '" + type + "', " + current_page + ", '') ";
  $.ajax({ url: './executeTask.php',
         data: {command :  sql_command},
         type: 'get',
         dataType: 'json',
         success: function() {
            setUpEditorLayout();
          }
}); 
}

function setUpElementFocusListeners() {
  var elements = document.querySelectorAll('.layout_text_element');
  for (var i = 0; i < elements.length; i++) {
    //elements[i].focus(function() {
     // alert('in focus');
   // })
  }
}

