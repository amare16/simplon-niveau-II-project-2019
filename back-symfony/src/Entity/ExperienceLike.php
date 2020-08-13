<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ExperienceLikeRepository")
 */
class ExperienceLike
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_experience")
     * @Groups("group_experience_like")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Experience", inversedBy="experienceLikes")
     * @Groups("group_experience_like")
     */
    private $experience;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="experienceLikes")
     * @Groups("group_experience_like")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getExperience(): ?Experience
    {
        return $this->experience;
    }

    public function setExperience(?Experience $experience): self
    {
        $this->experience = $experience;

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


}
