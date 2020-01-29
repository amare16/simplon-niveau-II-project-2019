<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200128214122 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user_message (id INT AUTO_INCREMENT NOT NULL, id_message_sender_id INT DEFAULT NULL, id_message_receiver_id INT DEFAULT NULL, message VARCHAR(255) NOT NULL, INDEX IDX_EEB02E756DAADDBC (id_message_sender_id), INDEX IDX_EEB02E75EBC62F84 (id_message_receiver_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_message ADD CONSTRAINT FK_EEB02E756DAADDBC FOREIGN KEY (id_message_sender_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_message ADD CONSTRAINT FK_EEB02E75EBC62F84 FOREIGN KEY (id_message_receiver_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE user_message');
    }
}
