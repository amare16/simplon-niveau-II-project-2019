<?php


namespace App\Service;


use App\Entity\Addresses;
use App\Entity\User;
use App\Repository\AddressesRepository;
use App\Repository\UserRepository;


class UserService
{

    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var \Doctrine\Common\Persistence\ManagerRegistry
     */
    private $managerRegistry;


    public function __construct(UserRepository $userRepository,
                                \Doctrine\Common\Persistence\ManagerRegistry $managerRegistry)
    {
        $this->userRepository = $userRepository;

        $this->managerRegistry = $managerRegistry;
    }

    public function getAllUsers()
    {
        return $this->userRepository->findAll();
    }

    public function getSingleUser($userId) {
        return $this->userRepository->find($userId);
    }

    public function addUser($firstName, $lastName, $username, $email, $password, $telephone, $addresses)
    {
        $user = new User();
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPlainPassword($password);
        $user->setTelephone($telephone);
        //$addresses = new Addresses();

        $user->addAddresses($addresses);

        $violations = $this->validator->validate($user);
        if (count($violations) > 0) {
            $errorsString = 'The JSON sent contains invalid data. Here are the errors you need to correct';
            foreach ($violations as $violation) {
                $errorsString .= sprintf("Field %s: %s ", $violation->getPropertyPath(), $violation->getMessage());
            }
            return $errorsString;
        }
        $this->manager->persist($user);
        $this->manager->flush();
        return $user;

    }


}