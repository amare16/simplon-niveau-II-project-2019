<?php


namespace App\Controller\ApiRest;

use App\Entity\UserProfile;
use App\Repository\UserProfileRepository;
use App\Repository\UserRepository;
use App\Service\UserProfileService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class UserProfileController extends AbstractFOSRestController
{
    /**
     * @var UserProfileService
     */
    private $userProfileService;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var UserProfileRepository
     */
    private $userProfileRepository;

    public function __construct(UserProfileService $userProfileService,
                                UserRepository $userRepository,
                                EntityManagerInterface $entityManager,
                                UserProfileRepository $userProfileRepository)
    {
        $this->userProfileService = $userProfileService;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->userProfileRepository = $userProfileRepository;
    }

    /**
     * @Rest\Get("/user-profile")
     * @Rest\View(serializerGroups={"group_user_profile"})
     */
    public function getAllUserProfile(): View
    {
        $all_user_profile = $this->userProfileService->getAllUserProfile();

        return View::create($all_user_profile, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/single-user-profile/{userProfileId<\d+>}")
     * @Rest\View(serializerGroups={"group_user_profile"})
     */
    public function getSingleUserProfile(int $userProfileId): View
    {

        $single_user_profile = $this->userProfileService->getSingleUserProfile($userProfileId);

        if ($single_user_profile) {
            return View::create($single_user_profile, Response::HTTP_OK);
        } else {
            return View::create(["There is no Profile with this id"],
                Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Post("/add-user-profile")
     * @Rest\View(serializerGroups={"group_user_profile"})
     */
    public function createUserProfile(Request $request, EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $contentAbout = $data['content_about'];
        $contentAspiration = $data['content_aspiration'];
        $hobby = $data['hobby'];

        $userProfile = new UserProfile();
        $userProfile->setContentAbout($contentAbout);
        $userProfile->setContentAspiration($contentAspiration);
        $userProfile->setHobby($hobby);
        $userProfile->setCreatedOn(new \DateTime('now'));
        $userProfile->setUser($user);

        if (in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($userProfile);
            $entityManager->flush();
            return View::create("You added your profile successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add your profile!"], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Put("/edit-user-profile/{userProfileId<\d+>}")
     * @Rest\View(serializerGroups={"group_user_profile"})
     */
    public function editUserProfile(int $userProfileId,
                                    Request $request,
                                    EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $contentAbout = $data['content_about'];
        $contentAspiration = $data['content_aspiration'];
        $hobby = $data['hobby'];

        $userProfile = $this->userProfileRepository->find($userProfileId);

        if (!$userProfile) {
            throw new EntityNotFoundException('User profile with id '.$userProfileId.' does not exist!');
        }

        $userProfile->setContentAbout($contentAbout);
        $userProfile->setContentAspiration($contentAspiration);
        $userProfile->setHobby($hobby);
        $userProfile->setCreatedOn(new \DateTime('now'));
        $userProfile->setUser($user);

        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $entityManager->persist($userProfile);
            $entityManager->flush();
            return View::create("You modified your profile successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to modify your profile!"], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Delete("/delete-user-profile/{userProfileId<\d+>}")
     */
    public function deleteUserProfile(int $userProfileId)
    {
        $user = $this->getUser();
        $userProfile = $this->userProfileRepository->find($userProfileId);
        if (!$userProfile) {
            throw new EntityNotFoundException('User profile with id '. $userProfile. ' does not exist!');
        }

        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $this->entityManager->remove($userProfile);
            $this->entityManager->flush();
            return View::create("User profile which has an id ' " .$userProfile->getId(). " ' has been deleted",
                Response::HTTP_OK);
        } else {
            return View::create(["You have not the right to delete this User profile"], Response::HTTP_BAD_REQUEST);
        }
    }
}