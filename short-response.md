# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:
Three specific design decisions in the Todo Tracker API that makes it **RESTful**(**R**epresentational **S**tate **T**ransfer) are the resource API's, HTTP methods, and the status codes.

#### Resource based URLS -

The todo API tracker uses urls like `/api/todo` and `/api/todo/:id` in order to represent resources. This communicates to a client developer that the API is based on resources rather than actions.

#### HTTP Methods -

The todo API tracker uses HTTP verbs in order to express the intentions, they are called HTTP methods. `GET` method is used to retrieve a `todo` task,`POST` to create a task in the `todo` array,`PATCH` to update a task in the `todo` array, and `DELETE` to delete a task off of the array. This communicates to a client developer what action is being taken and what resource its acting on based on the URL for example `DELETE /api/todo:id` will remove that task with that `id` from the `todo` array.

#### Status Codes -

The todo API tracker returns status codes depending on if the request was successful(`200`), created(`201`) when a todo task is made, or not found(`404`) when a task doesn't exist. This communicates to a client developer whether a request succeeded or failed based on the status code given.

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

A problem caused by the mixing of data logic and request response logic in a single file is because it wouldn't be very compliant when it comes to the three main principles when developing as a SWE, they are as followed- ETU(Easy To Understand), RFC(Ready For Change), and SFB(Safe From Bugs).

Mainly it wouldn't follow the Ready for change but they all still play a part in why this is a problem when using a single file. If you wanted to change something for example how `find()` works, you can risk breaking something thats unrelated. If the file followed the MVC structure and were separated into `index.js`, `controller.js`, and `model.js` the files become completely unrelated and become easier to change, debug and overall work parallel throughout these files, if for example paired with a partner and you had to write out all the code, it becomes easier to manage and work parallel with someone else. It could become harder in terms of initially starting it out and writing the code, having to separate your work and switch between files could be a bit more tedious than just doing everything in one file without having to create or manage different files as well as having to importing/export, but in the long run, its worth it!

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

When the user clicks a checkbox to toggle a todo's `isDone` field a process has to happen in order of firstly the user clicking the checkbox, which then sends a request to a specific endpoint that handles this data. This request is processed through **MVC**(Model-View-Controller Architecture).

- #### View - Renders models and takes user action(webpage)

  The user clicks the item on the webpage that triggers a fetch call that sends a `PATCH` request to `/api/todo/:id` with the todo's id.

- #### Controller - Converts user action to model capabilities
  The `PATCH` request arrives at the `index.js` file first, it looks at the **URL** and the used **HTTP method** and directs the request to the correct function in the `controller.js` file. The `toggleTodo` function would be where the request gets picked up, where it grabs the tasks `id` from the URL, where it passes it to the model to handle the data.
- #### Model - Models define model capabilities
  Now that the `model.js` file has the `id`, the `updateTodo` function goes through the `todos` array looking for the matching `id` that it was given. Once it is found depending on the status of the task the `isDone` field changes to either `true` or `false`. If it was already `true` then pressing it would turn it false, if it was already false then vice versa. After all this it sends the updated `todo` array back to the controller where it sends back a `200` status code letting you know that it was successful.

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: "task is required" });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

Line number 1 belongs in the the controller. It belongs in the controller because this is where the controller converts user action, when the variable `task` is being assigned to the request body, its the applications way of reaching into the HTTP request body, `req.body` is a Javascript object that Express fills when it parses the request. The entire purpose of the controller is like I mentioned to convert, to be more specific it connects HTTP request and app logic.

Line number 2 belongs in the controller, it belongs in the controller because its setting a guard clause, if no task is provided in the `req.body` it sends back a `400`(Bad request) status code and sends a message that tells the client the request was invalid.
