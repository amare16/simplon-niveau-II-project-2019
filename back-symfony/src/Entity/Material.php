<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MaterialRepository")
 */
class Material
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("group_material")
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_material")
     */
    private $description;

    /**
     * @ORM\Column(type="boolean")
     * @Groups("group_material")
     */
    private $availability;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\BorrowMaterial", mappedBy="materail", cascade={"persist", "remove"})
     */
    private $borrowMaterial;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getAvailability(): ?bool
    {
        return $this->availability;
    }

    public function setAvailability(bool $availability): self
    {
        $this->availability = $availability;

        return $this;
    }

    public function getBorrowMaterial(): ?BorrowMaterial
    {
        return $this->borrowMaterial;
    }

    public function setBorrowMaterial(BorrowMaterial $borrowMaterial): self
    {
        $this->borrowMaterial = $borrowMaterial;

        // set the owning side of the relation if necessary
        if ($borrowMaterial->getIdMaterail() !== $this) {
            $borrowMaterial->setIdMaterail($this);
        }

        return $this;
    }
}
