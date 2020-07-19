<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommentExperienceRepository")
 */
class CommentExperience
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_comment_experience")
     * @Groups("group_experience")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_comment_experience")
     * @Groups("group_experience")
     */
    private $commentContent;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("group_comment_experience")
     * @Groups("group_experience")
     */
    private $commentedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("group_comment_experience")
     * @Groups("group_experience")
     */
    private $authorName;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Experience", inversedBy="commentExperiences")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("group_comment_experience")
     */
    private $experience;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCommentContent(): ?string
    {
        return $this->commentContent;
    }

    public function setCommentContent(string $commentContent): self
    {
        $this->commentContent = $commentContent;

        return $this;
    }

    public function getCommentedAt(): ?\DateTimeInterface
    {
        return $this->commentedAt;
    }

    public function setCommentedAt(\DateTimeInterface $commentedAt): self
    {
        $this->commentedAt = $commentedAt;

        return $this;
    }

    public function getAuthorName(): ?User
    {
        return $this->authorName;
    }

    public function setAuthorName(?User $authorName): self
    {
        $this->authorName = $authorName;

        return $this;
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
}
