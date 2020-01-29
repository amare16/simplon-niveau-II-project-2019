<?php


namespace App\Service;


use App\Entity\Contact;
use App\Repository\ContactRepository;
use Symfony\Component\HttpFoundation\Request;
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

    public function sendMail(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $first_name = $data['firstName'];
        $last_name = $data['lastName'];
        $subject = $data['subject'];
        $message = $data['message'];

        $contact = new Contact();
        $contact->setEmail($email);
        $contact->setFirstName($first_name);
        $contact->setLastName($last_name);
        $contact->setSubject($subject);
        $contact->setMessage($message);



        $email = (new Email())
            ->from($contact->getEmail())
//            ->from($contact->getFirstName())
//            ->from($contact->getLastName())
            ->to('yayne16@gmail.com')
            ->subject($contact->getSubject())
            ->html($contact->getFirstName(). ' ' .$contact->getLastName().'<br><br>'.$contact->getMessage());

//dd($email);

        $this->mailer->send($email);
    }

}