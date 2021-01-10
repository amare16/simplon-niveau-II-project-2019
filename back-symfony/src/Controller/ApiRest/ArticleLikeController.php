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
     * @Rest\Get("/single-like/{articleLikeId<\d+>}")
     * @Rest\View(serializerGroups={"group_article_like"})
     */
    public function getSingleLike($articleLikeId): View
    {
        $single_like_article = $this->articleLikeRepository->find($articleLikeId);
        dd($single_like_article);

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


    /**
     * @Rest\Post("/single-article-like/{id<\d+>}/like", name="article_like");
     *
     * @param Article $article
     * @param EntityManagerInterface $entityManager
     * @param ArticleLikeRepository $articleLikeRepository
     * @return View
     */
    public function like(Article $article,
                         EntityManagerInterface $entityManager,
                         ArticleLikeRepository $articleLikeRepository): View
    {
        $user = $this->getUser();

        if (!$user) {
            return View::create([
                'code' => 403,
                'message' => 'Unauthorized!'
            ], 403);
        }

        if ($article->isLikedByUser($user)) {
            $like = $this->articleLikeRepository->findOneBy([
                'article' => $article,
                'user' => $user
            ]);

            $entityManager->remove($like);
            $entityManager->flush();

            return View::create([
                'code' => 200,
                'message' => 'Like well deleted',
                'likes' => $articleLikeRepository->count(['article' => $article])
            ], 200);
        }

        $like = new ArticleLike();
        $like->setArticle($article)
            ->setUser($user);

        $entityManager->persist($like);
        $entityManager->flush();

        return View::create([
            'code' => 200,
            'message' => 'Like well added',
            'likes' => $articleLikeRepository->count(['article' => $article])
        ], 200);
    }



    /**
     * @Rest\Get("/likes-of-article/{id<\d+>}/like", name="article_like");
     *
     * @param Article $article
     * @param EntityManagerInterface $entityManager
     * @param ArticleLikeRepository $articleLikeRepository
     * @return View
     */
    public function likesOfArticle(Article $article,
                         EntityManagerInterface $entityManager,
                         ArticleLikeRepository $articleLikeRepository): View
    {
        $user = $this->getUser();
        if (!$user) {
            return View::create([
                'code' => 403,
                'message' => 'Unauthorized!'
            ], 403);
        }

        if ($article->isLikedByUser($user)) {
            $like = $this->articleLikeRepository->findOneBy([
                'article' => $article,
                'user' => $user
            ]);

            $entityManager->remove($like);
            $entityManager->flush();

            $like_deleted = $articleLikeRepository->count(['article' => $article]);
           // return View::create($like_deleted, Response::HTTP_OK);
            return View::create([
                'code' => 200,
                'message' => 'Like well deleted',
                'likes' => $like_deleted,
            ], 200);
        }

        $like = new ArticleLike();
        $like->setArticle($article)
            ->setUser($user);

        $entityManager->persist($like);
        $entityManager->flush();


        $like_added = $articleLikeRepository->count(['article' => $article]);
        //return View::create($like_added, Response::HTTP_OK);
        return View::create([
            'code' => 200,
            'message' => 'Like well added',
            'likes' => $like_added
        ], 200);
    }
}