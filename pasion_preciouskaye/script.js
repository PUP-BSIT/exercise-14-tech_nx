document.addEventListener('DOMContentLoaded', function () {
  const commentForm = document.getElementById('comment');
  const commentsList = document.getElementById('comments_list');
  const sortAscButton = document.getElementById('sort_asc');
  const sortDescButton = document.getElementById('sort_desc');
  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('ycomment');
  const submitButton = document.getElementById('button_comment');

  commentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addComment();
  });

  sortAscButton.addEventListener('click', function () {
    sortComments('asc');
  });

  sortDescButton.addEventListener('click', function () {
    sortComments('desc');
  });

  nameInput.addEventListener('input', checkFormValidity);
  commentInput.addEventListener('input', checkFormValidity);

  function checkFormValidity() {
    if (nameInput.value.trim() !== '' && commentInput.value.trim() !== '') {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  function addComment() {
    const name = nameInput.value;
    const commentText = commentInput.value;
    const timestamp = new Date().toISOString();
    const commentHTML = `<li data-timestamp="${timestamp}">${commentText} 
                    - ${name} <span class="date">${timestamp}</span></li>`;

    commentsList.insertAdjacentHTML('beforeend', commentHTML);
    nameInput.value = '';
    commentInput.value = '';
    submitButton.disabled = true; 
  }

  function sortComments(order) {
    const commentsArray = Array.from(commentsList.querySelectorAll('li'));

    commentsArray.sort((a, b) => {
      const dateA = new Date(a.getAttribute('data-timestamp'));
      const dateB = new Date(b.getAttribute('data-timestamp'));
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    commentsList.innerHTML = '';
    commentsArray.forEach(comment => {
      commentsList.appendChild(comment);
    });
  }
});
