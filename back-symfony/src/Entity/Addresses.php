<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AddressesRepository")
 */
class Addresses
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=3, name="region_code", nullable=true)
     */
    private $region_code;

    /**
     * @ORM\Column(type="string", length=255, name="region_name", nullable=true)
     */
    private $region_name;

    /**
     * @ORM\Column(type="string", length=3, name="department_number", nullable=true)
     */
    private $department_number;

    /**
     * @ORM\Column(type="string", length=255, name="department_name", nullable=true)
     */
    private $department_name;

    /**
     * @ORM\Column(type="string", length=255, name="city", nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=5, name="zip_code", nullable=true)
     */
    private $zip_code;

//    /**
//     * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="addresses")
//     */
//    private $users;

    public function __construct()
    {
        //$this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRegionCode(): ?string
    {
        return $this->region_code;
    }

    public function setRegionCode(?string $region_code): self
    {
        $this->region_code = $region_code;

        return $this;
    }

    public function getRegionName(): ?string
    {
        return $this->region_name;
    }

    public function setRegionName(?string $region_name): self
    {
        $this->region_name = $region_name;

        return $this;
    }

    public function getDepartmentNumber(): ?string
    {
        return $this->department_number;
    }

    public function setDepartmentNumber(?string $department_number): self
    {
        $this->department_number = $department_number;

        return $this;
    }

    public function getDepartmentName(): ?string
    {
        return $this->department_name;
    }

    public function setDepartmentName(?string $department_name): self
    {
        $this->department_name = $department_name;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zip_code;
    }

    public function setZipCode(?string $zip_code): self
    {
        $this->zip_code = $zip_code;

        return $this;
    }

//    /**
//     * @return Collection|User[]
//     */
//    public function getUsers(): Collection
//    {
//        return $this->users;
//    }
//
//    public function addUser(User $user): self
//    {
//        if (!$this->users->contains($user)) {
//            $this->users[] = $user;
//            $user->setAddresses($this);
//        }
//
//        return $this;
//    }
//
//    public function removeUser(User $user): self
//    {
//        if ($this->users->contains($user)) {
//            $this->users->removeElement($user);
//            // set the owning side to null (unless already changed)
//            if ($user->getAddresses() === $this) {
//                $user->setAddresses(null);
//            }
//        }
//
//        return $this;
//    }

}
