import { faCancel } from "@fortawesome/free-solid-svg-icons/faCancel";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons/faXmarkCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, TextInput, Select } from "@mantine/core";
import { useState } from "react";
import Swal from "sweetalert2";

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
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
        text: "Please enter Assignee Name.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    } else if (status.trim() === "") {
      Swal.fire({
        text: "Please select a Status.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    onAddTask({
      id: Date.now(),
      taskName: task,
      status: status,
      name: name,
    });
    setTask("");
    setStatus("");
    setName("");
  };

  return (
    <Modal
      opened={isOpen}
      onClose={() => null}
      withCloseButton={false}
      size="30rem"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{
        transition: "fade",
        duration: 400,
        timingFunction: "linear",
      }}
    >
      <Modal.Header className="d-flex justify-content-between border-bottom mb-3 py-0">
        <Modal.Title>
          <div className="fw-bold fs-4">Add New Task </div>
        </Modal.Title>
        <button
          className="btn"
          onClick={() => {
            onClose();
            setStatus("");
            setTask("");
            setName("");
          }}
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
      </Modal.Header>
      <Modal.Body className="border-bottom mb-2">
        <div className="">
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
      </Modal.Body>
      <div className="d-flex justify-content-end gap-3">
        <Button color="gray" onClick={onClose} className="p-2">
          <FontAwesomeIcon icon={faXmarkCircle} className="me-2" />
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit} className="p-2">
          <FontAwesomeIcon icon={faSave} className="me-2" /> Save
        </Button>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
