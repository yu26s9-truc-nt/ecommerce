package org.yearup.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.yearup.dto.ProductUpdateDTO;
import org.yearup.model.Product;
import org.yearup.model.Profile;
import org.yearup.model.User;
import org.yearup.service.ProfileService;
import org.yearup.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("profile")
public class ProfileController {
    private final ProfileService profileService;
    private final UserService userService;

    public ProfileController(ProfileService profileService, UserService userService) {
        this.profileService = profileService;
        this.userService = userService;
    }

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public Profile getProfile(Principal principal) {
        String userName = principal.getName();

        User user = userService.getByUserName(userName);
        int userId = user.getId();

        return profileService.getByUserId(userId);
    }

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public Profile updateFull(Principal principal, @Valid @RequestBody Profile updatingProfile) {
        String userName = principal.getName();

        User user = userService.getByUserName(userName);
        int userId = user.getId();

        return profileService.update(userId, updatingProfile);
    }
}
