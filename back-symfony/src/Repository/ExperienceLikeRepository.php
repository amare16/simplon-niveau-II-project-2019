<?php

namespace App\Repository;

use App\Entity\ExperienceLike;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ExperienceLike|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExperienceLike|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExperienceLike[]    findAll()
 * @method ExperienceLike[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExperienceLikeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExperienceLike::class);
    }

    // /**
    //  * @return ExperienceLike[] Returns an array of ExperienceLike objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ExperienceLike
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
