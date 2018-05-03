package com.codecool.web.dao;

import com.codecool.web.exceptions.EmptyFieldException;
import com.codecool.web.model.Schedule;

import java.sql.SQLException;
import java.util.List;

public interface ScheduleDao {

    Schedule findById(int id) throws SQLException;
    Schedule insertSchedule(int userId,String name) throws SQLException;
    void updateName(int id,String name) throws SQLException, EmptyFieldException;
    List<Schedule> findSchedulesByUserId(int userId) throws SQLException;
    void deleteSchedule(int id) throws SQLException;
}
