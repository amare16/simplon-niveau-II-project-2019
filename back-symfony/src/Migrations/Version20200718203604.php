<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200718203604 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE comment_experience (id INT AUTO_INCREMENT NOT NULL, author_name_id INT NOT NULL, experience_id INT NOT NULL, comment_content LONGTEXT NOT NULL, commented_at DATETIME NOT NULL, INDEX IDX_87714B23342D0395 (author_name_id), INDEX IDX_87714B2346E90E27 (experience_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE comment_experience ADD CONSTRAINT FK_87714B23342D0395 FOREIGN KEY (author_name_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comment_experience ADD CONSTRAINT FK_87714B2346E90E27 FOREIGN KEY (experience_id) REFERENCES experience (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE comment_experience');
    }
}
