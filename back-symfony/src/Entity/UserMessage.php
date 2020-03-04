<?php

namespace App\Entity;

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
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="userMessages")
     * @ORM\JoinColumn(nullable=true)
     * @Groups("group_user_message")
     */
    private $user;

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
