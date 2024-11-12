export default function useAppHook() {
  /*const scanPrivacyPolicy = async (policy: string) => {
    if (!policy) {
      alert("Please provide a privacy policy to scan.");
      return;
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    };

    const body = JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: `Summarize this privacy policy in text format, use good formatting: ${policy}`,
        },
      ],
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      throw Error(`Error fetching data: ${error}`);
    }
  };
*/
  const scanPrivacyPolicy = async (policy: string) => {
    if (!policy) {
      alert("Please provide a privacy policy to scan.");
      return;
    }

    const url = "https://api.aimlapi.com/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer 63c93a2391c24d1bb68ffcf277444224",
    };

    const body = JSON.stringify({
      model: "text-embedding-3-small",
      messages: [
        `Summarize this privacy policy in text format, use good formatting: ${policy}`,
      ],
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      const data = await response.json();
      console.log(JSON.stringify(data));
      return data.choices[0].message.content;
    } catch (error) {
      throw Error(`Error fetching data: ${error}`);
    }
  };

  return { scanPrivacyPolicy };
}

/*
const response = await fetch('https://api.aimlapi.com/chat/completions', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "text",
      "messages": [
        "text"
      ]
    }),
});
const data = await response.json();
*/
