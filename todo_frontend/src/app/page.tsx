"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import web3 from "./utils/web3";
import contract, { addTask as createTaskOnBlockchain } from "./utils/contract";
import Header from "./component/Header";
import TaskList from "./component/TaskList";
import AnalyticsChart from "./component/AnalyticsChart";

interface Task {
  _id: string;
  title: string;
  isComplete: boolean;
  blockchainId?: number;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchTasks(token);
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchTasks = async (token: string) => {
    try {
      const response = await axios.get<Task[]>(
        "http://localhost:5000/api/tasks",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const blockchainTasks = await fetchBlockchainTasks();

      const mergedTasks = response.data.map((task) => {
        const blockchainTask = blockchainTasks.find(
          (bt: any) => bt.id === task.blockchainId
        );
        return {
          ...task,
          blockchainId: blockchainTask?.id || undefined,
          isComplete: blockchainTask?.isComplete ?? task.isComplete,
        };
      });

      setTasks(mergedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const fetchBlockchainTasks = async () => {
    try {
      const account = await getAccount();
      const tasks: any[] = await contract.methods
        .getTasks()
        .call({ from: account });
      console.log("Raw tasks from blockchain:", tasks);
      if (!Array.isArray(tasks)) {
        console.error("Unexpected response format from getTasks:", tasks);
        return [];
      }

      const blockchainTasks = tasks.map((task: any, index: number) => ({
        id: index,
        title: task.description,
        isComplete: task.isCompleted,
      }));

      return blockchainTasks;
    } catch (error) {
      console.error("Failed to fetch blockchain tasks", error);
      return [];
    }
  };

  const createTask = async (title: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post<Task>(
        "http://localhost:5000/api/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (token) {
        await createTaskOnBlockchain(title);
        fetchTasks(token);
      }
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  const updateTask = async (
    id: string,
    newTitle: string,
    isComplete: boolean
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put<Task>(
        `http://localhost:5000/api/tasks/${id}`,
        { title: newTitle, isComplete },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const blockchainId = tasks.find((t) => t._id === id)?.blockchainId;
      if (blockchainId !== undefined && isComplete) {
        await contract.methods
          .completeTask(blockchainId)
          .send({ from: await getAccount() });
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data : task))
      );
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const taskToDelete = tasks.find((t) => t._id === id);
      if (!taskToDelete) {
        throw new Error("Task not found");
      }

      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (taskToDelete.blockchainId !== undefined) {
        await contract.methods
          .deleteTask(taskToDelete.blockchainId)
          .send({ from: await getAccount() });
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const toggleTask = (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      updateTask(id, task.title, !task.isComplete);
    }
  };

  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  };

  const completedTasks = tasks.filter((task) => task.isComplete).length;
  const pendingTasks = tasks.length - completedTasks;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={(id, newTitle) => updateTask(id, newTitle, false)}
            onCreate={createTask}
          />
          <AnalyticsChart completed={completedTasks} pending={pendingTasks} />
        </div>
      </main>
    </div>
  );
};

export default Home;
