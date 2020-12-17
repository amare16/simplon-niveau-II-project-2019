<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MaterialRepository")
 * @Vich\Uploadable()
 */
class Material implements \Serializable
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
     * @ORM\Column(type="datetime", nullable= true)
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $created_on;

    /**
     * @var string|null
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $filename;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="material_image", fileNameProperty="filename")
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     */
    private $imageFile;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @var \DateTimeInterface|null
     * @Groups("group_material")
     * @Groups("group_borrow_material")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $updated_at;

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

    public function getCreatedOn(): ?\DateTimeInterface
    {
        return $this->created_on;
    }

    public function setCreatedOn(\DateTimeInterface $created_on): self
    {
        $this->created_on = $created_on;

        return $this;
    }

    /**
    * @return string|null
    */
    public function getFilename(): ?string
    {
        return $this->filename;
    }

    /**
     * @param string|null $filename
     * @return Material
     */
    public function setFilename(?string $filename): Material
    {
        $this->filename = $filename;
        return $this;
    }

    /**
     * @return File|null
     */
    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
     */
    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            $this->updated_at = new \DateTimeImmutable();
        }
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    /**
     * @param \DateTimeInterface|null $updated_at
     * @return Material
     */
    public function setUpdatedAt(?\DateTimeInterface $updated_at): Material
    {
        $this->updated_at = $updated_at;
        return $this;
    }

    public function serialize()
    {
        $this->imageFile = base64_encode($this->imageFile);
    }

    public function unserialize($serialized)
    {
        $this->imageFile = base64_decode($this->imageFile);
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
