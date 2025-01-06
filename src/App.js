import React from "react";
import { MantineProvider } from "@mantine/core";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskList from "./components/TaskList";
import "@mantine/core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTaskModal from "./components/AddTaskModal";

const App = () => {
  return (
    <MantineProvider>
      <Router>
        <div className="card p-4">
          <div className="card-toolbar d-flex align-items-center mb-3">
            <div className="d-flex">
              <img src="./watch.svg" alt="logo" className="me-2" />
              <h3>Task Management</h3>
            </div>
          </div>

          <Routes>
            <Route
              path="/"
              element={<Navigate to="/Task_Management/add-task" replace />}
            />

            <Route
              path="/Task_Management"
              element={<Navigate to="/Task_Management/add-task" replace />}
            />
            <Route
              path="/Task_Management/add-task"
              element={<AddTaskModal />}
            />
            <Route path="/Task_Management/task-list" element={<TaskList />} />

            <Route
              path="*"
              element={<Navigate to="/Task_Management/add-task" replace />}
            />
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  );
};

export default App;
