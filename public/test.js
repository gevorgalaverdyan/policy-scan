// // Function to extract the privacy policy text from common selectors
// function getPrivacyPolicyText() {
//   const possibleSelectors = ["div", "p", "[class*='policy']", "[id*='policy']"];
//   let policyText = "";

//   possibleSelectors.forEach((selector) => {
//     document.querySelectorAll(selector).forEach((element) => {
//       const text = element.textContent?.toLowerCase();
//       if (text && (text.includes("policy") || text.includes("privacy"))) {
//         policyText += element.textContent + "\n";
//       }
//     });
//   });

//   return policyText || "Privacy policy not found on this page.";
// }

// // Listener to handle messages from the extension's popup or background
// chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
//   if (message === "fetchPolicyText") {
//     const policyText = getPrivacyPolicyText();
//     sendResponse({ policyText });
//   }
// });
