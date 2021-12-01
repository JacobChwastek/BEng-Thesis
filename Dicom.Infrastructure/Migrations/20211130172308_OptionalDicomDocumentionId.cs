using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dicom.Infrastructure.Migrations
{
    public partial class OptionalDicomDocumentionId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_documentation_images_dicom_documentations_dicom_documentati",
                table: "documentation_images");

            migrationBuilder.AlterColumn<Guid>(
                name: "dicom_documentation_id",
                table: "documentation_images",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "fk_documentation_images_dicom_documentations_dicom_documentati",
                table: "documentation_images",
                column: "dicom_documentation_id",
                principalTable: "dicom_documentations",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_documentation_images_dicom_documentations_dicom_documentati",
                table: "documentation_images");

            migrationBuilder.AlterColumn<Guid>(
                name: "dicom_documentation_id",
                table: "documentation_images",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_documentation_images_dicom_documentations_dicom_documentati",
                table: "documentation_images",
                column: "dicom_documentation_id",
                principalTable: "dicom_documentations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
