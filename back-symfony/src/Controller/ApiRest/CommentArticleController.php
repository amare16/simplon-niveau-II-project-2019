<?php


namespace App\Controller\ApiRest;

use App\Repository\CommentArticleRepository;
use App\Service\CommentArticleService;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\CommentArticle;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityNotFoundException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Response;

class CommentArticleController extends AbstractFOSRestController
{

    /**
     * @var ArticleRepository
     */
    private $articleRepository;
    /**
     * @var CommentArticleService
     */
    private $commentArticleService;
    /**
     * @var CommentArticleRepository
     */
    private $commentArticleRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(ArticleRepository $articleRepository,
                                CommentArticleService $commentArticleService,
                                CommentArticleRepository $commentArticleRepository,
                                EntityManagerInterface $entityManager)
    {

        $this->articleRepository = $articleRepository;
        $this->commentArticleService = $commentArticleService;
        $this->commentArticleRepository = $commentArticleRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Rest\Get("/comment-article")
     * @Rest\View(serializerGroups={"group_comment_article"})
     */
    public function getAllComment(): View
    {
        $all_comment = $this->commentArticleService->getAllComment();

        return View::create($all_comment, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/single-comment-article/{commentId<\d+>}")
     * @Rest\View(serializerGroups={"group_comment_article"})
     */
    public function getSingleComment($commentId): View
    {
        $single_comment = $this->commentArticleService->getSingleComment($commentId);
        if ($single_comment) {
            return View::create($single_comment, Response::HTTP_OK);
        } else {
            return View::create(["There is no comment with this id"],
                Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Post("/new-comment")
     */
    public function newComment(Request $request, ArticleRepository $articleRepository, EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $comment_content = $data['commentContent'];

        $article = $data['article'];

        $singleArticle = $articleRepository->findOneBy(['id' => $article['id']]);

        $comment = new CommentArticle();
        $comment->setCommentContent($comment_content);
        $comment->setAuthorName($user);
        $comment->setArticle($singleArticle);
        $comment->setCommentedAt(new \DateTime('now'));

        $entityManager->persist($comment);
        $entityManager->flush();

        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($comment);
            $entityManager->flush();
            return View::create("You added a comment successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add a comment!"], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Put("/edit-comment-article/{commentArticleId<\d+>}")
     * @Rest\View(serializerGroups={"group_comment_article"})
     */
    public function editCommentArticle(int $commentArticleId, Request $request,
                                 EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $comment_content = $data['commentContent'];
        //$article = $data['article'];

        $commentArticle = $this->commentArticleRepository->find($commentArticleId);

        if (!$commentArticle) {
            throw new EntityNotFoundException('Article with id '.$commentArticleId.' does not exist!');
        }

        $commentArticle->setCommentContent($comment_content);
        //$commentArticle->setArticle($article);
        $commentArticle->setCommentedAt(new \DateTime('now'));
        $commentArticle->setAuthorName($user);
        // Todo: 400 response - Invalid input
        // Todo: 404 response - Response not found
        // Incase our Post was a success we need to return a 201 HTTP CREATED response with the created object
        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $entityManager->persist($commentArticle);
            $entityManager->flush();
            return View::create("You modified the comment of an article successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register first!"], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Rest\Delete("/delete-comment-article/{commentArticleId}")
     */
    public function deleteCommentArticle(int $commentArticleId)
    {
        $user = $this->getUser();
        $commentArticle = $this->commentArticleRepository->find($commentArticleId);
        if (!$commentArticle) {
            throw new EntityNotFoundException('Comment of this article with id '. $commentArticleId. ' does not exist!');
        }

        // Todo: 400 response - Invalid input
        // Todo: 404 response - Response not found
        // Incase our Post was a success we need to return a 201 HTTP CREATED response with the created object
        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $this->entityManager->remove($commentArticle);
            $this->entityManager->flush();
            return View::create("Comment of the article has been deleted",
                Response::HTTP_OK);
        } else {
            return View::create(["You have not the right to delete this comment"], Response::HTTP_BAD_REQUEST);
        }

    }
}