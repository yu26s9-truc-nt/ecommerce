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

    public Profile create(Profile profile)
    {
        return profileRepository.save(profile);
    }
}
