<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\UserMessage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method UserMessage|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserMessage|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserMessage[]    findAll()
 * @method UserMessage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserMessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserMessage::class);
    }

    // /**
    //  * @return UserMessage[] Returns an array of UserMessage objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserMessage
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    /*
     * @return UserMessage[]
     */

    public function findByUser(User $user1, User $user2): array
    {
        return $this->createQueryBuilder('um')
            ->andWhere('um.id_message_sender = :user1 AND um.id_message_receiver = :user2')
            ->orWhere('um.id_message_sender = :user2 AND um.id_message_receiver = :user1')
            ->setParameter('user1', $user1)
            ->setParameter('user2', $user2)
            ->getQuery()
            ->getResult();
    }

    /**
     * @param User $user
     * @return UserMessage[]
     */

    public function findRecentForUser(User $user): array
    {
        return $this->createQueryBuilder('msg')
            ->orderBy('msg.send_at', 'DESC')
            ->setMaxResults(10)
            ->where('msg.user = :user')
            ->orWhere('msg.user IS NULL')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }
}
