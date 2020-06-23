<?php


namespace App\Controller\ApiRest;


use App\Repository\MaterialRepository;
use App\Repository\UserRepository;
use App\Entity\BorrowMaterial;
use App\Service\BorrowMaterialService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class BorrowMateralController extends AbstractFOSRestController
{

    /**
     * @var BorrowMaterialService
     */
    private $borrowMaterialService;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var MaterialRepository
     */
    private $materialRepository;

    public function __construct(BorrowMaterialService $borrowMaterialService,
                                UserRepository $userRepository,
                                MaterialRepository $materialRepository,
                                EntityManagerInterface $entityManager)
    {
        $this->borrowMaterialService = $borrowMaterialService;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->materialRepository = $materialRepository;
    }

    /**
     * @Rest\Get("/borrow-materials")
     * @Rest\View(serializerGroups={"group_borrow_material"})
     */
    public function getAllBorrowedMaterial(): View
    {
        $all_borrowed_material = $this->borrowMaterialService->getAllBorrowedMaterial();

        return View::create($all_borrowed_material, Response::HTTP_OK);

    }

    /**
     * @Rest\Get("/single-borrowed-material/{borrowedMaterialId<\d+>}")
     * @Rest\View(serializerGroups={"group_borrow_material"})
     */
    public function getSingleBorrowedMaterial($borrowedMaterialId): View
    {
        $single_borrowed_material = $this->borrowMaterialService->getSingleComment($borrowedMaterialId);
        if ($single_borrowed_material) {
            return View::create($single_borrowed_material, Response::HTTP_OK);
        } else {
            return View::create(["There is no borrowed material with this id"],
                Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Rest\Post("/add-borrow-material")
     * @Rest\View(serializerGroups={"group_borrow_material"})
     */
    public function addBorrowMaterial(Request $request,
                                      UserRepository $userRepository,
                                      MaterialRepository $materialRepository,
                                      EntityManagerInterface $entityManager): View
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        $materialBorrower= $data['id_borrower']['username'];
        $materialLender = $data['id_lender']['username'];
        $startDate = $data['start_date'];
        $endDate = $data['end_date'];
        $material = $data['material'];

        $material_borrower = $userRepository->findOneBy(['username' => $materialBorrower]);

        $material_lender = $userRepository->findOneBy(['username' => $materialLender]);

//        $material_borrower = $userRepository->findOneBy(['id' => $materialBorrower]);
//        $material_lender = $userRepository->findOneBy(['id' => $materialLender]);
        //dd($material_lender);
        $material_id = $materialRepository->findOneBy(['id' => $material]);

        $materialBorrowerLender = new BorrowMaterial();
        $materialBorrowerLender->setIdBorrower($material_borrower);
        $materialBorrowerLender->setIdLender($material_lender);
        $materialBorrowerLender->setStartDate(\DateTime::createFromFormat('Y-m-d', $startDate));
        $materialBorrowerLender->setEndDate(\DateTime::createFromFormat('Y-m-d', $endDate));
        $materialBorrowerLender->setMaterial($material_id);

        if(in_array('ROLE_USER', $user->getRoles())) {
            $entityManager->persist($materialBorrowerLender);
            $entityManager->flush();
            return View::create("You added borrowed information successfully!", Response::HTTP_OK);
        } else {
            return View::create(["You are not a user! So please register to add borrowed information!"], Response::HTTP_BAD_REQUEST);
        }

    }
}