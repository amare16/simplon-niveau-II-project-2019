<?php

namespace App\Repository;

use App\Entity\Addresses;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Addresses|null find($id, $lockMode = null, $lockVersion = null)
 * @method Addresses|null findOneBy(array $criteria, array $orderBy = null)
 * @method Addresses[]    findAll()
 * @method Addresses[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AddressesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Addresses::class);
    }

    // /**
    //  * @return Addresses[] Returns an array of Addresses objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Addresses
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
