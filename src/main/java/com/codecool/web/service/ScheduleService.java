package com.codecool.web.service;

import com.codecool.web.exceptions.EmptyFieldException;
import com.codecool.web.exceptions.ServiceException;
import com.codecool.web.model.Schedule;

import java.sql.SQLException;
import java.util.List;

public interface ScheduleService {
    Schedule getById(int id) throws SQLException, ServiceException;
    Schedule addSchedule(int userId,String name,int amountOfColumns) throws EmptyFieldException, ServiceException, SQLException;
    void editName(int id,String name) throws SQLException, ServiceException, EmptyFieldException;
    List<Schedule> getSchedulesByUserId(int userId) throws SQLException;
    void removeSchedule(int id) throws SQLException, ServiceException;
    int getColumnNumber(int id) throws SQLException;
}
