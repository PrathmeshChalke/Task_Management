import React, { useState, useEffect } from "react";
import { MantineProvider, Button } from "@mantine/core";
import Swal from "sweetalert2";
import TaskList from "./components/TaskList";
import "@mantine/core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTaskModal from "./components/AddTaskModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
    Swal.fire({
      title: "Success!",
      text: "Task added successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const updatedTasks = tasks?.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='card p-4'>
      <MantineProvider>
        <div className='card-toolbar d-flex justify-content-between align-items-center mb-3'>
          <div className='d-flex'>
            <img src='./watch.svg' alt='logo' className='me-2' />
            <h3>Task Management</h3>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            size='sm'
            className='d-flex'
          >
            <FontAwesomeIcon icon={faPlus} className='me-2' />
            Add New Task
          </Button>
        </div>

        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTask={handleAddTask}
        />

        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onUpdateStatus={handleUpdateStatus}
        />
      </MantineProvider>
    </div>
  );
};

export default App;
