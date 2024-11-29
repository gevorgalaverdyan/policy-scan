# Policy Scanner

## Demo: https://youtu.be/AJxWb67I0GE

## About
In this project, we developed a browser extension that uses artificial intelligence to analyze and rate privacy policies. The extension is powered by GroqAI's server-side infrastructure and Meta’s Llama 3 model [2], which works together to provide users with clear evaluations of privacy policies. These evaluations focus on key categories like transparency, data minimization, third-party sharing, and consent mechanisms. This extension was built using React, which made it easier to design a user-friendly interface and display the AI-generated ratings. While the results show the potential of AI to simplify complicated legal language, they also highlight some limitations, such as challenges with text extraction and how the AI interprets the policies. Overall, this project emphasizes the need for tools that make privacy policies easier to understand and more accessible for everyday users. 

## Steps

```bash
npm i
```

### for development (testing only)

```bash
npm run dev
```

### for prod (getting latest changes so we can upload to chrome://extensions)
```bash
npm run build
```

- check if /dist folder is generated and you have the manifest.json 
- go to chrome extensions chrome://extensions
- toggle dev mode
- load dist folder
