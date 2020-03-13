<?php


namespace App\Controller\ApiRest;


use App\Entity\Article;
use App\Entity\CommentArticle;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use PhpOffice\PhpSpreadsheet\Calculation\DateTime;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\ExpressionLanguage\Tests\Node\Obj;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\ArticlesService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use DateTimeInterface;

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
    /**
     * @var LoggerInterface
     */
    private $logger;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var JWTEncoderInterface
     */
    private $JWTEncoder;


    public function __construct(ArticlesService $articlesService,
                                ArticleRepository $articleRepository,
                                EntityManagerInterface $entityManager,
                                UserRepository $userRepository,
                                LoggerInterface $logger, JWTEncoderInterface $JWTEncoder)
    {
        $this->articlesService = $articlesService;
        $this->articleRepository = $articleRepository;
        $this->entityManager = $entityManager;
        $this->logger = $logger;
        $this->userRepository = $userRepository;
        $this->JWTEncoder = $JWTEncoder;
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
     * @Rest\Get("/single-article/{articleId<\d+>}")
     * @Rest\View(serializerGroups={"group_article"})
     */
    public function getSingleArticle(int $articleId): View
    {
        $single_article = $this->articlesService->getSingleArticle($articleId);
        if ($single_article) {
            return View::create($single_article, Response::HTTP_OK);
        } else {
            return View::create(["There is no article with this id"],
                Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Rest\Post("/add-article")
     * @Rest\View(serializerGroups={"group_article"})
     */
    public function newArticle(Request $request, EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $content = $data['content'];
        $published_at = $data['published_at'];

//        $user_id = $data['user_id'];

//        $authorizationHeader = $request->headers->get('Authorization');
//
//        list($test,$token) = explode(' ', $authorizationHeader);
//        $jwtToken = $this->JWTEncoder->decode($token);
//        $user_id = $data[$jwtToken];
        //$authorizationHeader = $request->headers->get('Authorization');
        //$authorizationHeaderArray = explode(' ', $authorizationHeader);
        //$token = $authorizationHeaderArray[1] ?? null;
        //$jwtToken = $this->JWTEncoder->decode($token);
        //dd($jwtToken);
        //$user_id = $user->getId();


        //$userId = $this->userRepository->findOneBy(['id' => $user_id['id']]);

        $article = new Article();
        $article->setTitle($title);
        $article->setContent($content);
        //$article->setPublishedAt(\DateTime::createFromFormat(DateTimeInterface::ATOM, $published_at) ? : new \DateTime());
        $article->setPublishedAt(\DateTime::createFromFormat("Y-m-d",$published_at));
        $article->setUser($user);

        // Todo: 400 response - Invalid input
        // Todo: 404 response - Response not found
        // Incase our Post was a success we need to return a 201 HTTP CREATED response with the created object
        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($article);
            $entityManager->flush();
            return View::create("You added an article successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add an article!"], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Put("/edit-article/{articleId<\d+>}")
     * @Rest\View(serializerGroups={"group_article"})
     */
    public function editArticles(int $articleId, Request $request,
                                 EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $content = $data['content'];
        $published_at = $data['published_at'];
        //$user_id = $data['user_id'];

        //$userId = $this->userRepository->findOneBy(['id' => $user_id['id']]);
        $article = $this->articleRepository->find($articleId);

        if (!$article) {
            throw new EntityNotFoundException('Article with id '.$articleId.' does not exist!');
        }

        $article->setTitle($title);
        $article->setContent($content);
        $article->setPublishedAt(\DateTime::createFromFormat("Y-m-d", $published_at));
        $article->setUser($user);
        // Todo: 400 response - Invalid input
        // Todo: 404 response - Response not found
        // Incase our Post was a success we need to return a 201 HTTP CREATED response with the created object
        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $entityManager->persist($article);
            $entityManager->flush();
            return View::create("You modified the article successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register first!"], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Rest\Delete("/delete-article/{articleId}")
     */
    public function deleteArticle(int $articleId)
    {
        $user = $this->getUser();
        $article = $this->articleRepository->find($articleId);
        if (!$article) {
            throw new EntityNotFoundException('Article with id '. $articleId. ' does not exist!');
        }

        // Todo: 400 response - Invalid input
        // Todo: 404 response - Response not found
        // Incase our Post was a success we need to return a 201 HTTP CREATED response with the created object
        if(in_array('ROLE_USER', $user->getRoles(), true)) {
            $this->entityManager->remove($article);
            $this->entityManager->flush();
            return View::create("Article which is entitled ' " .$article->getTitle(). " ' has been deleted",
                Response::HTTP_OK);
        } else {
            return View::create(["You have not the right to delete this article"], Response::HTTP_BAD_REQUEST);
        }

    }



}