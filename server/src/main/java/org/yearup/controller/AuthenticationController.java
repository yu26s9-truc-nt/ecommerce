package org.yearup.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import org.yearup.model.Profile;
import org.yearup.service.ProfileService;
import org.yearup.service.UserService;
import org.yearup.dto.authentication.LoginDTO;
import org.yearup.dto.authentication.LoginResponseDTO;
import org.yearup.dto.authentication.RegisterUserDTO;
import org.yearup.model.User;
import org.yearup.security.jwt.JWTFilter;
import org.yearup.security.jwt.TokenProvider;

@RestController
@PreAuthorize("permitAll()")
public class AuthenticationController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private UserService userService;
    private ProfileService profileService;

    public AuthenticationController(TokenProvider tokenProvider, AuthenticationManager authenticationManager, UserService userService, ProfileService profileService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.profileService = profileService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginDTO loginDto) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.createToken(authentication, false);

            User user = userService.getByUserName(loginDto.getUsername());

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
            return new ResponseEntity<>(new LoginResponseDTO(jwt, user), httpHeaders, HttpStatus.OK);
        }
        catch (AuthenticationException e) {
            // bad username/password -> 401 (not a 500)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password.");
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<User> register(@Valid @RequestBody RegisterUserDTO newUser) {

        boolean exists = userService.exists(newUser.getUsername());
        if (exists) {
            // duplicate username -> 400 (not a 500)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User Already Exists.");
        }

        // create user
        User user = userService.create(new User(0, newUser.getUsername(), newUser.getPassword(), newUser.getRole()));

        // create profile
        Profile profile = new Profile();
        profile.setUserId(user.getId());
        profileService.create(profile);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

}
