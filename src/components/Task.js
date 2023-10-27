import React, { useEffect, useState } from "react";
import { getFirestore,updateDoc, onSnapshot, doc } from "firebase/firestore";
import { BsCircleFill } from "react-icons/bs";
import { format } from 'date-fns';
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
  AiOutlineCiCircle,
  AiOutlinePlayCircle,
  AiOutlinePauseCircle, 
  AiOutlineReload
} from "react-icons/ai";
import app from "../firebase/config";

//Instatnce of FireStore
const db = getFirestore(app);

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
  const handleStart = async () => {
    try {
      await updateDoc(doc(db, 'tasks', localTask.id),{
        status: 'in_progress',
        startTime: Date.now(),
      });
      const taskDoc = doc(db, 'tasks', localTask.id);
      onSnapshot(taskDoc, (docSnap)=>{
        if(docSnap.exists()){
          setLocalTask({
            ...docSnap.data(),
            date: localTask.date,
            id: localTask.id
          })
        }
      })
    } catch (error) {
      console.log('Error starting task: ', error);
    }
  };

  //Handle pause
  const handlePause = async () => {
    try {
      const elapsed = localTask.startTime ? Date.now() - localTask.startTime : 0;
      const newTotalTime = (localTask.totalTime || 0) + elapsed;
      await updateDoc(doc(db, 'tasks', localTask.id), {
        status : 'paused',
        endTime : Date.now(),
        totalTime : newTotalTime,
      });
      const taskDoc = doc(db, 'tasks', localTask.id);
      onSnapshot(taskDoc, (docSnap)=>{
        if(docSnap.exists()) {
          setLocalTask({
          ...docSnap.data(),
            date: localTask.date,
            id: localTask.id
          });
        }
      });
    } catch (error) {
      console.log('Error in pausing task: ',error);
    }
  };

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
        {/* render description */}
        <div className="flex items-center space-x-2">
          <AiOutlineCalendar className="text-gray-600" />
          <p className="text-gray-600">{
            format(new Date(localTask.date), 'dd/MM/yyyy')
          }</p>
          <p className="text-gray-600">{task.task}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 justify-center">
        <BsCircleFill color={
          localTask.status === 'paused' ? 'red' : localTask.status === 'in_progress' ? 'green' : 'yellow'
        }/>
        <p>{localTask.status}</p>
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
