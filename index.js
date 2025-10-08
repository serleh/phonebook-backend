const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
// Get all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Get phonebook info
app.get("/info", (req, res) => {
  const numOfPersons = persons.length;
  const date = Date().toString();

  res.send(`<div>
    <p>Phonebook has info for  ${numOfPersons} people</p>
    <p>${date}</p>
    </div>`);
});

// Get a single person
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// Deleting a single person

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

// Add a Person

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number missing" });
  }

  const nameExists = persons.find(
    (person) =>
      person.name.toLocaleLowerCase() === body.name.toLocaleLowerCase()
  );

  if (nameExists) {
    return res.status(409).json({ error: "Name must be unique" });
  }

  const person = {
    id: Math.floor(Math.random() * 10000).toString(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
