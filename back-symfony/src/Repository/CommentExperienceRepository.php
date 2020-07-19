<?php

namespace App\Repository;

use App\Entity\CommentExperience;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method CommentExperience|null find($id, $lockMode = null, $lockVersion = null)
 * @method CommentExperience|null findOneBy(array $criteria, array $orderBy = null)
 * @method CommentExperience[]    findAll()
 * @method CommentExperience[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommentExperienceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CommentExperience::class);
    }

    // /**
    //  * @return CommentExperience[] Returns an array of CommentExperience objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CommentExperience
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
