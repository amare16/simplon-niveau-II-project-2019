<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
/**
 * @ORM\Entity(repositoryClass="App\Repository\BorrowMaterialRepository")
 */
class BorrowMaterial
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_borrow_material")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("group_borrow_material")
     */
    private $start_date;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("group_borrow_material")
     */
    private $end_date;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="borrowMaterials")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("group_borrow_material")
     */
    private $id_borrower;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="lendMaterials")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("group_borrow_material")
     */
    private $id_lender;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Material", inversedBy="borrowMaterial", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups("group_borrow_material")
     */
    private $material;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTimeInterface $start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(\DateTimeInterface $end_date): self
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getIdBorrower(): ?User
    {
        return $this->id_borrower;
    }

    public function setIdBorrower(?User $id_borrower): self
    {
        $this->id_borrower = $id_borrower;

        return $this;
    }

    public function getIdLender(): ?User
    {
        return $this->id_lender;
    }

    public function setIdLender(?User $id_lender): self
    {
        $this->id_lender = $id_lender;

        return $this;
    }

    public function getMaterial(): ?Material
    {
        return $this->material;
    }

    public function setMaterial(Material $material): self
    {
        $this->material = $material;

        return $this;
    }
}
