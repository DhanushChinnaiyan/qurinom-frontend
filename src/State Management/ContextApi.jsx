import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const commonContext = createContext();
export const useCommonContext = () => useContext(commonContext);

const ContextApi = ({ children }) => {
  // Task datas
  const [data, setData] = useState({
    "to do": [],
    inProgress: [],
    completed: [],
  });

  //   loading state for handle circular progress bar while executing getData deleteTask function
  const [loading, setLoading] = useState(true);

  const commonApiURL = "https://qurinom-backend.onrender.com/card";
  //   Fetchin functions
  const getData = async () => {
    try {
      const response = await axios.get(`${commonApiURL}/get`, {
        headers: {
          "x-auth-user": localStorage.getItem("userToken"),
        },
      });
      const data = response.data;
      //   Set data
      setData({
        "to do": data.filter((item) => item.status === "to do"),
        inProgress: data.filter((item) => item.status === "inProgress"),
        completed: data.filter((item) => item.status === "completed"),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask, setLoading) => {
    try {
      setLoading(true);
      const response = await axios.post(`${commonApiURL}/create`, newTask, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-user": localStorage.getItem("userToken"),
        },
      });
      const newData = response.data.card;
      //  add new data in state
      setData({
        ...data,
        [newData.status]: [...data[newData.status], newData],
      });
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (item, updatedTask, setLoading) => {
    try {
      setLoading(true);

      const response = await axios.patch(
        `${commonApiURL}/edit/${item._id}`,
        updatedTask,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-user": localStorage.getItem("userToken"),
          },
        }
      );
      const updatedData = response.data.card;

      //   check if status changed or not if changed remove from previous status and update to new status
      setData((prevData) => {
        const newData = { ...prevData };

        if (item.status !== updatedData.status) {
          console.log("a");
          // Remove the updated task from its previous status
          newData[item.status] = newData[item.status].filter(
            (task) => task._id !== updatedData._id
          );

          // Add the updated task to its new status
          newData[updatedData.status] = [
            ...newData[updatedData.status],
            updatedData,
          ];
        } else {
          // If only title or description is updated, update the task data
          newData[item.status] = newData[item.status].map((task) =>
            task._id === updatedData._id ? updatedData : task
          );
        }

        return newData;
      });
    } catch (error) {
      console.error("Error editing task:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${commonApiURL}/delete/${taskId}`, {
        headers: {
          "x-auth-user": localStorage.getItem("userToken"),
        },
      });

      const deletedData = response.data.deletedCard;

      //   Delete data from state
      setData({
        ...data,
        [deletedData.status]: data[deletedData.status].filter(
          (task) => task._id !== deletedData._id
        ),
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  const value = {
    data,
    setData,
    loading,
    getData,
    addTask,
    editTask,
    deleteTask,
  };
  return (
    <commonContext.Provider value={value}>{children}</commonContext.Provider>
  );
};

export default ContextApi;
