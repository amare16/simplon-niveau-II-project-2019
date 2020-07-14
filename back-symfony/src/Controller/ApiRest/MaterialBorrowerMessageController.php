<?php


namespace App\Controller\ApiRest;

use App\Entity\MaterialBorrowerMessage;
use App\Repository\UserRepository;
use App\Service\MaterialBorrowerMessageService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Response;


class MaterialBorrowerMessageController extends AbstractFOSRestController
{

    /**
     * @var MaterialBorrowerMessageService
     */
    private $materialBorrowerMessageService;

    public function __construct(MaterialBorrowerMessageService $materialBorrowerMessageService) {

        $this->materialBorrowerMessageService = $materialBorrowerMessageService;
    }

    /**
     * @Rest\Get("/material-borrower-messages")
     * @Rest\View(serializerGroups={"group_material_borrower_message"})
     */
    public function getAllMaterialBorrowerMessages(): View
    {
        $all_material_borrower_messages = $this->materialBorrowerMessageService->getAllMaterialBorrowerMessages();
        //dd($all_material_borrower_messages);
       return View::create($all_material_borrower_messages, Response::HTTP_OK);
    }

    /**
     * @Rest\Post("/add-material-borrower-message")
     * @Rest\View(serializerGroups={"group_material_borrower_message"})
     */
    public function addMaterialBorrowerMessage(Request $request,
                                               EntityManagerInterface $entityManager,
                                               UserRepository $userRepository)
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        $sender_message = $data['senderMessageId']['username'];
        $receiver_message = $data['receiverMessageId']['username'];
        $message = $data['message'];

        $senderMessage = $userRepository->findOneBy(['username' => $sender_message]);
        $receiverMessage = $userRepository->findOneBy(['username' => $receiver_message]);

        $materialBorrowerMessage = new MaterialBorrowerMessage();
        $materialBorrowerMessage->setSenderMessageId($senderMessage);
        $materialBorrowerMessage->setReceiverMessageId($receiverMessage);
        $materialBorrowerMessage->setMessage($message);
        $materialBorrowerMessage->setSendAt(new \DateTime('now'));
        $materialBorrowerMessage->setUser($user);

        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($materialBorrowerMessage);
            $entityManager->flush();
            return View::create("You added a message successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add a message!"], Response::HTTP_BAD_REQUEST);
        }
    }
}