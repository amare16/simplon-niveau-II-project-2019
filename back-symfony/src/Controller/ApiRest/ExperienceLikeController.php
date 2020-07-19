<?php


namespace App\Controller\ApiRest;


use App\Entity\Experience;
use App\Entity\ExperienceLike;
use App\Repository\ExperienceLikeRepository;
use App\Repository\ExperienceRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ExperienceLikeController extends AbstractFOSRestController
{

    /**
     * @var ExperienceRepository
     */
    private $experienceRepository;
    /**
     * @var ExperienceLikeRepository
     */
    private $experienceLikeRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;


    public function __construct(ExperienceRepository $experienceRepository,
                                ExperienceLikeRepository $experienceLikeRepository,
                                EntityManagerInterface $entityManager)
    {

        $this->experienceRepository = $experienceRepository;
        $this->experienceLikeRepository = $experienceLikeRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Rest\Get("/all-experience-likes")
     * @Rest\View(serializerGroups={"group_experience_like"})
     */
    public function getAllExperienceLike(): View
    {
        $all_experience_likes = $this->experienceLikeRepository->findAll();
        return View::create($all_experience_likes, Response::HTTP_OK);
    }

    /**
     * @Rest\Post("/add-experience-like")
     * @Rest\View(serializerGroups={"group_experience_like"})
     */
    public function addExperienceLike(Request $request,
                                   ExperienceRepository $experienceRepository,
                                   EntityManagerInterface $entityManager)
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $experience = $data['id'];
        $experience_single = $this->experienceRepository->findOneBy(['id' => $experience]);


        $like = new ExperienceLike();
        $like->setExperience($experience_single);
        $like->setUser($user);

        $entityManager->persist($like);

        $entityManager->flush();


    }





}