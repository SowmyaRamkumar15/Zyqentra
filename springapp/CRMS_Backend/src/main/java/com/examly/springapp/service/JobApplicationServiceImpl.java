package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.JobApplication;
import com.examly.springapp.model.JobPosition;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.JobApplicationRepository;
import com.examly.springapp.repository.JobPositionRepository;
import com.examly.springapp.repository.UserRepository;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    @Autowired
    private JobApplicationRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobPositionRepository jobPositionRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public JobApplication create(JobApplication jobApplication) {

        if (repository.existsByCandidate_UserIdAndJobPosition_PositionId(
                jobApplication.getCandidate().getUserId(), 
                jobApplication.getJobPosition().getPositionId())) {
            throw new RuntimeException("You have already applied for this position.");
        }

        Optional<User> candidateOpt = userRepository.findById(jobApplication.getCandidate().getUserId());
        candidateOpt.ifPresent(jobApplication::setCandidate);

        Optional<JobPosition> jobPositionOpt = jobPositionRepository.findById(jobApplication.getJobPosition().getPositionId());
        jobPositionOpt.ifPresent(jobApplication::setJobPosition);

        return repository.save(jobApplication);
    }

    @Override
    public List<JobApplication> read() {
        return repository.findAll();
    }

    @Override
    public Optional<JobApplication> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public JobApplication update(JobApplication jobApplication) {
        JobApplication updated = repository.save(jobApplication);
        
        // Send notification
        try {
            if (updated.getCandidate() != null && updated.getJobPosition() != null) {
                emailService.sendApplicationStatusNotification(
                    updated.getCandidate().getEmail(),
                    updated.getCandidate().getUsername(),
                    updated.getJobPosition().getPositionTitle(),
                    updated.getStatus()
                );
            }
        } catch (Exception e) {
            // Log error but don't fail the update
            System.err.println("Failed to send application status notification: " + e.getMessage());
        }
        
        return updated;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}