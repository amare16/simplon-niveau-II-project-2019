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
     * @Groups("group_userType")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups("group_user")
     * @Groups("group_article")
     * @Groups("group_userType")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups("group_user")
     * @Groups("group_article")
     * @Groups("group_userType")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=45, unique=true)
     * @Groups("group_user")
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     * @Groups("group_user")
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
     */
    private $userMessageSender;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserMessage", mappedBy="id_message_receiver")
     */
    private $userMessageReceiver;

//    /**
//     * @ORM\OneToMany(targetEntity="App\Entity\UserMessage", mappedBy="user")
//     */
//    private $userMessages;

    /**
     * @ORM\Column(type="simple_array")
     */
    private $roles = ['ROLE_USER'];



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
        //$this->userMessages = new ArrayCollection();
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
            $this->userMessageSender[] = $userMessage;
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

//    /**
//     * @return Collection|UserMessage[]
//     */
//    public function getUserMessages(): Collection
//    {
//        return $this->userMessages;
//    }
//
//    public function addUserMessage(UserMessage $userMessage): self
//    {
//        if (!$this->userMessages->contains($userMessage)) {
//            $this->userMessages[] = $userMessage;
//            $userMessage->setUser($this);
//        }
//
//        return $this;
//    }
//
//    public function removeUserMessage(UserMessage $userMessage): self
//    {
//        if ($this->userMessages->contains($userMessage)) {
//            $this->userMessages->removeElement($userMessage);
//            // set the owning side to null (unless already changed)
//            if ($userMessage->getUser() === $this) {
//                $userMessage->setUser(null);
//            }
//        }
//
//        return $this;
//    }

   
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
