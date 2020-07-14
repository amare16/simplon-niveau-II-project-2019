<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MaterialBorrowerMessageRepository")
 */
class MaterialBorrowerMessage
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("group_material_borrower_message")
     * @Groups("group_user")
     * @Groups("group_user_profile")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups("group_material_borrower_message")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $message;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("group_material_borrower_message")
     * @Groups("group_user_profile")
     * @Groups("group_user")
     */
    private $send_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="materialBorrowerMessage")
     * @Groups("group_material_borrower_message")
     */
    private $senderMessageId;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="materialReceiverMessages")
     * @Groups("group_material_borrower_message")
     */
    private $receiverMessageId;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="materialBorrowerMessages")
     * @Groups("group_material_borrower_message")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
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

    public function setSendAt(?\DateTimeInterface $send_at): self
    {
        $this->send_at = $send_at;

        return $this;
    }

    public function getSenderMessageId(): ?User
    {
        return $this->senderMessageId;
    }

    public function setSenderMessageId(?User $senderMessageId): self
    {
        $this->senderMessageId = $senderMessageId;

        return $this;
    }

    public function getReceiverMessageId(): ?User
    {
        return $this->receiverMessageId;
    }

    public function setReceiverMessageId(?User $receiverMessageId): self
    {
        $this->receiverMessageId = $receiverMessageId;

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
