<?php

namespace App\Service;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bridge\Doctrine\RegistryInterface;


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

    public function __construct(ArticleRepository $articleRepository, EntityManagerInterface $entityManager)
    {
        $this->articleRepository = $articleRepository;
        $this->entityManager = $entityManager;
    }

    public function getAllArticles()
    {
        return $this->articleRepository->findAll();
    }

    public function addArticles($title, $content, $published_at)
    {
        $articles = new Article();
        $articles->setTitle($title);
        $articles->setContent($content);
        $articles->setPublishedAt($published_at);

        $this->manager->persist($articles);
        $this->manager->flush();
        return $articles;
    }

}