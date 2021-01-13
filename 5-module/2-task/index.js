function toggleText() {
  let text = document.getElementById('text');
  document.querySelector('.toggle-text-button')
  .onclick = () => {
    text.hidden = !text.hidden;
  };
}
