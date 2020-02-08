<?php

namespace App\Service;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\Persistence\ManagerRegistry;
use FOS\RestBundle\View\View;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;



class ArticlesService
{
    /**
     * @var ArticleRepository
     */
    private $articleRepository;

    /**
     * @var ManagerRegistry
     */
    private $managerRegistry;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(ArticleRepository $articleRepository, EntityManagerInterface $entityManager,
                                UserRepository $userRepository, ValidatorInterface $validator)
    {
        $this->articleRepository = $articleRepository;
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->validator = $validator;
    }

    public function getAllArticles()
    {
        return $this->articleRepository->findAll();
    }

//    public function addArticle($title, $content, $user_id, EntityManagerInterface $entityManager)
//    {
//        $article = new Article();
//        $article->setTitle($title);
//        $article->setContent($content);
//        $article->setPublishedAt(new  \DateTime());
//        $user_id = $this->userRepository->findOneBy(['id' => $user_id['id']]);
//        $article->setUser($user_id);
//        dd($article);
//
//        $errors = $this->validator->validate($article);
//        if (count($errors) > 0) {
//            $errorsString = (string) $errors;
//            return $errorsString;
//        }
//
//        if(in_array('ROLE_USER', $article->getUser()->getRoles(), true)) {
//            $entityManager->persist($article);
//            $entityManager->flush();
//            return View::create("You added an article successfully!", Response::HTTP_OK);
//        } else {
//            return View::create(["You are not a user! So please register to add an article!"], Response::HTTP_BAD_REQUEST);
//        }
//
//
//
//    }
//
//    public function modifyArticle(int $articleId, $title, $content, $user_id)
//    {
//        $article = $this->articleRepository->find($articleId);
//        if (!$article) {
//            throw new EntityNotFoundException('Article with id '.$article.' does not exist!');
//        }
//        $article->setTitle($title);
//        $article->setContent($content);
//        $article->setPublishedAt(new  \DateTime());
//        $user_id = $this->userRepository->findOneBy(['id' => $user_id['id']]);
//        $article->setUser($user_id);
//
//        $this->entityManager->persist($article);
//        $this->entityManager->flush();
//        return $article;
//    }
//
//    public function delete(int $articleId)
//    {
//        $article = $this->articleRepository->find($articleId);
//        if (!$article) {
//            throw new EntityNotFoundException('Article with id '.$article.' does not exist!');
//        }
//
//        $this->entityManager->remove($article);
//        $this->entityManager->flush();
//    }

}