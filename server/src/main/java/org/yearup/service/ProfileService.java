package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.yearup.model.Profile;
import org.yearup.repository.ProfileRepository;

import java.util.Optional;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository)
    {
        this.profileRepository = profileRepository;
    }

    public Profile getByUserId(int userId) {
        return profileRepository.getByUserId(userId).orElseThrow(() -> new EntityNotFoundException("Profile not found"));
    }

    public Profile create(Profile creatingProfile) {
        return profileRepository.save(creatingProfile);
    }

    public Profile update(int userId, Profile updatingProfile) {
        Profile profile = this.getByUserId(userId);

        if (updatingProfile.getFirstName() != null) profile.setFirstName(updatingProfile.getFirstName());
        if (updatingProfile.getLastName() != null) profile.setLastName(updatingProfile.getLastName());
        if (updatingProfile.getPhone() != null) profile.setPhone(updatingProfile.getPhone());
        if (updatingProfile.getEmail() != null) profile.setEmail(updatingProfile.getEmail());
        if (updatingProfile.getAddress() != null) profile.setAddress(updatingProfile.getAddress());
        if (updatingProfile.getCity() != null) profile.setCity(updatingProfile.getCity());
        if (updatingProfile.getState() != null) profile.setState(updatingProfile.getState());
        if (updatingProfile.getZip() != null) profile.setZip(updatingProfile.getZip());
        return profileRepository.save(profile);
    }
}
