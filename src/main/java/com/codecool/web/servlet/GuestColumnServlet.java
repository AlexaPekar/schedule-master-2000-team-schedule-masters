package com.codecool.web.servlet;

import com.codecool.web.dao.ColumnDao;
import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.dao.SlotDao;
import com.codecool.web.dao.database.DatabaseColumnDao;
import com.codecool.web.dao.database.DatabaseScheduleDao;
import com.codecool.web.dao.database.DatabaseSlotDao;
import com.codecool.web.exceptions.NotFoundException;
import com.codecool.web.exceptions.ServiceException;
import com.codecool.web.service.ColumnService;
import com.codecool.web.service.ScheduleService;
import com.codecool.web.service.SlotService;
import com.codecool.web.service.simple.SimpleColumnService;
import com.codecool.web.service.simple.SimpleScheduleService;
import com.codecool.web.service.simple.SimpleSlotService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet("/column/slot")
public class GuestColumnServlet extends AbstractServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (Connection connection = getConnection(req.getServletContext())){
            ScheduleDao scheduleDao = new DatabaseScheduleDao(connection);
            ColumnDao columnDao = new DatabaseColumnDao(connection);
            SlotDao slotDao = new DatabaseSlotDao(connection);
            String columnId = req.getParameter("columnid");
            int scheduleId = Integer.parseInt("scheduleid");
            ScheduleService scheduleService = new SimpleScheduleService(scheduleDao,columnDao,slotDao);
            if(!scheduleService.isSchedulePublished(scheduleId)){
                return;
            }
           // ColumnService columnService = new SimpleColumnService(columnDao,scheduleDao);
            SlotService slotService = new SimpleSlotService(columnDao,slotDao);
            sendMessage(resp,HttpServletResponse.SC_OK,slotService.getSlotsByColumnID(columnId));


        } catch (SQLException e) {
            handleSqlError(resp,e);
        } catch (ServiceException e) {
            sendMessage(resp,HttpServletResponse.SC_BAD_REQUEST,e.getMessage());
        } catch (NotFoundException e) {
            sendMessage(resp,HttpServletResponse.SC_NOT_FOUND,e.getMessage());

        }
    }
}