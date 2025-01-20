import { expect } from "chai";
import hre from "hardhat";

const { ethers }: any = hre;

describe("TaskManager Contract", () => {
  it("Should add a task and retrieve it", async () => {
    const TaskManager = await ethers.getContractFactory("TaskManager");
    const taskManager = await TaskManager.deploy();
    await taskManager.deployed();

    const taskData = "Test Task";
    await taskManager.addTask(taskData);

    const tasks = await taskManager.getTasks();
    expect(tasks.length).to.equal(1);
    expect(tasks[0].taskHash).to.equal(
      ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(["string"], [taskData])
      )
    );
    expect(tasks[0].isCompleted).to.be.false;
  });

  it("Should complete a task", async () => {
    const TaskManager = await ethers.getContractFactory("TaskManager");
    const taskManager = await TaskManager.deploy();
    await taskManager.deployed();

    await taskManager.addTask("Test Task");
    await taskManager.completeTask(0);

    const tasks = await taskManager.getTasks();
    expect(tasks[0].isCompleted).to.be.true;
  });
});
