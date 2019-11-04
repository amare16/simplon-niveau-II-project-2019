<?php


namespace App\Service;


use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\Addresses;
use App\Entity\User;
use App\Repository\AddressesRepository;
use App\Repository\UserRepository;
use Doctrine\Common\Persistence\ObjectManager;

class UserService
{

    /**
     * @var AddressesRepository
     */
    private $addressesRepository;
    /**
     * @var ObjectManager
     */
    private $manager;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(UserRepository $userRepository, AddressesRepository $addressesRepository,
                                ObjectManager $manager, ValidatorInterface $validator)
    {
        $this->addressesRepository = $addressesRepository;
        $this->manager = $manager;
        $this->userRepository = $userRepository;
        $this->validator = $validator;
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
        $addresses = new Addresses();

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