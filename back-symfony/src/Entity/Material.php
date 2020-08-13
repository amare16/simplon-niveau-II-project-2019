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
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     */
    private $description;

    /**
     * @ORM\Column(type="boolean")
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $availability;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\BorrowMaterial", mappedBy="material", cascade={"persist", "remove"})
     */
    private $borrowMaterial;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="materials")
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     */
    private $user;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $borrowed_date;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $return_date;

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
        if ($borrowMaterial->getIdMaterial() !== $this) {
            $borrowMaterial->setIdMaterial($this);
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getBorrowedDate(): ?\DateTimeInterface
    {
        return $this->borrowed_date;
    }

    public function setBorrowedDate(?\DateTimeInterface $borrowed_date): self
    {
        $this->borrowed_date = $borrowed_date;

        return $this;
    }

    public function getReturnDate(): ?\DateTimeInterface
    {
        return $this->return_date;
    }

    public function setReturnDate(?\DateTimeInterface $return_date): self
    {
        $this->return_date = $return_date;

        return $this;
    }

}
