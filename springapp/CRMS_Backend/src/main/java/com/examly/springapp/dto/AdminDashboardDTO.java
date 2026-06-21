package com.examly.springapp.dto;

import lombok.Data;
import java.util.List;
import com.examly.springapp.model.JobApplication;

@Data
public class AdminDashboardDTO {
    private long totalDepartments;
    private long totalJobs;
    private long totalApplications;
    private long totalUsers;
    private List<JobApplication> recentApplications;
}
