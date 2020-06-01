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

    public function __construct(EntityManagerInterface $entityManager,
                                ArticleRepository $articleRepository)
    {

        $this->entityManager = $entityManager;
        $this->articleRepository = $articleRepository;
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