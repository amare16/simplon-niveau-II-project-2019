<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200319201426 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE borrow_material DROP FOREIGN KEY FK_9635C2AA3F2B65C3');
        $this->addSql('DROP INDEX UNIQ_9635C2AA3F2B65C3 ON borrow_material');
        $this->addSql('ALTER TABLE borrow_material CHANGE materail_id material_id INT NOT NULL');
        $this->addSql('ALTER TABLE borrow_material ADD CONSTRAINT FK_9635C2AAE308AC6F FOREIGN KEY (material_id) REFERENCES material (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9635C2AAE308AC6F ON borrow_material (material_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE borrow_material DROP FOREIGN KEY FK_9635C2AAE308AC6F');
        $this->addSql('DROP INDEX UNIQ_9635C2AAE308AC6F ON borrow_material');
        $this->addSql('ALTER TABLE borrow_material CHANGE material_id materail_id INT NOT NULL');
        $this->addSql('ALTER TABLE borrow_material ADD CONSTRAINT FK_9635C2AA3F2B65C3 FOREIGN KEY (materail_id) REFERENCES material (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9635C2AA3F2B65C3 ON borrow_material (materail_id)');
    }
}
