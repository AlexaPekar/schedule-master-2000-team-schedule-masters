<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html lang="en">
<head>

    <title>Schedule Master 2001</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="index.js"></script>
    <script src="login.js"></script>
    <script src="logout.js"></script>
    <script src="profile.js"></script>
    <script src="schedules.js"></script>
    <script src="tasks.js"></script>
    <script src="columns.js"></script>
    <script src="slots.js"></script>
    <script src="users.js"></script>
    <script src="register.js"></script>
    <script src="guest.js"></script>
    <script src="userstask.js"></script>
    <script src="google.js"></script>
    <script src="usersschedule.js"></script>
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
    <meta name="google-signin-client_id"
          content="519766095912-ek3067b5drk7207plttlj6s9s4g2ivlr.apps.googleusercontent.com">
    <link rel="shortcut icon" type="image/png" href="calendar.png"/>


</head>

<body>
<div id="transparent-div">

    <div id="login-register-buttons" class="content">
        <nav class="menu">
            <table class="menubar">
                <tr>
                    <td>
                        <ul>
                            <li>
                                <p onclick="onLoginLightBoxLoad();" id="login-lightbox-button" class="menuitem">
                                    Login</p>
                            </li>
                            <li>
                                <p>•</p>
                            </li>
                            <li>
                                <p id="google-signin2"></p>
                            </li>
                            <li>
                                <p>•</p>
                            </li>
                            <li>
                                <p onclick="onRegisterLightBoxLoad();" id="register-lightbox-button" class="menuitem">
                                    Register</p>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </nav>
    </div>


    <p onclick="javascript:location.href='/schedule-masters'" id="home-button" class="hidden content" style="margin-left: -2.5em;">Home</p>


    <div id="login-lightbox" class="lightbox">
        <div id="login-content">
            <h1>Login</h1>
            <form id="login-form" onsubmit="return false;">
                <table id="loginform">
                    <tr>
                        <p>
                        <td>Username:</td>
                        <td><input type="text" name="name"></td>
                        </p>
                    </tr>
                    <tr>
                        <p>
                        <td>Password:</td>
                        <td><input type="password" name="password"></td>
                        </p>
                    </tr>
                </table>
                <button id="login-button">Login</button>
            </form>
        </div>
    </div>

    <div id="register-lightbox" class="lightbox">
        <div id="register-content">
            <h1>Register</h1>
            <form id="register-form" onsubmit="return false;">
                <table id="registerform">
                    <tr>
                <p><td>Username: </td><td><input type="text" name="name"></td></p>
                    </tr>
                    <tr>
                <p><td>Password: </td><td><input type="password" name="password"></td></p>
                    </tr>
                    <tr>
                <p><td>Password again: </td><td><input type="password" name="password-again"></td></p>
                    </tr>
                </table>
                <button id="register-button">Register</button>
            </form>
        </div>
    </div>


    <div id="menu" class="hidden content">
        <nav class="menu">
            <table class="menubar">
                <tr>
                    <td>
                        <ul>
                            <li>
                                <p id="schedules-button" class="menuitem">Schedules</p>
                            </li>
                            <li>
                                <p>•</p>
                            </li>
                            <li>
                                <p id="tasks-button" class="menuitem">Tasks</p>
                            </li>
                            <li>
                                <p>•</p>
                            </li>
                            <li>
                                <p id="users-button" class="menuitem">Users</p>
                            </li>
                            <li>
                                <p id="users-point">•</p>
                            </li>
                            <li>
                                <p class="menuitem" id="profile-button">Profile</p>
                                <ul>
                                    <li>
                                        <div id="profile-content" class="hidden content">
                                            <p class="menuitem" id="profile">Name: <span id="user-name"></span><br>
                                                Role: <span id="user-role"></span></p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>•</p>
                            </li>
                            <li>
                                <div id="logout-content" class="hidden content">
                                    <p id="logout-button" class="menuitem">Logout</p>
                                </div>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
            <br>
        </nav>
    </div>

    <div id="slider" class="content">
        <figure>
            <img src="./images/slider_2.jpg" alt>
            <img src="./images/slider_3.jpg" alt>
            <img src="./images/slider_4.jpg" alt>
            <img src="./images/slider_1.jpg" alt>
            <img src="./images/slider_2.jpg" alt>
        </figure>
    </div>

    <div id="schedules-content" class="hidden content">
        <h1>Schedules</h1>
        <button id="create-schedule-button" class="hidden content" onclick="onScheduleLightBoxLoad();"
                style="cursor: pointer;">Create schedule
        </button>
        <div id="schedules" class="hidden content" class="center-table">

        </div>
        <div id="schedule-lightbox" class="lightbox">
            <form id="schedule-form" onsubmit="return false;">
                <p>Schedule name:</p>
                <input type="text" name="name">
                <p>Number of columns:</p>
                <select id="amountofcolumns" style="cursor: pointer;">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <button onclick="onScheduleAddClicked();" style="cursor: pointer;">Add new Schedule</button>
            </form>
        </div>
        <div id="scheduleupdate-lightbox" class="lightbox">
            <form id="scheduleupdate-form" onsubmit="return false;">
                <p>Schedule name:</p>
                <input type="text" name="name" id="schedule-name">
                <br>
                <img id="savebutton" src="icons/save-button.png" onclick="onScheduleSaveClicked()"
                     style="cursor: pointer;">
            </form>
        </div>
        <div id="scheduleshare-lightbox" class="lightbox">
        </div>
    </div>

    <div id="schedule-content" class="hidden content">
        <h1 id="schedule-title">Title</h1>
        <div id="schedule" class="hidden content" class="center-table">

        </div>
    </div>

    <div id="tasks-content" class="hidden content">
        <h1>Tasks</h1>
        <button id="create-task-button" class="hidden content" onclick="onTaskLightBoxLoad();" style="cursor: pointer;">
            Create task
        </button>
        <div id="tasks" class="hidden content" class="center-table">

        </div>

        <div id="task-lightbox" class="lightbox">
            <form id="task-form" onsubmit="return false;">
                <p>Task name:</p>
                <input type="text" name="name">
                <p>Task content:</p>
                <textarea name="content"></textarea>
                <button onclick="onTaskAddClicked();" style="cursor: pointer;">Add new Task</button>
            </form>
        </div>
    </div>

    <div id="task-content" class="hidden content">
        <div id="task" class="hidden content" class="center-table">

        </div>
        <button id="open-tasks-button" class="hidden content" style="cursor: pointer;">Go to tasks</button>
        <button id="open-schedule-button" class="hidden content" style="cursor: pointer;">Go to schedule</button>
    </div>

    <div id="users-content" class="hidden content">
        <h1>Users</h1>
        <div id="users" class="hidden content" class="center-table">

        </div>
    </div>

    <div id="user-content" class="hidden content">
        <h1>User info</h1>
        <div id="user" class="hidden content" class="center-table">

        </div>
        <button id="user-schedules-button" style="cursor: pointer;">Schedule</button>
        <button id="user-tasks-button" style="cursor: pointer;">Tasks</button>
        <br>
        <button id="users-goback-button" style="cursor: pointer;">Go back</button>
    </div>

    <div id="slot-lightbox" class="lightbox">
        <form id="slot-form" onsubmit="return false;">

        </form>
        <img id="slotsavebutton" src="icons/save-button.png" onclick="onSlotSaveClicked()" style="cursor: pointer;">
    </div>

    <div id="guest-schedule">

    </div>
</div>

</body>
</html>
