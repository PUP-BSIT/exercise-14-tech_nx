document.addEventListener("DOMContentLoaded", function() {
  let comments = [];

  function addComment(event) {
      event.preventDefault();
      console.log("Add comment");
      let name = document.querySelector("#fname").value;
      let commentText = document.querySelector("#comment").value;
      let date = new Date().toLocaleDateString();

      let comment = { name, comment: commentText, date };

      comments.push(comment);
      sortComments();
      displayComments();

      document.querySelector("#fname").value = "";
      document.querySelector("#comment").value = "";
      document.querySelector("#com-b").disabled = true;
  }

  function displayComments() {
      let commentList = document.querySelector("#commentsSection");
      commentList.innerHTML = "";

      comments.forEach((comment) => {
          let li = document.createElement("li");
          li.textContent = `${comment.comment} - ${comment.name} 
          - ${comment.date}`;
          commentList.appendChild(li);
      });
  }

  function sortComments(order = "asc") {
      if (order === "asc") {
          comments.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "desc") {
          comments.sort((a, b) => b.name.localeCompare(a.name));
      }
  }

  function comment_btn() {
      let name = document.getElementById("fname").value;
      let comment = document.getElementById("comment").value;
      let button = document.getElementById("com-b");

      button.disabled = !(name.length && comment.length);
  }

  document.querySelector("#commentForm").addEventListener("submit", addComment);
  document.querySelector("#fname").addEventListener("input", comment_btn);
  document.querySelector("#comment").addEventListener("input", comment_btn);
  document.querySelector("#asc_btn").addEventListener("click", function() {
      sortComments("asc");
      displayComments();
  });
  document.querySelector("#desc_btn").addEventListener("click", function() {
      sortComments("desc");
      displayComments();
  });

  displayComments();
});
