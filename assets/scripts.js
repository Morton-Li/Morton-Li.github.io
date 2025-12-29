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

  const typewriteTaskQueue = [];

  // Typewrite header section
  typewriteTaskQueue.push([
    { ...getElementAndText('h1-greeting'), speed: 80 },
    { ...getElementAndText('h1-name'), speed: 80 },
  ]);

  // Typewrite About section
  const aboutSection = document.getElementById('section-about');
  if (aboutSection) {
    typewriteTaskQueue.push(
      Array.from(aboutSection.querySelectorAll('h2, p')).map(el => {
        const text = el.textContent.trim();
        el.textContent = '';
        return { element: el, text, speed: 20 };
      })
    );
  };

  // Execute typewriting tasks sequentially by groups
  await Promise.all(
    typewriteTaskQueue.map(async (group) => {
      for (const { element, text, speed } of group) {
        await typewrite(element, text, speed);
      }
    })
  );

  return; // Exit after initial typewriting
});
