package com.examly.springapp.service;

public interface EmailService {
    void sendLoginNotification(String to, String username);
    void sendApplicationStatusNotification(String to, String username, String positionTitle, String status);
    void sendPasswordResetEmail(String to, String resetLink);
}
