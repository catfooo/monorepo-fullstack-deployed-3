import { TaskModel } from "../models/TaskModel";
//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";

// desciption: Get Tasks
// route: /get
// access: Private
export const getTasksController = asyncHandler(async (req, res) => {
  // Use the TaskModel to find all tasks in the database
  await TaskModel.find()
    .then((result) => res.json(result)) // Respond with the found tasks in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: POST Tasks
// route: /add
// access: Private
export const addTaskController = asyncHandler(async (req, res) => {
  // Extract the task data from the request body
  const task = req.body.task;
  // Use TaskModel to create a new task with the provided data
  await TaskModel.create({
    task: task,
  })
    .then((result) => res.json(result)) // Respond with the newly created task in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: PUT/PATCH a specific task to mark it complete
// route: /update/:id"
// access: Private
export const updateTaskController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use TaskModel to find and update a task by its ID, marking it as done
  await TaskModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result)) // Respond with the updated task in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE all tasks
// route: /deleteAll
// access: Private
export const deleteAllTasksController = asyncHandler(async (req, res) => {
  // Use TaskModel to delete all tasks in the database
  await TaskModel.deleteMany({})
    .then((result) =>
      res.json({
        message: "All tasks deleted",
        deletedCount: result.deletedCount,
      })
    ) // Respond with a success message and the count of deleted tasks
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE task by its ID
// route: /delete/:id
// access: Private
export const deleteSpecificTaskController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  // Use TaskModel to find and delete a task by its ID
  await TaskModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.json({
          message: "Task deleted successfully",
          deletedTask: result,
        }); // Respond with a success message and the deleted task
      } else {
        res.status(404).json({ message: "Task not found" }); // Respond with a 404 error if the task is not found
      }
    })
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});
