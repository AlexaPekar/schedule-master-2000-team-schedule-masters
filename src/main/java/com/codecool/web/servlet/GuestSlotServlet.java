package com.codecool.web.servlet;

import com.codecool.web.dao.ColumnDao;
import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.dao.SlotDao;
import com.codecool.web.dao.TaskDao;
import com.codecool.web.dao.database.DatabaseColumnDao;
import com.codecool.web.dao.database.DatabaseScheduleDao;
import com.codecool.web.dao.database.DatabaseSlotDao;
import com.codecool.web.dao.database.DatabaseTaskDao;
import com.codecool.web.dto.TaskDto;
import com.codecool.web.exceptions.NotFoundException;
import com.codecool.web.exceptions.ServiceException;
import com.codecool.web.service.ScheduleService;
import com.codecool.web.service.SlotService;
import com.codecool.web.service.TaskService;
import com.codecool.web.service.simple.SimpleScheduleService;
import com.codecool.web.service.simple.SimpleSlotService;
import com.codecool.web.service.simple.SimpleTaskService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;


@WebServlet("/slot/task")
public class GuestSlotServlet extends AbstractServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (Connection connection = getConnection(req.getServletContext())){
            ScheduleDao scheduleDao = new DatabaseScheduleDao(connection);
            ColumnDao columnDao = new DatabaseColumnDao(connection);
            SlotDao slotDao = new DatabaseSlotDao(connection);
            TaskDao taskDao = new DatabaseTaskDao(connection);
            String slotId = req.getParameter("slotid");
            ScheduleService scheduleService = new SimpleScheduleService(scheduleDao,columnDao,slotDao);
            TaskService taskService = new SimpleTaskService(taskDao);
            String scheduleIdString = req.getParameter("scheduleid");
            int scheduleId = scheduleService.decrypt(scheduleIdString);
            if(!scheduleService.isSchedulePublished(scheduleId)){
                sendMessage(resp,HttpServletResponse.SC_FORBIDDEN,"Schedule isn't public.");
                return;
            }
            if(taskService.getTaskIdBySlotId(slotId) != 0) {
                TaskDto taskDto = new TaskDto(Integer.parseInt(slotId),taskService.getTaskById(taskService.getTaskIdBySlotId(slotId)));
                sendMessage(resp, HttpServletResponse.SC_OK,taskDto );
            }


        } catch (SQLException e) {
            handleSqlError(resp,e);
        } catch (ServiceException e) {
            sendMessage(resp,HttpServletResponse.SC_BAD_REQUEST,e.getMessage());
        } catch (NotFoundException e) {
            sendMessage(resp,HttpServletResponse.SC_NOT_FOUND,e.getMessage());
        }
    }
}
