<?php


namespace App\Controller\ApiRest;


use App\Service\ContactService;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Mailer\MailerInterface;

class ContactController extends AbstractFOSRestController
{

    /**
     * @var ContactService
     */
    private $contactService;
    /**
     * @var MailerInterface
     */
    private $mailer;

    public function __construct(ContactService $contactService, MailerInterface $mailer)
    {
        $this->contactService = $contactService;
        $this->mailer = $mailer;
    }

    /**
     * @Rest\Get("/contacts", name="api.contact")
     */
    public function getAllContacts()
    {
        $all_contacts = $this->contactService->getAllContacts();

        return View::create($all_contacts, Response::HTTP_OK);
    }

    /**
     * @Rest\Post("/send-email", name="api.sendMail")
     */

    public function sendMail(MailerInterface $mailer) {
        $sendMail = $this->contactService->sendMail(MailerInterface::class);
        //dd($sendMail);
        return View::create($sendMail, Response::HTTP_OK);
    }
}