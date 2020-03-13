<?php


namespace App\Service;


use App\Repository\ExperienceRepository;
use App\Repository\UserRepository;

class ExperienceService
{

    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var ExperienceRepository
     */
    private $experienceRepository;

    public function __construct(UserRepository $userRepository, ExperienceRepository $experienceRepository)
    {
        $this->userRepository = $userRepository;
        $this->experienceRepository = $experienceRepository;
    }

    public function getAllExperiences()
    {
        return $this->experienceRepository->findAll();
    }

    public function getSingleExperience(int $experienceId)
    {
        return $this->experienceRepository->find($experienceId);
    }

}