const router = require("express").Router();
let Todo = require("../models/todo.model");

//Get user id for debbugging - simulating multiple users
router.route("/:userId").get((req, res) => {
  const userId = req.params.userId;

  Todo.find({ userId: userId })
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json("Error: " + err));
});

//Add a new todo
router.route("/add/").post((req, res) => {
  const userId = req.body.userId;
  const description = req.body.description;
  const isDone = Boolean(req.body.isDone);

  const newTodo = new Todo({
    userId,
    description,
    isDone
  });
  newTodo
    .save()
    .then(() => res.json("Todo added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Update endpoint (currently used for idDone)
router.route("/update/:id").put((req, res) => {
  let update = {};
  let id = req.params.id;

  if (req.body.userId !== undefined) {
    update.userId = req.body.userId;
  }

  if (req.body.description !== undefined) {
    update.description = req.body.description;
  }

  if (req.body.isDone !== undefined) {
    update.isDone = Boolean(req.body.isDone);
  }

  Todo.findByIdAndUpdate(id, { $set: update })
    .then(docs => {
      if (docs) {
        res.json("Todo Updated!");
      } else {
        res.status(400).text("No record found with that id.");
      }
    })
    .catch(err => {
      res.status(400).text("An error occured: " + err);
    });
});

//Delete a todo item
router.route("/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

//Mark all todos as completed
router.route("/mark_all_done/:userId").get((req, res) => {
  const userId = req.params.userId;

  Todo.updateMany({ userId: userId }, { isDone: true })
    .then(() => res.json("All items marked as done!"))
    .catch(err => res.status(400).text("An error occured: " + err));
});

module.exports = router;
