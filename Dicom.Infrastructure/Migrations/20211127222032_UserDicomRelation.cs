using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dicom.Infrastructure.Migrations
{
    public partial class UserDicomRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "dicom",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "ix_dicom_user_id",
                table: "dicom",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_dicom_users_user_id",
                table: "dicom",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_dicom_users_user_id",
                table: "dicom");

            migrationBuilder.DropIndex(
                name: "ix_dicom_user_id",
                table: "dicom");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "dicom");
        }
    }
}
