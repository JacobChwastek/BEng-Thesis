using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dicom.Infrastructure.Migrations
{
    public partial class Documentations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dicom_documentation",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    dicom_id = table.Column<Guid>(type: "uuid", nullable: false),
                    deleted = table.Column<bool>(type: "boolean", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    last_modified_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dicom_documentation", x => x.id);
                    table.ForeignKey(
                        name: "fk_dicom_documentation_dicom_dicom_id",
                        column: x => x.dicom_id,
                        principalTable: "dicom",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "documentation_image",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    view_layer_image = table.Column<string>(type: "text", nullable: true),
                    draw_layer_image = table.Column<string>(type: "text", nullable: true),
                    dicom_documentation_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    last_modified_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_documentation_image", x => x.id);
                    table.ForeignKey(
                        name: "fk_documentation_image_dicom_documentation_dicom_documentation",
                        column: x => x.dicom_documentation_id,
                        principalTable: "dicom_documentation",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_dicom_documentation_dicom_id",
                table: "dicom_documentation",
                column: "dicom_id");

            migrationBuilder.CreateIndex(
                name: "ix_documentation_image_dicom_documentation_id",
                table: "documentation_image",
                column: "dicom_documentation_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "documentation_image");

            migrationBuilder.DropTable(
                name: "dicom_documentation");
        }
    }
}
