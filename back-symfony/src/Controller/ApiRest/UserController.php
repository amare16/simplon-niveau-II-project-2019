<?php


namespace App\Controller\ApiRest;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\Addresses;
use App\Entity\User;
use App\Entity\UserType;
use App\Repository\AddressesRepository;
use App\Repository\UserRepository;
use App\Repository\UserTypeRepository;
use App\Service\UserService;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Flex\Response;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;


class UserController extends AbstractFOSRestController
{
    /**
     * @var UserService
     */
    private $userService;
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var LoggerInterface
     */
    private $logger;
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;
    /**
     * @var AddressesRepository
     */
    private $addressesRepository;
    /**
     * @var UserTypeRepository
     */
    private $userTypeRepository;

    public function __construct(AddressesRepository $addressesRepository, UserTypeRepository $userTypeRepository,UserPasswordEncoderInterface $passwordEncoder, UserService $userService, ValidatorInterface $validator, LoggerInterface $logger)
    {
       $this->userService = $userService;
        $this->validator = $validator;
        $this->logger = $logger;
        $this->passwordEncoder = $passwordEncoder;
        $this->addressesRepository = $addressesRepository;
        $this->userTypeRepository = $userTypeRepository;
    }

    /**
     * @Rest\Post("/register", name="api.register")
     */
    public function registerUser(AddressesRepository $addressesRepository, UserTypeRepository $userTypeRepository, Request $request, ObjectManager $manager)
    {
        $data = json_decode($request->getContent(), true);
        $first_name = $data['firstName'];
        $last_name = $data['lastName'];
        $username = $data['username'];
        $email = $data['email'];
        //$password = $data['password'];
        $telephone = $data['telephone'];
        $city = $data['city'];
        $zipCode = $data['zip_code'];
        $user_type = $data['userType'];

        $user_type_name = $userTypeRepository->findOneBy(['name' => $user_type]);

        $user = new User();
        $user->setFirstName($first_name);
        $user->setLastName($last_name);
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPassword($this->passwordEncoder->encodePassword(
            $user,
            $data['password'])
        );
        $user->setTelephone($telephone);
        $user->setCity($city);
        $user->setZipCode($zipCode);
        $user->addUserType($user_type_name);
        //dd($user);
        $manager->persist($user);
        $manager->flush();

        if(!$user instanceof User) {
            return View::create($user, Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(["Success" => $user->getUsername(). " has been registered!"], 200);

    }

    /**
     * @Rest\Post("/login", name="api_login")
     */
    public function login()
    {
        //dd($this->getUser());
        return $this->json([
            'user' => $this->getUser()
        ]);
        

    }

    /**
     * @Rest\Post("/profile", name="api_profile")
     * @IsGranted("ROLE_USER")
     */
    public function profile() {
        return $this->json([
            'user' => $this->getUser()
        ]);

    }

    /* @Rest\Post("/logout", name="api_logout")
    */
    public function logout()
    {

    }



}