<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191103214610 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE addresses CHANGE region_name region_name VARCHAR(255) NOT NULL, CHANGE department_number department_number VARCHAR(3) NOT NULL, CHANGE department_name department_name VARCHAR(255) NOT NULL, CHANGE city city VARCHAR(255) NOT NULL, CHANGE zip_code zip_code VARCHAR(5) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE addresses CHANGE region_name region_name VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE department_number department_number VARCHAR(3) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE department_name department_name VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE city city VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE zip_code zip_code VARCHAR(5) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
    }
}
