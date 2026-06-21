package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.AdminDashboardDTO;
import com.examly.springapp.dto.StudentDashboard;
import com.examly.springapp.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/student/{studentId}/{departmentId}")
    public StudentDashboard dashboard(
            @PathVariable Long studentId,
            @PathVariable Long departmentId){

        return dashboardService.getDashboard(studentId, departmentId);
    }

    @GetMapping("/admin")
    public AdminDashboardDTO adminDashboard() {
        return dashboardService.getAdminDashboard();
    }
}