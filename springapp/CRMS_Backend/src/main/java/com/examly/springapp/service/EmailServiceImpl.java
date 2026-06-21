package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendLoginNotification(String to, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("New Login Detected - Zyqentra");
        message.setText("Hello " + username + ",\n\nWe detected a new login to your Zyqentra account. If this wasn't you, please reset your password immediately.\n\nBest regards,\nZyqentra Team");
        mailSender.send(message);
    }

    @Override
    public void sendApplicationStatusNotification(String to, String username, String positionTitle, String status) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Application Status Update - Zyqentra");
        message.setText("Hello " + username + ",\n\nYour application for the position '" + positionTitle + "' has been updated to: " + status + ".\n\nCheck your dashboard for more details.\n\nBest regards,\nZyqentra Team");
        mailSender.send(message);
    }

    @Override
    public void sendPasswordResetEmail(String to, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request - Zyqentra");
        message.setText("Hello,\n\nYou requested to reset your password. Please click the link below to set a new password:\n\n" + resetLink + "\n\nThis link will expire in 1 hour.\n\nBest regards,\nZyqentra Team");
        mailSender.send(message);
    }
}
