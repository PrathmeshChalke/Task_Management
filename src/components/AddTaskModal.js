import React, { useState } from "react";
import { Button, TextInput, Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import Swal from "sweetalert2";

const AddTaskModal = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (task.trim() === "") {
      Swal.fire({
        text: "Please enter a Task Name.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    } else if (name.trim() === "") {
      Swal.fire({
        text: "Please enter a Assignee Name.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    } else if (status === "") {
      Swal.fire({
        text: "Please select a Status.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const newTask = {
      id: Date.now(),
      taskName: task,
      status: status,
      name: name,
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    Swal.fire({
      title: "Success!",
      text: "Task added successfully",
      icon: "success",
      confirmButtonText: "OK",
    });

    setTask("");
    setStatus("");
    setName("");
  };

  return (
    <div className="card shadow-sm border p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0">Add New Task</h4>
        <Button
          color="blue"
          onClick={() => navigate("/Task_Management/task-list")}
          className="d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faList} className="me-2" />
          View Task List
        </Button>
      </div>

      <div className="mb-4">
        <TextInput
          label="Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task name"
          className="mb-3"
          required
        />
        <TextInput
          label="Assignee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Assignee name"
          className="mb-3"
          required
        />
        <Select
          label="Status"
          data={[
            { label: "In Progress", value: "In_Progress" },
            { label: "Pending", value: "Pending" },
            { label: "Completed", value: "Completed" },
          ]}
          className="mb-3"
          placeholder="Select..."
          onChange={(e) => setStatus(e)}
          value={status}
          required
        />
      </div>

      <div className="d-flex justify-content-end">
        <Button onClick={handleSubmit} className="px-4">
          <FontAwesomeIcon icon={faSave} className="me-2" /> Save Task
        </Button>
      </div>
    </div>
  );
};

export default AddTaskModal;
