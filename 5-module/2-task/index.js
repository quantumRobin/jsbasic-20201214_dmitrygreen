function toggleText() {
  document.querySelector('.toggle-text-button')
  .onclick = () => {
    let text = document.getElementById('text');
    text.hidden = !text.hidden;
  };
}
