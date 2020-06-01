<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200530152601 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user_message ADD id_message_sender_id INT DEFAULT NULL, ADD id_message_receiver_id INT DEFAULT NULL, DROP id_message_sender, DROP id_message_receiver');
        $this->addSql('ALTER TABLE user_message ADD CONSTRAINT FK_EEB02E756DAADDBC FOREIGN KEY (id_message_sender_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_message ADD CONSTRAINT FK_EEB02E75EBC62F84 FOREIGN KEY (id_message_receiver_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_EEB02E756DAADDBC ON user_message (id_message_sender_id)');
        $this->addSql('CREATE INDEX IDX_EEB02E75EBC62F84 ON user_message (id_message_receiver_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user_message DROP FOREIGN KEY FK_EEB02E756DAADDBC');
        $this->addSql('ALTER TABLE user_message DROP FOREIGN KEY FK_EEB02E75EBC62F84');
        $this->addSql('DROP INDEX IDX_EEB02E756DAADDBC ON user_message');
        $this->addSql('DROP INDEX IDX_EEB02E75EBC62F84 ON user_message');
        $this->addSql('ALTER TABLE user_message ADD id_message_sender VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD id_message_receiver VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP id_message_sender_id, DROP id_message_receiver_id');
    }
}
