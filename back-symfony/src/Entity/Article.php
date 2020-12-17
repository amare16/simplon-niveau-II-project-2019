<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


/**
 * @ORM\Entity(repositoryClass="App\Repository\ArticleRepository")
 * @Vich\Uploadable()
 */
class Article implements \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_article")
     * @Groups("group_comment_article")
     * @Groups("group_article_like")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("group_article")
     * @Assert\NotBlank()
     * @Assert\Length(min=2)
     * @Groups("group_comment_article")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_article")
     * @Assert\NotBlank()
     * @Assert\Length(min=2)
     * @Groups("group_comment_article")
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("group_article")
     */
    private $published_at;

    /**
     * @var string|null
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("group_article")
     */
    private $filename;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="article_image", fileNameProperty="filename")
     * @Groups("group_article")
     */
    private $imageFile;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @var \DateTimeInterface|null
     * @Groups("group_article")
     * @Groups("group_comment_article")
     */
    private $updated_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="articles")
     * @ORM\JoinColumn(nullable=true)
     * @Groups("group_article")
     * @Groups("group_comment_article")
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CommentArticle", mappedBy="article")
     * @Groups("group_article")
     */
    private $commentArticles;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ArticleLike", mappedBy="article")
     * @Groups("group_article")
     */
    private $likes;
    
    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->commentArticles = new ArrayCollection();
        $this->likes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): self
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
     * @return Collection|CommentArticle[]
     */
    public function getCommentArticles(): Collection
    {
        return $this->commentArticles;
    }

    public function addCommentArticle(CommentArticle $commentArticle): self
    {
        if (!$this->commentArticles->contains($commentArticle)) {
            $this->commentArticles[] = $commentArticle;
            $commentArticle->setArticle($this);
        }

        return $this;
    }

    public function removeCommentArticle(CommentArticle $commentArticle): self
    {
        if ($this->commentArticles->contains($commentArticle)) {
            $this->commentArticles->removeElement($commentArticle);
            // set the owning side to null (unless already changed)
            if ($commentArticle->getArticle() === $this) {
                $commentArticle->setArticle(null);
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
     * @return Article
     */
    public function setFilename(?string $filename): Article
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
     * @return Article
     */
    public function setUpdatedAt(\DateTimeInterface $updated_at): Article
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
     * @return Collection|ArticleLike[]
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(ArticleLike $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setArticle($this);
        }

        return $this;
    }

    public function removeLike(ArticleLike $like): self
    {
        if ($this->likes->contains($like)) {
            $this->likes->removeElement($like);
            // set the owning side to null (unless already changed)
            if ($like->getArticle() === $this) {
                $like->setArticle(null);
            }
        }

        return $this;
    }

    /**
     * lets you know if this article is "like" by a user
     *
     * @param User $user
     * @return boolean
     */
    public function isLikedByUser(User $user): bool
    {
        foreach ($this->likes as $like)
        {
            if ($like->getUser() === $user) {
                return true;
            }
        }
        return false;
    }

}



