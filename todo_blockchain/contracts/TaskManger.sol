// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        uint256 id;
        string description;
        bool isCompleted;
    }

    mapping(address => Task[]) private userTasks;

    event TaskAdded(address indexed user, uint256 taskId, string description);
    event TaskUpdated(address indexed user, uint256 taskId, string description, bool isCompleted);
    event TaskDeleted(address indexed user, uint256 taskId);
    event TaskCompleted(address indexed user, uint256 taskId);

    /**
     * @dev Add a new task for the user.
     * @param description The description of the task to be stored.
     */
    function addTask(string memory description) public {
        uint256 taskId = userTasks[msg.sender].length;
        userTasks[msg.sender].push(Task(taskId, description, false));
        emit TaskAdded(msg.sender, taskId, description);
    }

    /**
     * @dev Update a task's details.
     * @param taskId The ID of the task to update.
     * @param description The new description of the task.
     * @param isCompleted The new completion status of the task.
     */
    function updateTask(uint256 taskId, string memory description, bool isCompleted) public {
        require(taskId < userTasks[msg.sender].length, "Invalid Task ID");
        Task storage task = userTasks[msg.sender][taskId];
        task.description = description;
        task.isCompleted = isCompleted;
        emit TaskUpdated(msg.sender, taskId, description, isCompleted);
    }

    /**
     * @dev Delete a task by its ID.
     * @param taskId The ID of the task to delete.
     */
    function deleteTask(uint256 taskId) public {
        require(taskId < userTasks[msg.sender].length, "Invalid Task ID");

        uint256 lastIndex = userTasks[msg.sender].length - 1;

        // If the task to delete is not the last one, swap it with the last
        if (taskId != lastIndex) {
            userTasks[msg.sender][taskId] = userTasks[msg.sender][lastIndex];
            userTasks[msg.sender][taskId].id = taskId; // Update the ID to maintain consistency
        }

        // Remove the last task (now duplicated)
        userTasks[msg.sender].pop();
        emit TaskDeleted(msg.sender, taskId);
    }

    /**
     * @dev Mark a task as completed by its ID.
     * @param taskId The ID of the task to mark as completed.
     */
    function completeTask(uint256 taskId) public {
        require(taskId < userTasks[msg.sender].length, "Invalid Task ID");
        userTasks[msg.sender][taskId].isCompleted = true;
        emit TaskCompleted(msg.sender, taskId);
    }

    /**
     * @dev Get all tasks for the caller.
     * @return tasks Array of all tasks with their details.
     */
    function getTasks() public view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
}
