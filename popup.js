
document.addEventListener('DOMContentLoaded', () => {
    renderBlockedDomains();
  });
  

  document.getElementById('domainForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const domain = document.getElementById('blockedS').value.trim().toLowerCase();
    if (domain) {
      chrome.storage.local.get({ blockedDomains: [] }, (data) => {
        const updatedDomains = [...new Set([...data.blockedDomains, domain])];
        chrome.storage.local.set({ blockedDomains: updatedDomains }, () => {
          document.getElementById('blockedS').value = '';
          renderBlockedDomains();
        });
      });
    }
  });
  
 
  function renderBlockedDomains() {
    chrome.storage.local.get({ blockedDomains: [] }, (data) => {
      const list = document.getElementById('blockedList');
      list.innerHTML = ''; 
      
      data.blockedDomains.forEach(domain => {
        const domainItem = document.createElement('div');
        domainItem.className = 'domain-item';
        
        domainItem.innerHTML = `
          <span>${domain}</span>
          <button class="remove-btn" data-domain="${domain}">Remove</button>
        `;
        
        
        domainItem.querySelector('.remove-btn').addEventListener('click', (e) => {
          const domainToRemove = e.target.dataset.domain;
          removeDomain(domainToRemove);
        });
        
        list.appendChild(domainItem);
      });
    });
  }
  
  
  function removeDomain(domain) {
    chrome.storage.local.get({ blockedDomains: [] }, (data) => {
      const updatedDomains = data.blockedDomains.filter(d => d !== domain);
      chrome.storage.local.set({ blockedDomains: updatedDomains }, () => {
        renderBlockedDomains();
      });
    });
  }