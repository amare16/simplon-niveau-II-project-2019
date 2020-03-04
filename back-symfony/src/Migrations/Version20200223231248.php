<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200223231248 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE comment_article ADD author_name_id INT NOT NULL, DROP author_name');
        $this->addSql('ALTER TABLE comment_article ADD CONSTRAINT FK_F1496C76342D0395 FOREIGN KEY (author_name_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_F1496C76342D0395 ON comment_article (author_name_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE comment_article DROP FOREIGN KEY FK_F1496C76342D0395');
        $this->addSql('DROP INDEX IDX_F1496C76342D0395 ON comment_article');
        $this->addSql('ALTER TABLE comment_article ADD author_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP author_name_id');
    }
}
