<?php


namespace App\Controller\ApiRest;



use App\Entity\CommentExperience;
use App\Service\CommentExperienceService;
use App\Repository\ExperienceRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Response;

class CommentExperienceController extends AbstractFOSRestController
{

    /**
     * @var ExperienceRepository
     */
    private $experienceRepository;
    /**
     * @var CommentExperienceService
     */
    private $commentExperienceService;

    public function __construct(ExperienceRepository $experienceRepository,
                                CommentExperienceService $commentExperienceService)
    {

        $this->experienceRepository = $experienceRepository;
        $this->commentExperienceService = $commentExperienceService;
    }

    /**
     * @Rest\Get("/comment-experience")
     * @Rest\View(serializerGroups={"group_comment_experience"})
     */
    public function getAllCommentExperiences(): View
    {
        $all_comment_experiences = $this->commentExperienceService->getAllCommentExperiences();
        return View::create($all_comment_experiences, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/single-comment-experience/{commentExperienceId<\d+>}")
     * @Rest\View(serializerGroups={"group_comment_experience"})
     */
    public function getSingleCommentExperience($commentExperienceId): View
    {
        $single_comment_experience = $this->commentExperienceService->getSingleCommentExperience($commentExperienceId);
        if ($single_comment_experience) {
            return View::create($single_comment_experience, Response::HTTP_OK);
        } else {
            return View::create(["There is no comment with this id"],
                Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Post("/add-comment-experience")
     * @Rest\View(serializerGroups={"group_comment_experience"})
     */
    public function addCommentExperience(Request $request, ExperienceRepository $experienceRepository,
                                         EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $comment_content = $data['commentContent'];

        $experience = $data['experience'];

        $singleExperience = $experienceRepository->findOneBy(['id' => $experience['id']]);

        $commentExperience = new CommentExperience();
        $commentExperience->setCommentContent($comment_content);
        $commentExperience->setAuthorName($user);
        $commentExperience->setExperience($singleExperience);
        $commentExperience->setCommentedAt(new \DateTime('now'));

        $entityManager->persist($commentExperience);
        $entityManager->flush();

        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($commentExperience);
            $entityManager->flush();
            return View::create("You added a comment on experience successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add a comment on experience!"], Response::HTTP_BAD_REQUEST);
        }
    }
}