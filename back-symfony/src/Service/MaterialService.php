<?php


namespace App\Service;


use App\Repository\MaterialRepository;

class MaterialService
{

    /**
     * @var MaterialRepository
     */
    private $materialRepository;

    public function __construct(MaterialRepository $materialRepository)
    {
        $this->materialRepository = $materialRepository;
    }

    public function getAllMaterials()
    {
        return $this->materialRepository->findAll();
    }

    public function getSingleMaterial($materialId)
    {
        return $this->materialRepository->find($materialId);
    }
}