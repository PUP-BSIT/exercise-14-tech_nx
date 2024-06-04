document.getElementById("name").addEventListener
        ("input", toggleCommentButton);
document.getElementById("comment").addEventListener
        ("input", toggleCommentButton);

function toggleCommentButton() {
  let nameInput = document.getElementById
  ("name").value.trim();
  let commentInput = document.getElementById
  ("comment").value.trim();
  let commentBtn = document.getElementById
  ("comment_btn");

  if (nameInput && commentInput) {
    commentBtn.removeAttribute("disabled");
  } else {
    commentBtn.setAttribute("disabled", "disabled");
  }
}

let comments = [];

document.getElementById("comment_btn").addEventListener
        ("click", addComment);
document.getElementById("sort_asc_btn").addEventListener
        ("click", function() { sortComments('asc'); });
document.getElementById("sort_desc_btn").addEventListener
        ("click", function() { sortComments('desc'); });

function addComment() {
  const name = document.getElementById
  ('name').value.trim();
  const commentText = document.getElementById
  ('comment').value.trim();
  const timestamp = new Date();

  if (name && commentText) {
    comments.push({ name, text: commentText, date: timestamp });
    displayComments();
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
    toggleCommentButton();
  }
}

function displayComments() {
  const commentsSection = document.getElementById('commentsSection');
  commentsSection.innerHTML = '';

  comments.forEach(function(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
      <strong>${comment.name}</strong>
      <time>(${comment.date.toLocaleString()})</time>
      <p>${comment.text}</p>
    `;
    commentsSection.appendChild(commentDiv);
  });
}

function sortComments(order) {
  comments.sort(function(a, b) {
    return order === 'asc' ? a.date - b.date : b.date - a.date;
  });
  displayComments();
}