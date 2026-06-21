package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.AdminDashboardDTO;
import com.examly.springapp.dto.StudentDashboard;
import com.examly.springapp.model.JobApplication;
import com.examly.springapp.model.JobOpening;
import com.examly.springapp.model.InterviewFeedback;
import com.examly.springapp.repository.JobApplicationRepository;
import com.examly.springapp.repository.JobOpeningRepository;
import com.examly.springapp.repository.InterviewFeedbackRepository;
import com.examly.springapp.repository.DepartmentRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.repository.JobPositionRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private JobOpeningRepository jobOpeningRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private InterviewFeedbackRepository feedbackRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobPositionRepository jobPositionRepository;

    public StudentDashboard getDashboard(Long studentId, Long departmentId){

        StudentDashboard dashboard = new StudentDashboard();

        // Eligible jobs for student's department
        List<JobOpening> eligibleJobs = jobOpeningRepository.findAll().stream()
                .filter(job -> departmentId == null || departmentId == 0 || job.getEligibleDepartments().stream()
                        .anyMatch(dept -> dept.getDepartmentId().equals(departmentId)))
                .collect(Collectors.toList());

        // Jobs applied by student
        List<JobApplication> appliedJobs = jobApplicationRepository.findAll().stream()
                .filter(app -> app.getCandidate().getUserId().equals(studentId))
                .collect(Collectors.toList());

        // Feedbacks for student's applications
        List<InterviewFeedback> feedbacks = feedbackRepository.findAll().stream()
                .filter(f -> f.getJobApplication().getCandidate().getUserId().equals(studentId))
                .collect(Collectors.toList());

        dashboard.setEligibleJobs(eligibleJobs);
        dashboard.setAppliedJobs(appliedJobs);
        dashboard.setFeedbacks(feedbacks);

        return dashboard;
    }

    public AdminDashboardDTO getAdminDashboard() {
        AdminDashboardDTO dto = new AdminDashboardDTO();
        dto.setTotalDepartments(departmentRepository.count());
        dto.setTotalJobs(jobPositionRepository.count());
        dto.setTotalApplications(jobApplicationRepository.count());
        dto.setTotalUsers(userRepository.count());
        
        // Get last 5 applications
        List<JobApplication> allApps = jobApplicationRepository.findAll();
        dto.setRecentApplications(allApps.stream()
            .sorted((a, b) -> b.getApplicationId().compareTo(a.getApplicationId()))
            .limit(5)
            .collect(Collectors.toList()));
            
        return dto;
    }
}