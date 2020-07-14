<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200624204555 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE material_borrower_message (id INT AUTO_INCREMENT NOT NULL, sender_message_id_id INT DEFAULT NULL, receiver_message_id_id INT DEFAULT NULL, message LONGTEXT NOT NULL, send_at DATETIME DEFAULT NULL, INDEX IDX_AC928B38D7785318 (sender_message_id_id), INDEX IDX_AC928B38997D0C47 (receiver_message_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE material_borrower_message ADD CONSTRAINT FK_AC928B38D7785318 FOREIGN KEY (sender_message_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE material_borrower_message ADD CONSTRAINT FK_AC928B38997D0C47 FOREIGN KEY (receiver_message_id_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE material_borrower_message');
    }
}
