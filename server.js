const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let faqs = [
  { id: 1, question: "What is UniFAQ?", answer: "UniFAQ is a FAQ system." },
  { id: 2, question: "How do I use it?", answer: "You can view and add FAQs easily." }
];

// GET all FAQs
app.get("/api/faqs", (req, res) => {
  res.status(200).json(faqs);
});

// GET one FAQ by ID
app.get("/api/faqs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const faq = faqs.find(f => f.id === id);
  if (!faq) return res.status(404).json({ message: "FAQ not found" });
  res.status(200).json(faq);
});

// CREATE a new FAQ
app.post("/api/faqs", (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ message: "Question and Answer are required" });
  }
  const newFaq = { id: faqs.length + 1, question, answer };
  faqs.push(newFaq);
  res.status(201).json(newFaq);
});

// UPDATE an existing FAQ
app.put("/api/faqs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { question, answer } = req.body;
  const faq = faqs.find(f => f.id === id);

  if (!faq) return res.status(404).json({ message: "FAQ not found" });
  if (!question || !answer) {
    return res.status(400).json({ message: "Question and Answer are required" });
  }

  faq.question = question;
  faq.answer = answer;
  res.status(200).json(faq);
});

// DELETE an FAQ
app.delete("/api/faqs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = faqs.findIndex(f => f.id === id);

  if (index === -1) return res.status(404).json({ message: "FAQ not found" });

  const deleted = faqs.splice(index, 1);
  res.status(200).json({ message: "FAQ deleted", deleted });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
