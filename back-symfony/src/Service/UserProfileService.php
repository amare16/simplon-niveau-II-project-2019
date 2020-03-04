<?php


namespace App\Service;


use App\Repository\UserProfileRepository;

class UserProfileService
{

    /**
     * @var UserProfileRepository
     */
    private $userProfileRepository;

    public function __construct(UserProfileRepository $userProfileRepository)
    {
        $this->userProfileRepository = $userProfileRepository;
    }


    public function getAllUserProfile()
    {
        return $this->userProfileRepository->findAll();
    }

    public function getSingleUserProfile($userProfileId)
    {
        return $this->userProfileRepository->find($userProfileId);
    }
}