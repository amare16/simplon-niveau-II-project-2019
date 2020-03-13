<?php


namespace App\Controller\ApiRest;


use App\Entity\Material;
use App\Repository\MaterialRepository;
use App\Service\MaterialService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;


class MaterialController extends AbstractFOSRestController
{

    /**
     * @var MaterialService
     */
    private $materialService;
    /**
     * @var JWTEncoderInterface
     */
    private $JWTEncoder;
    /**
     * @var MaterialRepository
     */
    private $materialRepository;

    public function __construct(MaterialService $materialService,
                                JWTEncoderInterface $JWTEncoder, MaterialRepository $materialRepository)
    {

        $this->materialService = $materialService;
        $this->JWTEncoder = $JWTEncoder;
        $this->materialRepository = $materialRepository;
    }

    /**
     * @Rest\Get("/materials")
     * @Rest\View(serializerGroups={"group_material"})
     */
    public function getAllMaterials(): View
    {
        $all_materials = $this->materialService->getAllMaterials();

        return View::create($all_materials, Response::HTTP_OK);
    }

    /**
     * @Rest\Get("/single-material/{materialId<\d+>}")
     * @Rest\View(serializerGroups={"group_material"})
     */
    public function getSingleMaterial(int $materialId): View
    {
        $single_material = $this->materialService->getSingleMaterial($materialId);

        if ($single_material) {
            return View::create($single_material, Response::HTTP_OK);
        } else {
            return View::create(["There is no material with this id"],
                Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Post("/add-material")
     * @Rest\View(serializerGroups={"group_material"})
     */
    public function addMaterial(Request $request, EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $name = $data['name'];
        $description = $data['description'];
        $availability = $data['availability'];

        $material = new Material();
        $material->setName($name);
        $material->setDescription($description);
        $material->setAvailability($availability);


        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($material);
            $entityManager->flush();
            return View::create("You added a material successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add a material!"], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Rest\Put("/edit-material/{materialId<\d+>}")
     * @Rest\View(serializerGroups={"group_material"})
     */
    public function editMaterial(int $materialId, Request $request, EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $name = $data['name'];
        $description = $data['description'];
        $availability = $data['availability'];

        $material = $this->materialRepository->find($materialId);

        if (!$material) {
            throw new EntityNotFoundException('Material with id '.$materialId.' does not exist!');
        }

        $material->setName($name);
        $material->setDescription($description);
        $material->setAvailability($availability);

        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($material);
            $entityManager->flush();
            return View::create("You modified a material successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to modify a material!"], Response::HTTP_BAD_REQUEST);
        }

    }
}