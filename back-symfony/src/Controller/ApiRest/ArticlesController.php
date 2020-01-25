<?php


namespace App\Controller\ApiRest;


use App\Entity\Article;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\ExpressionLanguage\Tests\Node\Obj;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\ArticlesService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;

class ArticlesController extends AbstractFOSRestController
{

    /**
     * @var ArticlesService
     */
    private $articlesService;
    /**
     * @var ArticleRepository
     */
    private $articleRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;


    public function __construct(ArticlesService $articlesService, ArticleRepository $articleRepository, EntityManagerInterface $entityManager)
    {
        $this->articlesService = $articlesService;
        $this->articleRepository = $articleRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Rest\Get("/articles")
     * @Rest\View(serializerGroups={"group_article"})
     */
    public function getAllArticles(): View
    {
        $all_articles = $this->articlesService->getAllArticles();

        return View::create($all_articles, Response::HTTP_OK);
    }

    /**
     * @Rest\Post("/add-article")
     * @Rest\View(serializerGroups={"group_article"})
     */
    public function newArticle(Request $request, UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
       $data = json_decode($request->getContent(), true);
       $title = $data['title'];
       $content = $data['content'];
       $published_at = $data['published_at'];
       $userId = $data['user_id'];

       $user_id = $userRepository->findOneBy(['id' => $userId['id']]);

       $articles = new Article();
       $articles->setTitle($title);
       $articles->setContent($content);
       $articles->setPublishedAt(\DateTime::createFromFormat('Y-m-d', $published_at));
       $articles->setUser($user_id);

        $entityManager->persist($articles);

        $entityManager->flush();

       if (!$articles instanceof \App\Entity\Article) {
           return View::create($articles, Response::HTTP_BAD_REQUEST);
       }

       return View::create($articles, Response::HTTP_CREATED);
    }

    /**
     * @Rest\Put("/edit-article/{articleId<\d+>}")
     * @Rest\View(serializerGroups={"group_article"})
     */
    public function editArticles(int $articleId, Request $request, ArticleRepository $articleRepository, UserRepository $userRepository, EntityManagerInterface $entityManager) {
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $content = $data['content'];
        $published_at = $data['published_at'];
        $userId = $data['user_id'];

        $user_id = $userRepository->findOneBy(['id' => $userId['id']]);

        $article = $this->articleRepository->findOneById($articleId);

        if (!$article) {
            throw new EntityNotFoundException('Article with id '. $articleId. ' does not exist!');
        }

        $article->setTitle($title);
        $article->setContent($content);
        $article->setPublishedAt(\DateTime::createFromFormat('Y-m-d', $published_at));
        $article->setUser($user_id);
        $entityManager->persist($article);
        $entityManager->flush();

        if (!$article instanceof \App\Entity\Article) {
            return View::create($article, Response::HTTP_BAD_REQUEST);
        }
        return View::create($article, Response::HTTP_CREATED);

    }

    /**
     * @Rest\Delete("/delete-article/{articleId}")
     */
    public function deleteArticle(int $articleId, EntityManagerInterface $entityManager)
    {
        $article = $this->articleRepository->findOneById($articleId);
        if (!$article) {
            throw new EntityNotFoundException('Article with id '. $articleId. ' does not exist!');
        }

        $entityManager->remove($article);
        $entityManager->flush();

//        $this->addFlash(
//            'Success',
//            "The article <strong>{$article->getTitle()}</strong> has been deleted !"
//        );
        if (!$article instanceof \App\Entity\Article) {
            return View::create($article, Response::HTTP_BAD_REQUEST);
        }
        return View::create($article, Response::HTTP_CREATED);

    }

}