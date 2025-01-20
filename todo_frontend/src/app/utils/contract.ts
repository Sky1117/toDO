import Web3 from "web3";
import TaskManagerABI from "./TaskManagerABI.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contract = new web3.eth.Contract(
  TaskManagerABI.abi as any,
  CONTRACT_ADDRESS
);

export const addTask = async (description: string) => {
  const accounts = await web3.eth.getAccounts();
  if (!accounts || accounts.length === 0) {
    throw new Error(
      "No Ethereum accounts available. Please connect your wallet."
    );
  }

  const fromAddress = accounts[0];
  return await contract.methods
    .addTask(description)
    .send({ from: fromAddress });
};

export const completeTask = async (taskId: number) => {
  const accounts = await web3.eth.getAccounts();
  if (!accounts || accounts.length === 0) {
    throw new Error(
      "No Ethereum accounts available. Please connect your wallet."
    );
  }

  const fromAddress = accounts[0];
  return await contract.methods
    .completeTask(taskId)
    .send({ from: fromAddress });
};
export const deleteTask = async (taskId: number) => {
  const accounts = await web3.eth.getAccounts();
  if (!accounts || accounts.length === 0) {
    throw new Error(
      "No Ethereum accounts available. Please connect your wallet."
    );
  }

  console.log("deleted");
  const fromAddress = accounts[0];
  return await contract.methods.deleteTask(taskId).send({ from: fromAddress });
};

export const fetchTasks = async () => {
  const accounts = await web3.eth.getAccounts();
  if (!accounts || accounts.length === 0) {
    throw new Error(
      "No Ethereum accounts available. Please connect your wallet."
    );
  }

  const fromAddress = accounts[0];
  const tasks = await contract.methods.getTasks().call({ from: fromAddress });

  if (!Array.isArray(tasks)) {
    throw new Error("Invalid data returned from getTasks method");
  }

  return tasks.map((task: any, index: number) => ({
    id: index,
    description: task.description,
    isComplete: task.isCompleted,
  }));
};

export default contract;
