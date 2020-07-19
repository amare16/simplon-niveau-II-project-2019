<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_user")
     * @Groups("group_article")
     * @Groups("group_userType")
     * @Groups("group_user_profile")
     * @Groups("group_user_message")
     * @Groups("group_borrow_material")
     * @Groups("group_experience")
     * @Groups("group_material_borrower_message")
     * @Groups("group_article_like")
     * @Groups("group_comment_experience")
     *
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups("group_user")
     * @Groups("group_article")
     * @Groups("group_userType")
     * @Groups("group_comment_article")
     * @Groups("group_user_profile")
     * @Groups("group_experience")
     * @Groups("group_user_message")
     * @Groups("group_borrow_material")
     * @Groups("group_material_borrower_message")
     * @Groups("group_article_like")
     * @Groups("group_comment_experience")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups("group_user")
     * @Groups("group_article")
     * @Groups("group_userType")
     * @Groups("group_comment_article")
     * @Groups("group_user_profile")
     * @Groups("group_experience")
     * @Groups("group_user_message")
     * @Groups("group_borrow_material")
     * @Groups("group_material_borrower_message")
     * @Groups("group_article_like")
     * @Groups("group_comment_experience")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=45, unique=true)
     * @Groups("group_user")
     * @Groups("group_article")
     * @Groups("group_comment_article")
     * @Groups("group_user_profile")
     * @Groups("group_user_message")
     * @Groups("group_borrow_material")
     * @Groups("group_material_borrower_message")
     * @Groups("group_article_like")
     * @Groups("group_comment_experience")
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     * @Groups("group_user")
     * @Groups("group_user_message")
     * @Groups("group_experience")
     * @Groups("group_borrow_material")
     * @Groups("group_user_profile")
     * @Groups("group_material_borrower_message")
     * @Groups("group_article_like")
     * @Groups("group_comment_experience")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups("group_user")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=15)
     * @Groups("group_user")
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=255, name="city", nullable=true)
     * @Groups("group_user")
     * @Groups("group_borrow_material")
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=5, name="zip_code", nullable=true)
     * @Groups("group_user")
     */
    private $zip_code;


    // we won't at Column annotation because we don't want this field in the database
    /**
     * @Assert\NotBlank()
     * @Assert\Length(min=8, max=4096)
     */
    private $plainPassword;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Article", mappedBy="user")
     */
    private $articles;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\UserType", inversedBy="user")
     * @Groups("group_user")
     */
    private $user_type;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserMessage", mappedBy="id_message_sender")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $userMessageSender;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserMessage", mappedBy="id_message_receiver")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $userMessageReceiver;



    /**
     * @ORM\Column(type="simple_array")
     */
    private $roles = ['ROLE_USER'];

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\UserProfile", mappedBy="user", cascade={"persist", "remove"})
     * @Groups("group_user")
     * @Groups("group_borrow_material")
     * @Groups("group_user_message")
     */
    private $userProfile;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Experience", mappedBy="user")
     */
    private $experiences;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\BorrowMaterial", mappedBy="id_borrower")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $borrowMaterials;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\BorrowMaterial", mappedBy="id_lender")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $lendMaterials;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ArticleLike", mappedBy="user")
     */
    private $articleLikes;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\MaterialBorrowerMessage", mappedBy="senderMessageId")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $materialSenderMessage;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\MaterialBorrowerMessage", mappedBy="receiverMessageId")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $materialReceiverMessages;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\MaterialBorrowerMessage", mappedBy="user")
     */
    private $materialBorrowerMessages;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserMessage", mappedBy="user")
     */
    private $userMessages;


