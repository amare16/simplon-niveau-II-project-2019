<?php


namespace App\Service;


use App\Repository\UserMessageRepository;

class UserMessageService
{


    /**
     * @var UserMessageRepository
     */
    private $userMessageRepository;

    public function __construct(UserMessageRepository $userMessageRepository)
    {

        $this->userMessageRepository = $userMessageRepository;
    }

    public function getAllMessages()
    {
        return $this->userMessageRepository->findAll();
    }

    public function getSingleMessage($messageId)
    {
        return $this->userMessageRepository->find($messageId);
    }
}