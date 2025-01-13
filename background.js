chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "convertToPDF",
      title: "Convert page text to PDF",
      contexts: ["page", "selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "convertToPDF") {
      const selectedText = info.selectionText;
      
      if (selectedText) {
        // Handle selected text conversion
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          const tab = tabs[0];
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: convertToPDF,
            args: [selectedText]
          });
        });
      } else {
        // Handle full page text conversion
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          const tab = tabs[0];
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: convertFullPageToPDF
          });
        });
      }
    }
  });
  
  // Conversion functions that will be injected into the page
  function convertToPDF(selectedText) {
    fetch('http://localhost:5000/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: selectedText })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => {
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error:', error));
  }
  
  function convertFullPageToPDF() {
    const allText = document.body.innerText;
    convertToPDF(allText);
  }