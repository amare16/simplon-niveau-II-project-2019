<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ExperienceRepository")
 * @Vich\Uploadable()
 */
class Experience implements \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_experience")
     * @Groups("group_comment_experience")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("group_experience")
     * @Groups("group_comment_experience")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_experience")
     * @Groups("group_comment_experience")
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("group_experience")
     * @Groups("group_comment_experience")
     */
    private $published_at;

    /**
     * @var string|null
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("group_experience")
     * @Groups("group_comment_experience")
     */
    private $filename;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="experience_image", fileNameProperty="filename")
     * @Groups("group_experience")
     * @Groups("group_comment_experience")
     */
    private $imageFile;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @var \DateTimeInterface|null
     * @Groups("group_experience")
     * @Groups("group_comment_experience")
     */
    private $updated_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="experiences")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("group_experience")
     * @Groups("group_comment_experience")
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CommentExperience", mappedBy="experience")
     * @Groups("group_experience")
     */
    private $commentExperiences;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ExperienceLike", mappedBy="experience")
     * @Groups("group_experience")
     */
    private $experienceLikes;

    public function __construct()
    {
        $this->commentExperiences = new ArrayCollection();
        $this->experienceLikes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeInterface
    {
        return $this->published_at;
    }

    public function setPublishedAt(\DateTimeInterface $published_at): self
    {
        $this->published_at = $published_at;

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

    /**
     * @return Collection|CommentExperience[]
     */
    public function getCommentExperiences(): Collection
    {
        return $this->commentExperiences;
    }

    public function addCommentExperience(CommentExperience $commentExperience): self
    {
        if (!$this->commentExperiences->contains($commentExperience)) {
            $this->commentExperiences[] = $commentExperience;
            $commentExperience->setExperience($this);
        }

        return $this;
    }

    public function removeCommentExperience(CommentExperience $commentExperience): self
    {
        if ($this->commentExperiences->contains($commentExperience)) {
            $this->commentExperiences->removeElement($commentExperience);
            // set the owning side to null (unless already changed)
            if ($commentExperience->getExperience() === $this) {
                $commentExperience->setExperience(null);
            }
        }

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
     * @return Experience
     */
    public function setFilename(?string $filename): Experience
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
     * @return Experience
     */
    public function setUpdatedAt(?\DateTimeInterface $updated_at): Experience
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

    /**
     * @return Collection|ExperienceLike[]
     */
    public function getExperienceLikes(): Collection
    {
        return $this->experienceLikes;
    }

    public function addExperienceLike(ExperienceLike $experienceLike): self
    {
        if (!$this->experienceLikes->contains($experienceLike)) {
            $this->experienceLikes[] = $experienceLike;
            $experienceLike->setExperience($this);
        }

        return $this;
    }

    public function removeExperienceLike(ExperienceLike $experienceLike): self
    {
        if ($this->experienceLikes->contains($experienceLike)) {
            $this->experienceLikes->removeElement($experienceLike);
            // set the owning side to null (unless already changed)
            if ($experienceLike->getExperience() === $this) {
                $experienceLike->setExperience(null);
            }
        }

        return $this;
    }





    /**
     * lets you know if this experience is "like" by a user
     *
     * @param User $user
     * @return boolean
     */
    public function isLikedByUser(User $user): bool
    {
        foreach ($this->experienceLikes as $like)
        {
            if ($like->getUser() === $user) {
                return true;
            }
        }
        return false;
    }
}
