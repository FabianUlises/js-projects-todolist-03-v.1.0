const dateOptions = {weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();
const dateElement = document.querySelector('.date');
dateElement.innerHTML = today.toLocaleDateString('en-us', dateOptions);