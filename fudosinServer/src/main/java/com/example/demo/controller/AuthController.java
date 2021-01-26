package com.example.demo.controller;


import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.models.*;
import com.example.demo.repos.PersonRepository;
import com.example.demo.repos.RoleRepository;
import com.example.demo.repos.StudentRepository;
import com.example.demo.security.JwtUtils;
import com.example.demo.security.request.LoginRequest;
import com.example.demo.security.request.SignupRequest;
import com.example.demo.security.response.JwtResponse;
import com.example.demo.security.response.MessageResponse;
import com.example.demo.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.security.SecureRandom;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {


    @Qualifier("getJavaMainSender")
    @Autowired
    public JavaMailSender emailSender;

    String randomString(int len) {
        final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        SecureRandom rnd = new SecureRandom();

        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    PersonRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/reset/{email}")
    public ResponseEntity<?> resetPassword(@PathVariable(value = "email") String email) throws ItemNotFoundException {
        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.ok("The user does not exist");
        } else {
            Person p = userRepository.findPeopleByEmail(email)
                    .orElseThrow(() -> new ItemNotFoundException(email));
            String newPassword = randomString(10);
            p.setPassword(encoder.encode(newPassword));
            userRepository.save(p);
            sendEmail(p.getEmail(),p.getUsername(),newPassword);
            return ResponseEntity.ok("Новый пароль отправлен вам на почту.");

        }
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest)  {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        System.out.println(signUpRequest.getUsername());
        Person user = new Person(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            roleRepository.findByName(ERole.ROLE_STUDENT);
            Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            Student student = new Student();
            student.setPerson(user);
            user.setStudent(student);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ROLE_STUDENT":
                        Role studentRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(studentRole);
                        Student student = new Student();
                        student.setPerson(user);
                        user.setStudent(student);
                        break;
                    case "ROLE_ADMIN":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        Administrator administrator = new Administrator();
                        administrator.setPerson(user);
                        user.setAdministrator(administrator);
                        break;
                    case "ROLE_PARENT":
                        Role parRole = roleRepository.findByName(ERole.ROLE_PARENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(parRole);
                        Parent parent = new Parent();
                        parent.setPerson(user);
                        user.setParent(parent);
                        break;
                    case "ROLE_INSTRUCTOR":
                        Role instrRole = roleRepository.findByName(ERole.ROLE_INSTRUCTOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(instrRole);
                        Instructor instructor = new Instructor();
                        instructor.setPerson(user);
                        user.setInstructor(instructor);
                        break;
                    default:
                        Role studRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(studRole);
                }
            });
        }
        user.setUserRoles(roles);
        userRepository.save(user);
        sendEmail(user.getEmail(),user.getUsername(),signUpRequest.getPassword());
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    private void sendEmail(String emailReceiver, String login, String password) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailReceiver);
        message.setSubject("Фудосин регистрация на сайте");
        String textMessage = "Login: "  + login +"\n"+ "Password: "+ password;
        message.setText(textMessage);
        System.out.println(textMessage );
        this.emailSender.send(message);
    }


}
