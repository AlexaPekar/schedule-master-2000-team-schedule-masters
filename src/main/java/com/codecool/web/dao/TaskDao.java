package com.codecool.web.dao;

import com.codecool.web.exceptions.EmptyFieldException;
import com.codecool.web.exceptions.NotFoundException;
import com.codecool.web.model.Task;

import java.sql.SQLException;
import java.util.List;

public interface TaskDao {

    Task insertNewTask(int userId, String name, String content) throws SQLException;
    void deleteTask(int id) throws SQLException;
    void updateTaskName(int id, String name) throws SQLException, EmptyFieldException;
    void updateContent(int id, String content) throws SQLException, EmptyFieldException;
    Task findTaskById(int id) throws SQLException, NotFoundException;
    List<Task> findAllTaskByUserId(int id) throws SQLException;
    void insertTaskIdToScheduleId(int taskId, int scheduleId) throws SQLException;
    int findTaskIdBySlotId(int slotId) throws SQLException;
}
