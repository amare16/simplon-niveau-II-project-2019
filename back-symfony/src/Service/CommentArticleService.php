<?php


namespace App\Service;


use App\Repository\CommentArticleRepository;

class CommentArticleService
{

    /**
     * @var CommentArticleRepository
     */
    private $commentArticleRepository;

    public function __construct(CommentArticleRepository $commentArticleRepository)
    {

        $this->commentArticleRepository = $commentArticleRepository;
    }

    public function getAllComment()
    {
        return $this->commentArticleRepository->findAll();
    }
}