<?php


namespace App\Controller\ApiRest;


use App\Service\UserTypeService;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;

class UserTypeController extends AbstractFOSRestController
{
    /**
     * @var UserTypeService
     */
    private $userTypeService;

    public function __construct(UserTypeService $userTypeService)
    {
        $this->userTypeService = $userTypeService;
    }

    /**
     * @Rest\Get("/usertype", name="api.usertype")
     * @Rest\View(serializerGroups={"group_userType"})
     */
    public function getAllUserType(): View
    {
        $all_user_type = $this->userTypeService->getAllUserType();

        return View::create($all_user_type, Response::HTTP_OK);
    }
}