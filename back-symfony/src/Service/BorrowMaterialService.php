<?php


namespace App\Service;


use App\Repository\BorrowMaterialRepository;

class BorrowMaterialService
{

    /**
     * @var BorrowMaterialRepository
     */
    private $borrowMaterialRepository;

    public function __construct(BorrowMaterialRepository $borrowMaterialRepository)
    {
        $this->borrowMaterialRepository = $borrowMaterialRepository;
    }

    public function getAllBorrowedMaterial()
    {
        return $this->borrowMaterialRepository->findAll();
    }
}