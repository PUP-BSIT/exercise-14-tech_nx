document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");
    const commentBtn = document.getElementById("comment_btn");
    const sortAscBtn = document.getElementById("sort_asc_btn");
    const sortDescBtn = document.getElementById("sort_desc_btn");
  
    if (nameInput && commentInput && commentBtn) {
      nameInput.addEventListener("input", toggleCommentButton);
      commentInput.addEventListener("input", toggleCommentButton);
    }
  
    if (commentBtn) {
      commentBtn.addEventListener("click", addComment);
    }
  
    if (sortAscBtn) {
      sortAscBtn.addEventListener("click", function () {
        sortComments('asc');
      });
    }
  
    if (sortDescBtn) {
      sortDescBtn.addEventListener("click", function () {
        sortComments('desc');
      });
    }
  
    let comments = [];
  
    function toggleCommentButton() {
      const nameValue = nameInput.value.trim();
      const commentValue = commentInput.value.trim();
      
      if (nameValue && commentValue) {
        commentBtn.removeAttribute("disabled");
      } else {
        commentBtn.setAttribute("disabled", "disabled");
      }
    }
  
    function addComment() {
      const name = nameInput.value.trim();
      const commentText = commentInput.value.trim();
      const timestamp = new Date();
  
      if (name && commentText) {
        comments.push({ name, text: commentText, date: timestamp });
        displayComments();
        nameInput.value = '';
        commentInput.value = '';
        toggleCommentButton();
      }
    }
  
    function displayComments() {
      const commentsSection = document.getElementById
      ('commentsSection');
      commentsSection.innerHTML = '';
  
      comments.forEach(function (comment) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
          <strong>${comment.name}</strong>
          <time>(${new Date(comment.date)
            .toLocaleString()})</time>
          <p>${comment.text}</p>
        `;
        commentsSection.appendChild(commentDiv);
      });
    }
  
    function sortComments(order) {
      comments.sort(function (a, b) {
        return order === 'asc' ? new Date(a.date) - 
        new Date(b.date) : new Date(b.date) - new Date(a.date);
      });
      displayComments();
    }
  });