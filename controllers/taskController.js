const taskService = require("../services/taskService");
const validationService = require("../services/taskValidationService");
const root = process.env.ROOT;

exports.getAllTasks = async (req, res, next) => {
  try {
    const docs = await taskService.getAllTasks();
    const response = {
      count: docs.length,
      tasks: docs.map((doc) => {
        return {
          title: doc.title,
          description: doc.description,
          isCompleted: doc.isCompleted,
          _id: doc._id,
          request: {
            type: "GET",
            url: root + "/tasks/" + doc._id,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.addTask = async (req, res, next) => {
  try {
    const { title, description, isCompleted } = req.body;
    if (!validationService.validateTaskInputs(title, description)) {
      throw "Invalid task fields.";
    }

    const result = await taskService.addTask({title, description, isCompleted});

  

    res.status(201).json({
      message: "Task Added",
      Task: {
        ...result,
        request: {
          type: "GET",
          url: root + "/tasks/" + result._id,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const id = req.params.taskID;
    const doc = await taskService.getTask(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const id = req.params.taskID;
    const payload = req.body;
    if (payload.title || payload.description) {
      if (!validationService.validateTaskInputs(payload.title, payload.description)) {
        throw "Invalid task fields.";
    }
    const task = await taskService.getTask(id);
    if (task) {
      const result = await taskService.updateTask(id, payload);
      res.status(200).json(result);
    } else {
      throw "Task doesn't exist";
    }
  }} catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const id = req.params.taskID;
    const task = await taskService.getTask(id);
    if (task) {
      const result = await taskService.deleteTask(id);

      res.status(200).json({
        message: "Task deleted",
        result: result,
        request: {
          type: "POST",
          url: root + "/tasks",
          body: { title: "String", description: "String" },
        },
      });
    } else {
      throw "Task doesn't exist";
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
