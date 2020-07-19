<?php


namespace App\Service;



use App\Repository\CommentExperienceRepository;

class CommentExperienceService
{

    /**
     * @var CommentExperienceRepository
     */
    private $commentExperienceRepository;

    public function __construct(CommentExperienceRepository $commentExperienceRepository)
    {

        $this->commentExperienceRepository = $commentExperienceRepository;
    }

    public function getAllCommentExperiences()
    {
        return $this->commentExperienceRepository->findAll();
    }

    public function getSingleCommentExperience($commentExperienceId)
    {
        return $this->commentExperienceRepository->find($commentExperienceId);
    }
}