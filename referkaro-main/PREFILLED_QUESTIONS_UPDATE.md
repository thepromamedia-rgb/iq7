# Prefilled Admin Questions Update

The Admin > Daily Tasks screen now pre-fills two editable starter multiple-choice questions when a date has no saved questions. Each has three options and a preselected correct answer. Admin can edit the questions/options, choose correct answers, and publish without configuring an AI provider. AI generation remains optional and requires server-side AI_API_KEY. The three website-link fields and their existing 10-second task completion behaviour are unchanged.

Note: starter questions are generic templates, not content-specific AI questions. Admin should edit them to match the actual website content before publishing if factual comprehension questions are required.

Validation: `npm test` passed (server syntax, inline JS syntax, existing smoke tests).
