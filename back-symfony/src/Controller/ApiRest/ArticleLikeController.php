<?php


namespace App\Controller\ApiRest;

use App\Entity\Article;
use App\Entity\ArticleLike;
use App\Repository\ArticleRepository;
use App\Repository\ArticleLikeRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;

class ArticleLikeController extends AbstractFOSRestController
{


    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var ArticleRepository
     */
    private $articleRepository;
    /**
     * @var ArticleLikeRepository
     */
    private $articleLikeRepository;

    public function __construct(EntityManagerInterface $entityManager,
                                ArticleRepository $articleRepository,
                                ArticleLikeRepository $articleLikeRepository)
    {

        $this->entityManager = $entityManager;
        $this->articleRepository = $articleRepository;
        $this->articleLikeRepository = $articleLikeRepository;
    }

    /**
     * @Rest\Get("/all-article-likes")
     * @Rest\View(serializerGroups={"group_article_like"})
     */
    public function getAllArticleLike(): View
    {
        $all_article_likes = $this->articleLikeRepository->findAll();
        return View::create($all_article_likes, Response::HTTP_OK);
    }

    /**
     * @Rest\Post("/add-article-like")
     * @Rest\View(serializerGroups={"group_article_like"})
     */
    public function addArticleLike(Request $request,
                                   ArticleRepository $articleRepository,
                                   EntityManagerInterface $entityManager)
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $article = $data['id'];
        $article_single = $this->articleRepository->findOneBy(['id' => $article]);


        $like = new ArticleLike();
        $like->setArticle($article_single);
        $like->setUser($user);

        $entityManager->persist($like);

        $entityManager->flush();


    }
}