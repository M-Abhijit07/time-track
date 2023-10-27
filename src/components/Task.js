import React, { useEffect, useState } from "react";

import { BsCircleFill } from "react-icons/bs";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
  AiOutlineCiCircle,
  AiOutlinePlayCircle,
  AiOutlinePauseCircle, 
  AiOutlineReload
} from "react-icons/ai";

function Task({task}) {
  //-------------
  //Local States
  //-------------
  const [localTask, setLocalTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState(localTask.task);

  //Handle Edit
  const handleEdit = () => {
    isEditing = true;
  };
  //Handle Edit
  const handleCancelEdit = () => {
    setIsEditing = false;
    setNewTaskDescription(localTask.task);
  };

  //Handle Edit
  const handleUpdate = () => {
  };

  //Handle render Task Description
  const handleRenderTaskDescription = () => {};

  //Handle start
  const handleStart = () => {};

  //Handle pause
  const handlePause = () => {};

  //Handle delete
  const handleDelete = () => {};

  //Handle render buttons
  const handleRenderButtons = () => {
    switch(localTask.status){
      case 'unstarted':
        return (
          <AiOutlinePlayCircle className='text-2xl text-purple-400' onClick={handleStart} />
        )

      case 'in_progress':
        return (
          <AiOutlinePauseCircle className='text-2xl text-green-400' onClick={handlePause} />
        )

      default:
        case "unstarted":
        return (
          <AiOutlineReload className='text-2xl text-green-400' onClick={handleStart} />
        )
    }
  };

  return (
    <div className="bg-white p-4 rounded-md text-black shadow-lg flex flex-col md:flex-row md:items-center justify-between">
      <div className="md:space-x-2 space-y-2 md:space-y-0">
        {/* render buttons */}
        <div className="flex items-center space-x-2">
          <AiOutlineCalendar className="text-gray-600" />
          <p className="text-gray-600">{task.task}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 justify-center">
        <BsCircleFill />
        <p>status</p>
      </div>
      <div className="flex items-center space-x-2 justify-center md:justify-end">
        {/* Render buttons */}
        {handleRenderButtons()}
        <AiOutlineEdit className="text-2xl text-purple-400" />
        <AiOutlineDelete className="text-2xl text-red-500" />
      </div>
    </div>
  );
}

export default Task;
