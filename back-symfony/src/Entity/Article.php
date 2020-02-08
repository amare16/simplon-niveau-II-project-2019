<?php

namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\ArticleRepository")
 */
class Article
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_article")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("group_article")
     * @Assert\NotBlank()
     * @Assert\Length(min=2)
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_article")
     * @Assert\NotBlank()
     * @Assert\Length(min=2)
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("group_article")
     */
    private $published_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="articles")
     * @ORM\JoinColumn(nullable=true)
     * @Groups("group_article")
     */
    private $user;

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
}
