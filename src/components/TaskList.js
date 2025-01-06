import React, { useState, useEffect } from "react";
import { Badge, Select, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const handleUpdateStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="card shadow-sm border">
      <div
        className="card-title fw-bolder text-white fs-5 py-2 border-bottom text-center mb-3"
        style={{
          backgroundColor: "#26448C",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center px-4">
          <span>ALL TASKS</span>
          <Button
            variant="outline"
            color="white"
            onClick={() => navigate("/Task_Management/add-task")}
            className="d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add New Task
          </Button>
        </div>
      </div>

      <div className="card-body py-1">
        <div className="table-responsive align-items-center">
          {tasks.length > 0 ? (
            <table className="table align-middle gy-3 table-hover table-row-dashed">
              <thead className="bg-light">
                <tr className="bg-light">
                  <th className="fw-bolder text-uppercase text-muted">
                    Sr No.
                  </th>
                  <th className="fw-bolder text-uppercase text-muted">
                    Task Name
                  </th>
                  <th className="fw-bolder text-uppercase text-muted">
                    Assignee Name
                  </th>
                  <th className="fw-bolder text-uppercase text-muted">
                    Status
                  </th>
                  <th className="fw-bolder text-uppercase text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td>{index + 1}</td>
                    <td
                      style={{
                        textDecoration:
                          task.status === "Completed" ? "line-through" : "none",
                        fontSize: "16px",
                      }}
                    >
                      {task.taskName}
                    </td>
                    <td>{task.name}</td>
                    <td>
                      <Badge
                        color={
                          task.status === "In_Progress"
                            ? "indigo"
                            : task.status === "Pending"
                            ? "yellow"
                            : "green"
                        }
                        variant="outline"
                      >
                        {task.status === "In_Progress"
                          ? "In Progress"
                          : task.status === "Pending"
                          ? "Pending"
                          : "Completed"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-3">
                        <Select
                          value={task.status}
                          onChange={(newStatus) =>
                            handleUpdateStatus(task.id, newStatus)
                          }
                          data={[
                            { label: "In Progress", value: "In_Progress" },
                            { label: "Pending", value: "Pending" },
                            { label: "Completed", value: "Completed" },
                          ]}
                          disabled={task.status === "Completed"}
                          style={{ width: 120 }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div className="text-center fs-5 fw-bold mb-4">
                No tasks available
              </div>
              <div className="d-flex justify-content-center">
                <img
                  src="./eventsNotFound.svg"
                  alt="No tasks"
                  style={{ width: "70vh" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
