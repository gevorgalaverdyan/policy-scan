const input = `Detect if this page is a privacy policy page. If there is no privacy policy on the page, just say: "No privacy policy detected." Do not summarize anything else.

If it is a privacy policy page, analyze the following categories and give a score (between 1-100) for each of them based on the content of the policy:

1. **Transparency**: Evaluates how clearly the policy communicates what data is collected, why, and how it's used. (Transparency)
2. **Data Minimization**: Assesses if the policy ensures that only necessary data is collected. (Data Minimization)
3. **Third-party Sharing**: Identifies whether the policy mentions sharing data with third parties and under what conditions. (Third-party Sharing)
4. **Consent Mechanisms**: Reviews how the policy explains the process for obtaining user consent and how easy it is for users to opt-in or opt-out. (Consent Mechanisms)
5. **Retention Policies**: Evaluates the policy on how long user data is kept and if it explains when and how data will be deleted. (Retention Policies)
6. **Children's Privacy**: Assesses how the policy addresses the privacy of children, especially in compliance with laws like COPPA. (Children's Privacy)

For each category, provide a score between 1-100, where 1 is the least favorable score (poor or no mention) and 100 is the most favorable (clear and thorough explanation).

Return the results as a JSON object. Do not include anything besides the JSON output. The JSON format should be exactly like this:

{
  "scores": {
    "transparency": 64,
    "data_minimization": 55,
    "third_party": 50,
    "consent_mechanism": 94,
    "retention": 64,
    "children": 42
  }
}

  Here is the page to analyze: 
`;

export default input;
