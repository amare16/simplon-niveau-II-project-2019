<?php


namespace App\Service;

use App\Repository\MaterialBorrowerMessageRepository;


class MaterialBorrowerMessageService
{

    /**
     * @var MaterialBorrowerMessageRepository
     */
    private $materialBorrowerMessageRepository;

    public function __construct(MaterialBorrowerMessageRepository $materialBorrowerMessageRepository) {

        $this->materialBorrowerMessageRepository = $materialBorrowerMessageRepository;
    }

    public function getAllMaterialBorrowerMessages() {
        return $this->materialBorrowerMessageRepository->findAll();
    }

}