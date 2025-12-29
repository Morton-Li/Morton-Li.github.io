// Typewriter effect
function typewrite(element, text, speed = 100) {
  return new Promise((resolve) => {
    let i = 0;
    element.classList.add('typewriter');

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.classList.remove('typewriter');
        element.classList.add('complete');
        resolve();
      }
    }

    type();
  });
}

// Get element by ID and clear its text content
function getElementAndText(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" not found.`);
  }
  let text = element.textContent.trim();
  element.textContent = '';
  return { element, text };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  // Typewrite greeting and name sequentially
  const items = [
    getElementAndText('h1-greeting'),
    getElementAndText('h1-name'),
  ];
  for (const { element, text } of items) await typewrite(element, text, 150);
});
