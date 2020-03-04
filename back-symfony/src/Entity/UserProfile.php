<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserProfileRepository")
 */
class UserProfile
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_user_profile")
     */
    private $content_about;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_user_profile")
     */
    private $content_aspiration;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("group_user_profile")
     */
    private $hobby;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", inversedBy="userProfile", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups("group_user_profile")
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

    public function setContentAbout(string $content_about): self
    {
        $this->content_about = $content_about;

        return $this;
    }

    public function getContentAspiration(): ?string
    {
        return $this->content_aspiration;
    }

    public function setContentAspiration(string $content_aspiration): self
    {
        $this->content_aspiration = $content_aspiration;

        return $this;
    }

    public function getHobby(): ?string
    {
        return $this->hobby;
    }

    public function setHobby(string $hobby): self
    {
        $this->hobby = $hobby;

        return $this;
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
}
