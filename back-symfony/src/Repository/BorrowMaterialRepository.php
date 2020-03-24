<?php

namespace App\Repository;

use App\Entity\BorrowMaterial;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method BorrowMaterial|null find($id, $lockMode = null, $lockVersion = null)
 * @method BorrowMaterial|null findOneBy(array $criteria, array $orderBy = null)
 * @method BorrowMaterial[]    findAll()
 * @method BorrowMaterial[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BorrowMaterialRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BorrowMaterial::class);
    }

    // /**
    //  * @return BorrowMaterial[] Returns an array of BorrowMaterial objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function findByCreatedAtField($start_date, $end_date)
    {
        return $this->createQueryBuilder('bm')
            ->andWhere('bm.start_date >= :startDate')
            ->andWhere('bm.end_date <= :endDate')
            ->setParameter('startDate', $start_date)
            ->setParameter('endDate', $end_date)
            ->orderBy('bm.start_date', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }

    /*
    public function findOneBySomeField($value): ?BorrowMaterial
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
