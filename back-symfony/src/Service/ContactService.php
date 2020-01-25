<?php


namespace App\Service;


use App\Entity\Contact;
use App\Repository\ContactRepository;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;


class ContactService
{

    /**
     * @var ContactRepository
     */
    private $contactRepository;
    /**
     * @var MailerInterface
     */
    private $mailer;


    public function __construct(ContactRepository $contactRepository, MailerInterface $mailer)
    {

        $this->contactRepository = $contactRepository;
        $this->mailer = $mailer;
    }

    public function getAllContacts()
    {
        return $this->contactRepository->findAll();
    }

    public function sendMail()
    {
        $contact = new Contact();

        $email = (new Email())
            ->from('test@gmail.com')
            ->to('yayne16@gmail.com')
            ->subject('Hello Agro Interest')
            ->text('It is my first message');

        $this->mailer->send($email);
    }

}