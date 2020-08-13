<?php


namespace App\Controller\ApiRest;



use App\Entity\CommentExperience;
use App\Repository\CommentExperienceRepository;
use App\Service\CommentExperienceService;
use App\Repository\ExperienceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
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
    /**
     * @var CommentExperienceRepository
     */
    private $commentExperienceRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(ExperienceRepository $experienceRepository,
                                CommentExperienceService $commentExperienceService,
                                CommentExperienceRepository $commentExperienceRepository,
                                EntityManagerInterface $entityManager)
    {

        $this->experienceRepository = $experienceRepository;
        $this->commentExperienceService = $commentExperienceService;
        $this->commentExperienceRepository = $commentExperienceRepository;
        $this->entityManager = $entityManager;
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

    /**
     * @Rest\Put("/edit-comment-experience/{commentExperienceId<\d+>}")
     * @Rest\View(serializerGroups={"group_comment_experience"})
     */
    public function editCommentExprience(int $commentExperienceId, Request $request,
                                       EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $comment_content = $data['commentContent'];
        //$article = $data['article'];

        $commentExperience = $this->commentExperienceRepository->find($commentExperienceId);

        if (!$commentExperienceId) {
            throw new EntityNotFoundException('Article with id '.$commentExperienceId.' does not exist!');
        }

        $commentExperience->setCommentContent($comment_content);
        //$commentArticle->setArticle($article);
        $commentExperience->setCommentedAt(new \DateTime('now'));
        $commentExperience->setAuthorName($user);
        // Todo: 400 response - Invalid input
        // Todo: 404 response - Response not found
        // Incase our Post was a success we need to return a 201 HTTP CREATED response with the created object
        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $entityManager->persist($commentExperience);
            $entityManager->flush();
            return View::create("You modified the comment of an article successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register first!"], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Rest\Delete("/delete-comment-experience/{commentExperienceId}")
     */
    public function deleteCommentExperience(int $commentExperienceId)
    {
        $user = $this->getUser();
        $commentExperience = $this->commentExperienceRepository->find($commentExperienceId);
        if (!$commentExperience) {
            throw new EntityNotFoundException('Comment of this article with id '. $commentExperienceId. ' does not exist!');
        }

        // Todo: 400 response - Invalid input
        // Todo: 404 response - Response not found
        // Incase our Post was a success we need to return a 201 HTTP CREATED response with the created object
        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $this->entityManager->remove($commentExperience);
            $this->entityManager->flush();
            return View::create("Comment of the article has been deleted",
                Response::HTTP_OK);
        } else {
            return View::create(["You have not the right to delete this comment"], Response::HTTP_BAD_REQUEST);
        }

    }
}