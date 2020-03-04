<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200209105800 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE borrow_material ADD id_materail_id INT NOT NULL, CHANGE id_lender_id id_lender_id INT NOT NULL');
        $this->addSql('ALTER TABLE borrow_material ADD CONSTRAINT FK_9635C2AA2739A834 FOREIGN KEY (id_materail_id) REFERENCES material (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9635C2AA2739A834 ON borrow_material (id_materail_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE borrow_material DROP FOREIGN KEY FK_9635C2AA2739A834');
        $this->addSql('DROP INDEX UNIQ_9635C2AA2739A834 ON borrow_material');
        $this->addSql('ALTER TABLE borrow_material DROP id_materail_id, CHANGE id_lender_id id_lender_id INT DEFAULT NULL');
    }
}
