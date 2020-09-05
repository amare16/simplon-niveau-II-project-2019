<?php


namespace App\EventListener;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
//use Symfony\Component\Security\Core\Event\AuthenticationEvent;
use Symfony\Component\HttpFoundation\Request;


class LoginListener
{

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {

        $this->entityManager = $entityManager;
    }

    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event)
    {
        // Get the User entity.





        $user = $event->getAuthenticationToken()->getUser();
        //dump($user);
        //dd(method_exists($user, 'setUserConnected'));

        // Update your field here.
        $user->setUserConnected(true);
        $user->setLastLoginAt(new \DateTime("now"));


        // Persist the data to database.
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}