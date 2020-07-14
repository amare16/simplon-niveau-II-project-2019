<?php


namespace App\Controller\ApiRest;


use App\Entity\Addresses;
use App\Entity\User;
use App\Entity\UserType;
use App\Repository\AddressesRepository;
use App\Repository\UserRepository;
use App\Repository\UserTypeRepository;
use App\Service\UserService;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;


class UserController extends AbstractFOSRestController
{
    /**
     * @var UserService
     */
    private $userService;

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
    /**
     * @var JWTEncoderInterface
     */
    private $jwt_encoder;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(AddressesRepository $addressesRepository,
                                UserTypeRepository $userTypeRepository,
                                UserPasswordEncoderInterface $passwordEncoder,
                                UserService $userService,
                                JWTEncoderInterface $jwt_encoder,
                                LoggerInterface $logger,
                                UserRepository $userRepository,
                                EntityManagerInterface $entityManager)
    {
       $this->userService = $userService;

        $this->logger = $logger;
        $this->passwordEncoder = $passwordEncoder;
        $this->addressesRepository = $addressesRepository;
        $this->userTypeRepository = $userTypeRepository;
        $this->jwt_encoder = $jwt_encoder;
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
    }

    /**
     * @Rest\Get("/users", name="api.users")
     * @Rest\View(serializerGroups={"group_user"})
     */
    public function listUsers(): View
    {
        $all_users = $this->userService->getAllUsers();
        return View::create($all_users, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/single-user/{userId<\d+>}")
     * @Rest\View(serializerGroups={"group_user"})
     */
    public function getSingleUser($userId): View
    {
        $single_user = $this->userService->getSingleUser($userId);
        if ($single_user) {
            return View::create($single_user, Response::HTTP_OK);
        } else {
            return View::create(["There is no user with this id"],
                Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Post("/register", name="api.register")
     * @Rest\View(serializerGroups={"group_user"})
     */
    public function registerUser(AddressesRepository $addressesRepository,
                                 UserTypeRepository $userTypeRepository,
                                 Request $request,
                                 EntityManagerInterface $entityManager)
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
        $entityManager->persist($user);
        $entityManager->flush();

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
//        $userTest = $this->getUser();
//        $token = $this->jwt_encoder->encode(['username' => $userTest]);
//        dd($token);
        $this->getUser();
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