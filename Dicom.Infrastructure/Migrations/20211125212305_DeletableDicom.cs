using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dicom.Infrastructure.Migrations
{
    public partial class DeletableDicom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "dicom",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "dicom",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "deleted_at",
                table: "dicom",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "last_modified_at",
                table: "dicom",
                type: "timestamp without time zone",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "created_at",
                table: "dicom");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "dicom");

            migrationBuilder.DropColumn(
                name: "deleted_at",
                table: "dicom");

            migrationBuilder.DropColumn(
                name: "last_modified_at",
                table: "dicom");
        }
    }
}