//    /**
//     * @ORM\ManyToOne(targetEntity="App\Entity\Addresses", inversedBy="users")
//     */
//    private $addresses;

    public function __construct()
    {
        //$this->articles = new ArrayCollection();
        $this->user_type = new ArrayCollection();
        $this->users_message = new ArrayCollection();
        $this->userMessageSender = new ArrayCollection();
        $this->userMessageReceiver = new ArrayCollection();
        $this->experiences = new ArrayCollection();
        $this->borrowMaterials = new ArrayCollection();
        $this->lendMaterials = new ArrayCollection();
        $this->articleLikes = new ArrayCollection();
        $this->materialSenderMessage = new ArrayCollection();
        $this->materialReceiverMessages = new ArrayCollection();
        $this->materialBorrowerMessages = new ArrayCollection();
        $this->userMessages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(?string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCity(): ?string
    {
        return $this->city;
    }

    /**
     * @param mixed $city
     */
    public function setCity(?string $city): self
    {
        $this->city = $city;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getZipCode(): ?string
    {
        return $this->zip_code;
    }

    /**
     * @param mixed $zip_code
     */
    public function setZipCode(?string $zip_code): self
    {
        $this->zip_code = $zip_code;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param mixed $plainPassword
     */
    public function setPlainPassword($plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->setUser($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            // set the owning side to null (unless already changed)
            if ($article->getUser() === $this) {
                $article->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserType[]
     */
    public function getUserType(): Collection
    {
        return $this->user_type;
    }

    public function addUserType(UserType $userType): self
    {
        if (!$this->user_type->contains($userType)) {
            $this->user_type[] = $userType;
        }

        return $this;
    }

    public function removeUserType(UserType $userType): self
    {
        if ($this->user_type->contains($userType)) {
            $this->user_type->removeElement($userType);
        }

        return $this;
    }

    /**
     * Returns the roles granted to the user.
     *
     *     public function getRoles()
     *     {
     *         return ['ROLE_USER'];
     *     }
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return (Role|string)[] The user roles
     */
    public function getRoles()
    {
        return $this->roles;



    }

    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    /**
     * @return Collection|UserMessage[]
     */
    public function getUserMessageSender(): Collection
    {
        return $this->userMessageSender;
    }

    public function addUserMessageSender(UserMessage $userMessageSender): self
    {
        if (!$this->userMessageSender->contains($userMessageSender)) {
            $this->userMessageSender[] = $userMessageSender;
            $userMessageSender->setIdMessageSender($this);
        }

        return $this;
    }

    public function removeUserMessageSender(UserMessage $userMessageSender): self
    {
        if ($this->userMessages->contains($userMessageSender)) {
            $this->userMessages->removeElement($userMessageSender);
            // set the owning side to null (unless already changed)
            if ($userMessageSender->getIdMessageSender() === $this) {
                $userMessageSender->setIdMessageSender(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserMessage[]
     */
    public function getUserMessageReceiver(): Collection
    {
        return $this->userMessageReceiver;
    }

    public function addUserMessageReceiver(UserMessage $userMessageReceiver): self
    {
        if (!$this->userMessageReceiver->contains($userMessageReceiver)) {
            $this->userMessageReceiver[] = $userMessageReceiver;
            $userMessageReceiver->setIdMessageReceiver($this);
        }

        return $this;
    }

    public function removeUserMessageReceiver(UserMessage $userMessageReceiver): self
    {
        if ($this->userMessageReceiver->contains($userMessageReceiver)) {
            $this->userMessageReceiver->removeElement($userMessageReceiver);
            // set the owning side to null (unless already changed)
            if ($userMessageReceiver->getIdMessageReceiver() === $this) {
                $userMessageReceiver->setIdMessageReceiver(null);
            }
        }

        return $this;
    }


    public function getUserProfile(): ?UserProfile
    {
        return $this->userProfile;
    }

    public function setUserProfile(UserProfile $userProfile): self
    {
        $this->userProfile = $userProfile;

        // set the owning side of the relation if necessary
        if ($userProfile->getUser() !== $this) {
            $userProfile->setUser($this);
        }

        return $this;
    }

    /**
     * @return Collection|Experience[]
     */
    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experience $experience): self
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences[] = $experience;
            $experience->setUser($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): self
    {
        if ($this->experiences->contains($experience)) {
            $this->experiences->removeElement($experience);
            // set the owning side to null (unless already changed)
            if ($experience->getUser() === $this) {
                $experience->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|BorrowMaterial[]
     */
    public function getBorrowMaterials(): Collection
    {
        return $this->borrowMaterials;
    }

    public function addBorrowMaterial(BorrowMaterial $borrowMaterial): self
    {
        if (!$this->borrowMaterials->contains($borrowMaterial)) {
            $this->borrowMaterials[] = $borrowMaterial;
            $borrowMaterial->setIdBorrower($this);
        }

        return $this;
    }

    public function removeBorrowMaterial(BorrowMaterial $borrowMaterial): self
    {
        if ($this->borrowMaterials->contains($borrowMaterial)) {
            $this->borrowMaterials->removeElement($borrowMaterial);
            // set the owning side to null (unless already changed)
            if ($borrowMaterial->getIdBorrower() === $this) {
                $borrowMaterial->setIdBorrower(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|BorrowMaterial[]
     */
    public function getLendMaterials(): Collection
    {
        return $this->lendMaterials;
    }

    public function addLendMaterial(BorrowMaterial $lendMaterial): self
    {
        if (!$this->lendMaterials->contains($lendMaterial)) {
            $this->lendMaterials[] = $lendMaterial;
            $lendMaterial->setIdLender($this);
        }

        return $this;
    }

    public function removeLendMaterial(BorrowMaterial $lendMaterial): self
    {
        if ($this->lendMaterials->contains($lendMaterial)) {
            $this->lendMaterials->removeElement($lendMaterial);
            // set the owning side to null (unless already changed)
            if ($lendMaterial->getIdLender() === $this) {
                $lendMaterial->setIdLender(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ArticleLike[]
     */
    public function getArticleLikes(): Collection
    {
        return $this->articleLikes;
    }

    public function addArticleLike(ArticleLike $articleLike): self
    {
        if (!$this->articleLikes->contains($articleLike)) {
            $this->articleLikes[] = $articleLike;
            $articleLike->setUser($this);
        }

        return $this;
    }

    public function removeArticleLike(ArticleLike $articleLike): self
    {
        if ($this->articleLikes->contains($articleLike)) {
            $this->articleLikes->removeElement($articleLike);
            // set the owning side to null (unless already changed)
            if ($articleLike->getUser() === $this) {
                $articleLike->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MaterialBorrowerMessage[]
     */
    public function getMaterialSenderMessage(): Collection
    {
        return $this->materialSenderMessage;
    }

    public function addMaterialSenderMessage(MaterialBorrowerMessage $materialSenderMessage): self
    {
        if (!$this->materialSenderMessage->contains($materialSenderMessage)) {
            $this->materialSenderMessage[] = $materialSenderMessage;
            $materialSenderMessage->setSenderMessageId($this);
        }

        return $this;
    }

    public function removematerialSenderMessage(MaterialBorrowerMessage $materialSenderMessage): self
    {
        if ($this->materialSenderMessage->contains($materialSenderMessage)) {
            $this->materialSenderMessage->removeElement($materialSenderMessage);
            // set the owning side to null (unless already changed)
            if ($materialSenderMessage->getSenderMessageId() === $this) {
                $materialSenderMessage->setSenderMessageId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MaterialBorrowerMessage[]
     */
    public function getMaterialReceiverMessages(): Collection
    {
        return $this->materialReceiverMessages;
    }

    public function addMaterialReceiverMessage(MaterialBorrowerMessage $materialReceiverMessage): self
    {
        if (!$this->materialReceiverMessages->contains($materialReceiverMessage)) {
            $this->materialReceiverMessages[] = $materialReceiverMessage;
            $materialReceiverMessage->setReceiverMessageId($this);
        }

        return $this;
    }

    public function removeMaterialReceiverMessage(MaterialBorrowerMessage $materialReceiverMessage): self
    {
        if ($this->materialReceiverMessages->contains($materialReceiverMessage)) {
            $this->materialReceiverMessages->removeElement($materialReceiverMessage);
            // set the owning side to null (unless already changed)
            if ($materialReceiverMessage->getReceiverMessageId() === $this) {
                $materialReceiverMessage->setReceiverMessageId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MaterialBorrowerMessage[]
     */
    public function getMaterialBorrowerMessages(): Collection
    {
        return $this->materialBorrowerMessages;
    }

    public function addMaterialBorrowerMessage(MaterialBorrowerMessage $materialBorrowerMessage): self
    {
        if (!$this->materialBorrowerMessages->contains($materialBorrowerMessage)) {
            $this->materialBorrowerMessages[] = $materialBorrowerMessage;
            $materialBorrowerMessage->setUser($this);
        }

        return $this;
    }

    public function removeMaterialBorrowerMessage(MaterialBorrowerMessage $materialBorrowerMessage): self
    {
        if ($this->materialBorrowerMessages->contains($materialBorrowerMessage)) {
            $this->materialBorrowerMessages->removeElement($materialBorrowerMessage);
            // set the owning side to null (unless already changed)
            if ($materialBorrowerMessage->getUser() === $this) {
                $materialBorrowerMessage->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserMessage[]
     */
    public function getUserMessages(): Collection
    {
        return $this->userMessages;
    }

    public function addUserMessage(UserMessage $userMessage): self
    {
        if (!$this->userMessages->contains($userMessage)) {
            $this->userMessages[] = $userMessage;
            $userMessage->setUser($this);
        }

        return $this;
    }

    public function removeUserMessage(UserMessage $userMessage): self
    {
        if ($this->userMessages->contains($userMessage)) {
            $this->userMessages->removeElement($userMessage);
            // set the owning side to null (unless already changed)
            if ($userMessage->getUser() === $this) {
                $userMessage->setUser(null);
            }
        }

        return $this;
    }


//    public function getAddresses(): ?Addresses
//    {
//        return $this->addresses;
//    }
//
//    public function setAddresses(?Addresses $addresses): self
//    {
//        $this->addresses = $addresses;
//
//        return $this;
//    }
}
