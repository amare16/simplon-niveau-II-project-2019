<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
//use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserProfileRepository")
 * @Vich\Uploadable()
 */
class UserProfile implements \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     * @Groups("group_borrow_material")
     * @Groups("group_user_message")
     * @Groups("group_material")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $content_about;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     *
     */
    private $content_aspiration;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $hobby;

    /**
     * @var string|null
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $filename;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="user_profile_image", fileNameProperty="filename")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $imageFile;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $created_on;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @var \DateTimeInterface|null
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $updated_at;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", inversedBy="userProfile", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups("group_user_profile")
     *
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContentAbout(): ?string
    {
        return $this->content_about;
    }

    public function setContentAbout(?string $content_about): self
    {
        $this->content_about = $content_about;
        //dd($content_about);

        return $this;
    }

    public function getContentAspiration(): ?string
    {
        return $this->content_aspiration;
    }

    public function setContentAspiration(?string $content_aspiration): self
    {
        $this->content_aspiration = $content_aspiration;

        return $this;
    }

    public function getHobby(): ?string
    {
        return $this->hobby;
    }

    public function setHobby(?string $hobby): self
    {
        $this->hobby = $hobby;

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
     * @return UserProfile
     */
    public function setFilename(?string $filename): UserProfile
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



    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCreatedOn(): ?\DateTimeInterface
    {
        return $this->created_on;
    }

    public function setCreatedOn(?\DateTimeInterface $created_on): self
    {
        $this->created_on = $created_on;

        return $this;
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
     * @return UserProfile
     */
    public function setUpdatedAt(?\DateTimeInterface $updated_at): UserProfile
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


}
