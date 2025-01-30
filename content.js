function filterResults() {
  chrome.storage.local.get({ blockedDomains: [] }, (data) => {
    const blockedDomains = data.blockedDomains;
    const results = document.querySelectorAll('div.g');

    results.forEach(result => {
      const link = result.querySelector('a[href]');
      if (link) {
        const url = new URL(link.href).hostname.toLowerCase();
        const shouldHide = blockedDomains.some(domain => 
          url.includes(domain.toLowerCase())
        );
        result.style.display = shouldHide ? 'none' : 'block';
      }
    });
  });
}


filterResults();


const observer = new MutationObserver(filterResults);
observer.observe(document.body, { childList: true, subtree: true });


chrome.storage.onChanged.addListener(filterResults);