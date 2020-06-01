<?php


namespace App\Service;


use App\Entity\User;
use App\Entity\UserMessage;
use App\Repository\UserMessageRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserMessageService
{


    /**
     * @var UserMessageRepository
     */
    private $userMessageRepository;
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(UserMessageRepository $userMessageRepository, EntityManagerInterface $em)
    {

        $this->userMessageRepository = $userMessageRepository;
        $this->em = $em;
    }

    public function getAllMessages()
    {
        return $this->userMessageRepository->findAll();
    }

    public function getSingleMessage($messageId)
    {
        return $this->userMessageRepository->find($messageId);
    }


    public function notifyMessages(User $sender, User $receiver, string $message)
    {

        $userMsg = (new UserMessage())
            ->setIdMessageSender($sender)
            ->setIdMessageReceiver($receiver)
            ->setMessage($message)
            ->setSendAt(new \DateTime());
        $this->em->persist($userMsg);
        $this->em->flush();
        return $userMsg;

    }

    /**
     * @param User $user
     * @return UserMessage[]
     */
    public function forUser(User $user): array
    {
        $repository = $this->em->getRepository(UserMessage::class);
        return $repository->findRecentForUser($user);
    }
}