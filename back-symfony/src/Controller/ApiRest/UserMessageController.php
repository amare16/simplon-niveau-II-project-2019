<?php


namespace App\Controller\ApiRest;


use App\Entity\UserMessage;
use App\Repository\UserMessageRepository;
use App\Repository\UserRepository;
use App\Service\UserMessageService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMessageController extends AbstractFOSRestController
{
    /**
     * @var UserMessageService
     */
    private $userMessageService;
    /**
     * @var UserMessageRepository
     */
    private $userMessageRepository;

    public function __construct(UserMessageService $userMessageService, UserMessageRepository $userMessageRepository)
    {

        $this->userMessageService = $userMessageService;
        $this->userMessageRepository = $userMessageRepository;
    }

    /**
     * @Rest\Get("/receive-message")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function getSenderMessage(): View
    {
        $all_send_message = $this->userMessageService->getSenderMessage();

        return View::create($all_send_message, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/single-message-receive/{messageReceiveId<\d+>}")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function getSingleMessage(int $messageReceiveId): View
    {
        $single_message = $this->userMessageService->getSingleMessage($messageReceiveId);
    dd($single_message);
        if ($single_message) {
            return View::create($single_message, Response::HTTP_OK);
        } else {
            return View::create(["There is no message with this id"],
                Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Post("/send-message")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function postSendMessage(Request $request,
                                    EntityManagerInterface $entityManager, UserRepository $userRepository)
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $messageSender = $data['id_message_sender'];
        $messageReceiver = $data['id_message_receiver'];
        $message = $data['message'];

        $message_sender = $userRepository->findOneBy(['id' => $messageSender]);
        $message_receiver = $userRepository->findOneBy(['id' => $messageReceiver]);
        $userMessage = new UserMessage();
        $userMessage->setIdMessageSender($message_sender);
        $userMessage->setIdMessageReceiver($message_receiver);
        $userMessage->setMessage($message);
        $userMessage->setUser($user);


        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($userMessage);
            $entityManager->flush();
            return View::create("You added a message successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add a message!"], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Rest\Put("/edit-send-message/{sendMessageId<\d+>}")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function editSendMessage(int $sendMessageId, Request $request,
                                    EntityManagerInterface $entityManager, UserRepository $userRepository)
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $messageSender = $data['id_message_sender'];
        $messageReceiver = $data['id_message_receiver'];
        $message = $data['message'];

        $userMessage = $this->userMessageRepository->find($sendMessageId);

        if (!$userMessage) {
            throw new EntityNotFoundException('User message with id '.$sendMessageId.' does not exist!');
        }

        $message_sender = $userRepository->findOneBy(['id' => $messageSender]);
        $message_receiver = $userRepository->findOneBy(['id' => $messageReceiver]);
        $userMessage->setIdMessageSender($message_sender);
        $userMessage->setIdMessageReceiver($message_receiver);
        $userMessage->setMessage($message);
        $userMessage->setUser($user);


        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($userMessage);
            $entityManager->flush();
            return View::create("You modified a message successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to modify a message!"], Response::HTTP_BAD_REQUEST);
        }

    }


}