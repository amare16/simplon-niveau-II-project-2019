<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserMessageRepository")
 */
class UserMessage
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_user_message")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="userMessageSender")
     * @Groups("group_user_message")
     */
    private $id_message_sender;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="userMessageReceiver")
     * @Groups("group_user_message")
     */
    private $id_message_receiver;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_user_message")
     */
    private $message;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("group_user_message")
     */
    private $send_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\UserMessage", inversedBy="user")
     */
    private $user;

//    public function __construct()
//    {
//        $this->user = new ArrayCollection();
//    }
    

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdMessageSender(): ?User
    {
        return $this->id_message_sender;
    }

    public function setIdMessageSender(?User $id_message_sender): self
    {
        $this->id_message_sender = $id_message_sender;

        return $this;
    }

    public function getIdMessageReceiver(): ?User
    {
        return $this->id_message_receiver;
    }

    public function setIdMessageReceiver(?User $id_message_receiver): self
    {
        $this->id_message_receiver = $id_message_receiver;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getSendAt(): ?\DateTimeInterface
    {
        return $this->send_at;
    }

    public function setSendAt(\DateTimeInterface $send_at): self
    {
        $this->send_at = $send_at;

        return $this;
    }

    /**
     * @return User|null
     */
    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

//    public function addUser(self $user): self
//    {
//        if (!$this->user->contains($user)) {
//            $this->user[] = $user;
//            $user->setUser($this);
//        }
//
//        return $this;
//    }
//
//    public function removeUser(self $user): self
//    {
//        if ($this->user->contains($user)) {
//            $this->user->removeElement($user);
//            // set the owning side to null (unless already changed)
//            if ($user->getUser() === $this) {
//                $user->setUser(null);
//            }
//        }
//
//        return $this;
//    }


}
