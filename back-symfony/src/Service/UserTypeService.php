<?php


namespace App\Service;


use App\Repository\UserTypeRepository;

class UserTypeService
{

    /**
     * @var UserTypeRepository
     */
    private $userTypeRepository;

    public function __construct(UserTypeRepository $userTypeRepository)
    {
        $this->userTypeRepository = $userTypeRepository;
    }

    public function getAllUserType()
    {
        return $this->userTypeRepository->findAll();
    }
}