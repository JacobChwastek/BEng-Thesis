using Microsoft.EntityFrameworkCore.Migrations;

namespace Dicom.Infrastructure.Migrations
{
    public partial class DocumentationConfigurations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_dicom_documentation_dicom_dicom_id",
                table: "dicom_documentation");

            migrationBuilder.DropForeignKey(
                name: "fk_documentation_image_dicom_documentation_dicom_documentation",
                table: "documentation_image");

            migrationBuilder.DropPrimaryKey(
                name: "pk_documentation_image",
                table: "documentation_image");

            migrationBuilder.DropPrimaryKey(
                name: "pk_dicom_documentation",
                table: "dicom_documentation");

            migrationBuilder.RenameTable(
                name: "documentation_image",
                newName: "documentation_images");

            migrationBuilder.RenameTable(
                name: "dicom_documentation",
                newName: "dicom_documentations");

            migrationBuilder.RenameIndex(
                name: "ix_documentation_image_dicom_documentation_id",
                table: "documentation_images",
                newName: "ix_documentation_images_dicom_documentation_id");

            migrationBuilder.RenameIndex(
                name: "ix_dicom_documentation_dicom_id",
                table: "dicom_documentations",
                newName: "ix_dicom_documentations_dicom_id");

            migrationBuilder.AlterColumn<string>(
                name: "view_layer_image",
                table: "documentation_images",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "draw_layer_image",
                table: "documentation_images",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "pk_documentation_images",
                table: "documentation_images",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_dicom_documentations",
                table: "dicom_documentations",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_dicom_documentations_dicom_dicom_id",
                table: "dicom_documentations",
                column: "dicom_id",
                principalTable: "dicom",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_documentation_images_dicom_documentations_dicom_documentati",
                table: "documentation_images",
                column: "dicom_documentation_id",
                principalTable: "dicom_documentations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_dicom_documentations_dicom_dicom_id",
                table: "dicom_documentations");

            migrationBuilder.DropForeignKey(
                name: "fk_documentation_images_dicom_documentations_dicom_documentati",
                table: "documentation_images");

            migrationBuilder.DropPrimaryKey(
                name: "pk_documentation_images",
                table: "documentation_images");

            migrationBuilder.DropPrimaryKey(
                name: "pk_dicom_documentations",
                table: "dicom_documentations");

            migrationBuilder.RenameTable(
                name: "documentation_images",
                newName: "documentation_image");

            migrationBuilder.RenameTable(
                name: "dicom_documentations",
                newName: "dicom_documentation");

            migrationBuilder.RenameIndex(
                name: "ix_documentation_images_dicom_documentation_id",
                table: "documentation_image",
                newName: "ix_documentation_image_dicom_documentation_id");

            migrationBuilder.RenameIndex(
                name: "ix_dicom_documentations_dicom_id",
                table: "dicom_documentation",
                newName: "ix_dicom_documentation_dicom_id");

            migrationBuilder.AlterColumn<string>(
                name: "view_layer_image",
                table: "documentation_image",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "draw_layer_image",
                table: "documentation_image",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "pk_documentation_image",
                table: "documentation_image",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_dicom_documentation",
                table: "dicom_documentation",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_dicom_documentation_dicom_dicom_id",
                table: "dicom_documentation",
                column: "dicom_id",
                principalTable: "dicom",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_documentation_image_dicom_documentation_dicom_documentation",
                table: "documentation_image",
                column: "dicom_documentation_id",
                principalTable: "dicom_documentation",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
