<?php


namespace App\Controller\ApiRest;

use App\Service\CommentArticleService;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\CommentArticle;
use App\Repository\ArticleRepository;
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

    public function __construct(ArticleRepository $articleRepository, CommentArticleService $commentArticleService)
    {

        $this->articleRepository = $articleRepository;
        $this->commentArticleService = $commentArticleService;
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
}