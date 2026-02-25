package com.Grocery.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    // -------- CONTACT FORM SUBMIT --------
    @PostMapping("/contact")
    public String submitContactForm(@RequestParam String name,
                                    @RequestParam String email,
                                    @RequestParam String message) {

        try {

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo("your_email@gmail.com"); // change this
            mailMessage.setSubject("New Contact Form Message");

            mailMessage.setText(
            "Name: " + name +
            "\nEmail: " + email +
            "\nMessage: " + message);

            mailSender.send(mailMessage);

            return "MESSAGE SENT";

        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        }
    }
}
