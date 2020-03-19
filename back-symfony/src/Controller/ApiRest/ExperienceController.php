<?php


namespace App\Controller\ApiRest;


use App\Entity\Article;
use App\Entity\Experience;
use App\Repository\ExperienceRepository;
use App\Service\ExperienceService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ExperienceController extends AbstractFOSRestController

{

    /**
     * @var ExperienceService
     */
    private $experienceService;
    /**
     * @var ExperienceRepository
     */
    private $experienceRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(ExperienceService $experienceService,
                                ExperienceRepository $experienceRepository, EntityManagerInterface $entityManager)
    {
        $this->experienceService = $experienceService;
        $this->experienceRepository = $experienceRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Rest\Get("/experiences")
     * @Rest\View(serializerGroups={"group_experience"})
     */
    public function getAllExperiences(): View
    {
        $all_experiences = $this->experienceService->getAllExperiences();

        return View::create($all_experiences, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/single-experience/{experienceId<\d+>}")
     * @Rest\View(serializerGroups={"group_experience"})
     */
    public function getSingleExperience(int $experienceId): View
    {
        $single_experience = $this->experienceService->getSingleExperience($experienceId);
        if ($single_experience) {
            return View::create($single_experience, Response::HTTP_OK);
        } else {
            return View::create(["There is no experience with this id"],
                Response::HTTP_BAD_REQUEST);
        }

    }


    /**
     * @Rest\Post("/add-experience")
     * @Rest\View(serializerGroups={"group_experience"})
     */
    public function newExperience(Request $request, EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $content = $data['content'];
        $published_at = $data['published_at'];

        $experience = new Experience();
        $experience->setTitle($title);
        $experience->setContent($content);
        //$experience->setPublishedAt(\DateTime::createFromFormat(DateTimeInterface::ATOM, $published_at) ? : new \DateTime());
        $experience->setPublishedAt(\DateTime::createFromFormat("Y-m-d",$published_at));
        $experience->setUser($user);


        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($experience);
            $entityManager->flush();
            return View::create("You added an experience successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add an experience!"], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Put("/edit-experience/{experienceId<\d+>}")
     * @Rest\View(serializerGroups={"group_experience"})
     */
    public function editArticles(int $experienceId, Request $request,
                                 EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $content = $data['content'];
        $published_at = $data['published_at'];

        $experience = $this->experienceRepository->find($experienceId);

        if (!$experience) {
            throw new EntityNotFoundException('Experience with id '.$experienceId.' does not exist!');
        }

        $experience->setTitle($title);
        $experience->setContent($content);
        $experience->setPublishedAt(\DateTime::createFromFormat("Y-m-d", $published_at));
        $experience->setUser($user);

        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $entityManager->persist($experience);
            $entityManager->flush();
            return View::create("You modified the experience successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register first!"], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Rest\Delete("/delete-experience/{experienceId}")
     */
    public function deleteExperience(int $experienceId)
    {
        $user = $this->getUser();
        $experience = $this->experienceRepository->find($experienceId);
        if (!$experience) {
            throw new EntityNotFoundException('Experience with id '. $experienceId. ' does not exist!');
        }

        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $this->entityManager->remove($experience);
            $this->entityManager->flush();
            return View::create("Experience which is entitled ' " .$experience->getTitle(). " ' has been deleted",
                Response::HTTP_OK);
        } else {
            return View::create(["You have not the right to delete this experience"], Response::HTTP_BAD_REQUEST);
        }

    }
}