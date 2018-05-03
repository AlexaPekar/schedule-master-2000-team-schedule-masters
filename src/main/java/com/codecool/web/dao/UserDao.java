package com.codecool.web.dao;


import com.codecool.web.exceptions.NotFoundException;
import com.codecool.web.model.User;

import java.sql.SQLException;

public interface UserDao {

    User findByName(String name) throws SQLException, NotFoundException;
    User insertNewUser(String name, String password, String role) throws SQLException;

}
