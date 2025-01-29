function getValue(){

const inputElt = document.getElementById('blockedS');
const Inputvalue = inputElt.value;
return Inputvalue;
}
alert(Inputvalue);
// List of domains to exclude (e.g., Facebook)
const blockedDomains = [];
blockedDomains.push(Inputvalue);

// Function to filter results
function filterResults() {
  // Google search result elements are typically inside divs with class "g" (may vary)
  const results = document.querySelectorAll('div.g');

  results.forEach(result => {
    const link = result.querySelector('a[href]');
    if (link) {
      const url = new URL(link.href).hostname;
      // Hide results from blocked domains
      if (blockedDomains.some(domain => url.includes(domain))) {
        result.style.display = 'none'; // Hide the result
      }
    }
  });
}

// Run on initial page load
filterResults();

// Use MutationObserver to detect dynamic changes (e.g., infinite scroll)
const observer = new MutationObserver(mutations => {
  filterResults();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});