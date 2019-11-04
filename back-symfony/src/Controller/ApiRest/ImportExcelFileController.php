<?php


namespace App\Controller\ApiRest;

use App\Entity\Addresses;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ImportExcelFileController
{
    /**
     * @Route("/excel-addresses", name="import_addresses")
     */
    public function importAddresses(ObjectManager $manager): Response
    {
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
        $reader->setReadDataOnly(true);
        $excelFilePath = '../public/ile_de_france_depts_villes.xlsx';
        $spreadsheet = $reader->load($excelFilePath);
        $worksheet = $spreadsheet->getActiveSheet();
        $rows = $worksheet->toArray();
        array_shift($rows);
        //dd($rows);
        //print "<pre>";print_r($rows); print "</pre>";
        foreach($rows as $row) {
            $addresses = new Addresses();
            $addresses->setRegionCode($row[0]);
            $addresses->setRegionName($row[1]);
            $addresses->setDepartmentNumber($row[2]);
            $addresses->setDepartmentName($row[3]);
            $addresses->setCity($row[4]);
            $addresses->setZipCode($row[5]);
            $manager->persist($addresses);
        }
        $manager->flush();


        return new Response("successful");
    }

}