<?php


namespace App\Controller\ApiRest;


use App\Entity\User;
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
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

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
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var MailerInterface
     */
    private $mailer;


    public function __construct(UserMessageService $userMessageService,
                                UserMessageRepository $userMessageRepository,
                                UserRepository $userRepository, MailerInterface $mailer,
                                EntityManagerInterface $entityManager)
    {

        $this->userMessageService = $userMessageService;
        $this->userMessageRepository = $userMessageRepository;
        $this->userRepository = $userRepository;
        $this->mailer = $mailer;
    }

    /**
     * @Rest\Get("/messages")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function getAllMessages(): View
    {
        $all_messages = $this->userMessageService->getAllMessages();

        return View::create($all_messages, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/single-message/{messageId<\d+>}")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function getSingleMessage(int $messageId): View
    {
        $single_message = $this->userMessageService->getSingleMessage($messageId);
    
        if ($single_message) {
            return View::create($single_message, Response::HTTP_OK);
        } else {
            return View::create(["There is no message with this id"],
                Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Get("/user-message")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function getMessageByUser(Request $request, UserRepository $userRepository)
    {

        $user1FromRepo = $userRepository->findByUsername($request->query->get('user1'));
        //dd(gettype($user1FromRepo)); --> array
        $user2FromRepo = $userRepository->findByUsername($request->query->get('user2'));
        //dd($user2FromRepo);
        //dd($this->userMessageRepository->findByUser($user1FromRepo));
        $qb = $this->userMessageRepository->findByUser($user1FromRepo, $user2FromRepo);
        dd($qb);

    }

    /**
     * @Rest\Post("/send-message")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function postSendMessage(Request $request,
                                    EntityManagerInterface $entityManager,
                                    UserRepository $userRepository)
    {
        $user = $this->getUser();
        //dd($user);
        //dd($this->getUser()->getCity());
        $data = json_decode($request->getContent(), true);
        //dd($data);
        $messageSender = $data['id_message_sender']['username'];

        $messageReceiver = $data['id_message_receiver']['username'];
        $message = $data['message'];
        //$sendTime = $data['send_at'];

        $message_sender = $userRepository->findOneBy(['username' => $messageSender]);
        $message_receiver = $userRepository->findOneBy(['username' => $messageReceiver]);


        $userMessage = new UserMessage();
        $userMessage->setIdMessageSender($message_sender);
        $userMessage->setIdMessageReceiver($message_receiver);
        $userMessage->setMessage($message);
        $userMessage->setSendAt(new \DateTime('now'));
        //$userMessage->setSendAt(\DateTime::createFromFormat("Y-m-d",$sendTime));
        //$userMessage->setUser($user);


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
        dd($userMessage);


        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($userMessage);
            $entityManager->flush();
            return View::create("You modified a message successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to modify a message!"], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Rest\Get("/test-send-message")
     * @Rest\View(serializerGroups={"group_user_message"})
     */
    public function testSendMessage(Request $request,
                                    MailerInterface $mailer,
                                    EntityManagerInterface $entityManager,
                                    UserRepository $userRepository, UserMessageRepository $userMessageRepository
                                    )
    {
        $task = "list";
        if (array_key_exists("task", $_GET)) {
            $task = $_GET['task'];
        }
        if ($task == 'write') {
            $this->postSendMessage();
        } else {
            $all = $this->getAllMessages();
            dd($all);
        }
    }

    /**
     * @Rest\Get("/nofify-message")
     * @Rest\View(serializerGroups={"group_user_message"})
     *
     * @param UserMessageService $userMessageService
     * @return View
     */

    public function notifyMessages(UserMessageService $userMessageService,
                                   UserRepository $userRepository,
                                   UserMessageRepository $userMessageRepository): View
    {

        $sender = $userRepository->find(89);
        //dd($sender);

        $receiver = $userRepository->find(90);
        $message = $userMessageRepository->findOneBy(['message' => "blallalala!"]);
        dd($message);

        $notify = $userMessageService->notifyMessages($sender, $receiver, $message);

        return View::create($notify, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/notification", name="notification")
     * @Rest\View(serializerGroups={"group_user_message"})
     *
     * @param UserMessageService $userMessageService
     * @param User
     * @return View
     */

    public function displayNotificationMessage(UserRepository $userRepository, UserMessageService $userMessageService): View
    {

        $notification = $userMessageService->forUser($this->getUser());
        //dd($notification);
        return View::create($notification, Response::HTTP_OK);
    }





}