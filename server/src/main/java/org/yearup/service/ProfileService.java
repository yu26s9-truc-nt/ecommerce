package org.yearup.service;

import org.springframework.stereotype.Service;
import org.yearup.models.Profile;
import org.yearup.repository.ProfileRepository;

import java.util.Optional;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository)
    {
        this.profileRepository = profileRepository;
    }

    public Optional<Profile> getByUserId(int userId) {
        return profileRepository.getByUserId(userId);
    }

    public Profile create(Profile profile) {
        return profileRepository.save(profile);
    }

    public Optional<Profile> update(int userId, Profile updatingProfile) {
        return profileRepository.getByUserId(userId).map(profile -> {
            if (updatingProfile.getFirstName() != null) profile.setFirstName(updatingProfile.getFirstName());
            if (updatingProfile.getLastName() != null) profile.setLastName(updatingProfile.getLastName());
            if (updatingProfile.getPhone() != null) profile.setPhone(updatingProfile.getPhone());
            if (updatingProfile.getEmail() != null) profile.setEmail(updatingProfile.getEmail());
            if (updatingProfile.getAddress() != null) profile.setAddress(updatingProfile.getAddress());
            if (updatingProfile.getCity() != null) profile.setCity(updatingProfile.getCity());
            if (updatingProfile.getState() != null) profile.setState(updatingProfile.getState());
            if (updatingProfile.getZip() != null) profile.setZip(updatingProfile.getZip());
            return profileRepository.save(profile);
        });
    }
}
