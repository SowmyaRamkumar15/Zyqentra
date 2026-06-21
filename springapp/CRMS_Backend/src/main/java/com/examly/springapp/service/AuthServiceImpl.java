package com.examly.springapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.dto.LoginResponse;
import com.examly.springapp.enums.Role;
import com.examly.springapp.exception.BadRequestException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.repository.PasswordResetTokenRepository;
import com.examly.springapp.model.PasswordResetToken;
import com.examly.springapp.security.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    private final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Override
    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new BadRequestException("Email is already in use");
        }

        // Email validation: must end with @gmail.com
        if (!user.getEmail().toLowerCase().endsWith("@gmail.com")) {
            throw new BadRequestException("Email must be a @gmail.com address");
        }

        // Password complexity validation
        String password = user.getPassword();
        if (password.length() < 8 || 
            !password.matches(".*[A-Za-z].*") || 
            !password.matches(".*\\d.*") || 
            !password.matches(".*[!@#$%^&*()].*")) {
            throw new BadRequestException("Password must be at least 8 characters long and contain alphabets, numbers, and special characters");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getRole() == null){
            user.setRole(Role.ROLE_STUDENT);
        }
        logger.info("Registering user: {}", user.getEmail());
        return userRepository.save(user);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if(userOpt.isEmpty()){
            logger.warn("Login failed: User not found {}", request.getEmail());
            throw new ResourceNotFoundException("User not found with email: " + request.getEmail());
        }

        User user = userOpt.get();

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            logger.warn("Login failed: Invalid password for {}", request.getEmail());
            throw new BadRequestException("Invalid password");
        }

        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name(), user.getUserId(), user.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        logger.info("User logged in: {}", request.getEmail());

        // Send login notification
        try {
            emailService.sendLoginNotification(user.getEmail(), user.getUsername());
        } catch (Exception e) {
            logger.error("Failed to send login notification: {}", e.getMessage());
        }

        return new LoginResponse(accessToken, refreshToken);
    }

    @Override
    public String refreshToken(String refreshToken) {
        String email = jwtUtil.getEmailFromToken(refreshToken);
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isEmpty()){
            throw new BadRequestException("Invalid refresh token");
        }
        User user = userOpt.get();
        return jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name(), user.getUserId(), user.getUsername());
    }

    @Override
    public void initiatePasswordReset(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = java.util.UUID.randomUUID().toString();
            
            // Delete existing tokens if any
            tokenRepository.findByUser(user).ifPresent(tokenRepository::delete);
            
            PasswordResetToken resetToken = new PasswordResetToken(token, user);
            tokenRepository.save(resetToken);
            
            String resetLink = "http://localhost:5173/reset-password?token=" + token;
            emailService.sendPasswordResetEmail(user.getEmail(), resetLink);
        }
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public void resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty() || tokenOpt.get().isExpired()) {
            throw new BadRequestException("Invalid or expired password reset token");
        }
        
        PasswordResetToken resetToken = tokenOpt.get();
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        tokenRepository.delete(resetToken);
    }
}