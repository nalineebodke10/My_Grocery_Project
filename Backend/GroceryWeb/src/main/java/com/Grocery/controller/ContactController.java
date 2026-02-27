package com.Grocery.controller;

import com.Grocery.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/contact")
    public String submitContactForm(@RequestBody ContactRequest request) {

        System.out.println("📩 CONTACT RECEIVED " + request.getName());

        try {

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("rahuldaware2510@gmail.com");
            message.setSubject("New Contact Message");

            message.setText(
                    "Name: " + request.getName() +
                    "\nEmail: " + request.getEmail() +
                    "\nMessage: " + request.getMessage()
            );

            mailSender.send(message);

            return "MESSAGE SENT";

        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        }
    }
}